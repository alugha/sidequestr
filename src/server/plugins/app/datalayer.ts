import type { FastifyInstance } from 'fastify'
import fp from 'fastify-plugin'
import type { User } from '../../../shared/schemas/user.ts';
import type { Quest, QuestStep } from '../../../shared/schemas/quest.ts';
import { DatabaseSync, type SQLTagStore } from 'node:sqlite';
import { quests } from '../../staticdata.ts';

interface DL {
  /* User */
  getUserById(id: string): User | undefined;
  createUser(user: User): void;

  /* Quest */
  getAllQuests(userId?: string): Quest[];
  getQuestById(id: string, userId?: string): Quest | undefined;
  createQuest(quest: Quest): void;

  /* Quest Task */
  createTask(questId: string, task: QuestStep): void;
  getAllTasks(questId: string): QuestStep[];
  getTaskCompleted(taskId: string, userId?: string): boolean;
  completeTask(taskId: string, userId: string): void;
}

class Datalayer implements DL {
  store: SQLTagStore
  constructor(db: DatabaseSync, quests: Quest[]) {
    this.store = db.createTagStore();

    db.exec(`
      CREATE TABLE user (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL
      ) STRICT
    `);

    db.exec(`
      CREATE TABLE quest (
        id TEXT PRIMARY KEY,
        displayName TEXT NOT NULL,
        description TEXT NOT NULL
      ) STRICT
    `);

    db.exec(`
      CREATE TABLE task (
        id TEXT PRIMARY KEY,
        questId TEXT NOT NULL,
        displayName TEXT NOT NULL,
        required TEXT NOT NULL,
        FOREIGN KEY (questId) REFERENCES quest(id) ON DELETE CASCADE
      ) STRICT
    `);

    db.exec(`
      CREATE TABLE completionlog (
        taskId TEXT,
        userId TEXT,
        FOREIGN KEY (taskId) REFERENCES task(id) ON DELETE CASCADE,
        FOREIGN KEY (userId) REFERENCES user(id) ON DELETE CASCADE
      ) STRICT
    `);

    db.exec(`CREATE UNIQUE INDEX idx_completionlog_user_task ON completionlog (userId, taskId)`);

    // Seed db
    for (const quest of quests) {
      this.createQuest(quest)
    }

  }

  getUserById(id: string) {
    return this.store.get`SELECT * FROM user WHERE id = ${id}` as User | undefined
  }

  createUser(user: User) {
    this.store.run`INSERT INTO user VALUES (${user.id}, ${user.name})`
  }

  getAllQuests(userId?: string): Quest[] {
    const quests = this.store.all`SELECT * FROM quest` as any as Omit<Quest, "tasks">[];
    return quests.map(quest => ({
      ...quest,
      tasks: this.getAllTasks(quest.id, userId),
    }))
  }

  getQuestById(id: string, userId?: string): Quest | undefined {
    const quest = this.store.get`SELECT * FROM quest WHERE id = ${id}` as Quest | undefined;

    if (!quest) {
      return undefined;
    }

    return {
      ...quest,
      tasks: this.getAllTasks(id, userId)
    };
  }

  createQuest(quest: Quest): void {
    this.store.run`INSERT INTO quest (id, displayName, description) VALUES (${quest.id}, ${quest.displayName}, ${quest.description})`;

    for (const task of quest.tasks) {
      this.createTask(quest.id, task)
    }
  }

  createTask(questId: string, task: QuestStep): void {
    const required = JSON.stringify(task.required);
    this.store.run`INSERT INTO task (id, questId, displayName, required) VALUES (${task.id}, ${questId}, ${task.displayName}, ${required})`;
  }

  getAllTasks(questId: string, userId?: string): QuestStep[] {
    const rawTasks = this.store.all`SELECT * FROM task WHERE questId = ${questId}` as Array<{
      id: string;
      questId: string;
      displayName: string;
      required: string;
    }>;

    return rawTasks.map(task => ({
      id: task.id,
      displayName: task.displayName,
      required: JSON.parse(task.required),
      completed: this.getTaskCompleted(task.id, userId)
    }));
  }

  getTaskCompleted(taskId: string, userId?: string): boolean {
    if (!userId) {
      return false;
    }

    const result = this.store.get`SELECT * FROM completionlog WHERE taskId = ${taskId} and userId = ${userId}`;
    return typeof result === "number" && result === 1;
  }

  completeTask(taskId: string, userId: string): void {
    this.store.run`INSERT OR IGNORE INTO completionlog (taskId, userId) VALUES (${taskId}, ${userId})`;
  }
}

declare module 'fastify' {
  interface FastifyInstance {
    dl: Datalayer;
  }
}

async function newDatalayer(storePath?: string): Promise<Datalayer> {
  const database = new DatabaseSync(storePath || ':memory:');
  return new Datalayer(database, quests);
}

export default fp(
  async function (fastify: FastifyInstance) {
    const db = await newDatalayer(fastify.config.SQLITE_PATH);
    fastify.decorate('dl', db)
  },
  {
    name: 'datalayer',
  }
)