export default interface Quest {
  id: string;
  userid: string;
  displayName: string;
  img?: string;
  steps: Array<{
    step: QuestStep;
    completed: boolean;
    requires?: Array<QuestStep["id"]>;
  }>;
}

export interface QuestStep {
  id: string;
  displayName: string;
  description: string;
}

export class HelloWorldQuest implements Quest {
  id = "hello-world-quest-id";
  displayName = "Hello World";
  steps = [
    {
      completed: false,
      step: {
        id: "hello-step-id",
        displayName: "Hello",
        description: "The first part of the Hello World quest!",
      },
    },
    {
      completed: false,
      step: {
        id: "world-step-id",
        displayName: "World",
        description: "The second part of the Hello World quest!",
      },
      requires: ["hello-step-id"],
    },
  ];

  constructor(public userid: string) {}
}
