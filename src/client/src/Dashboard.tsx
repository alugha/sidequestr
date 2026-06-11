import * as React from "react";
import type { ReactElement } from "react";
import "./App.css";

import { Avatar } from "@progress/kendo-react-layout";
import { userIcon } from "@progress/kendo-svg-icons";
import { SvgIcon } from "@progress/kendo-react-common";
import { GridLayout, GridLayoutItem } from "@progress/kendo-react-layout";
import TreeView, { type QuestList } from "./QuestList";

const userName = "Alugha";
const userDescription = "I'm a company";

const eventName = "HackathonParty";
const eventDescription =
  "Design and build a product that improves how events are created or experienced, from discovering better content and participants, to enabling more meaningful interactions at scale. Focus on solving a specific, real problem and show clear value to organisers or attendees. Use Kendo UI to bring your idea to life through a polished, interactive experience.";


function Dashboard(): ReactElement {
  const [data, setData] = React.useState<QuestList[]>([]);


  React.useEffect(() => {
    fetch('/api/quests').then(body => body.json()).then(obj => {
      const questsData: QuestList[] = [
        {
          text: "Open",
          quests: [],
        },
        {
          text: "Running",
          quests: [],
        },
        {
          text: "Completed",
          quests: [],
        },
      ];
      obj.forEach((quest: any) => {
        const totalTasks = quest.tasks.length;
        let completedTasks = 0;
        quest.tasks.forEach((task: any) => {
          if (task.completed) completedTasks++;
        })
        if (completedTasks == totalTasks) {
          // Add to completed list
          questsData[2].quests.push({ displayName: `${quest.displayName} [${totalTasks}]`, id: quest.id })
        } else if (completedTasks > 0) {
          // Add to running list
          questsData[1].quests.push({ displayName: `${quest.displayName} [${completedTasks}/${totalTasks}]`,  id: quest.id })
        } else {
          // Add to open list
          questsData[0].quests.push({ displayName: `${quest.displayName} [${totalTasks}]`,  id: quest.id })
        }
      })
      setData(questsData)
    })
  }, [])

  return (
    <div style={{ margin: "1rem" }}>
      <div>
        <div className="example-wrapper">
          <div className="page">
            <div className="content">
              <GridLayout rows={[{}, {}]} gap={{ rows: 1, cols: 1 }}>
                <GridLayoutItem
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  col={1}
                  row={1}
                >
                  <Avatar type="icon" size="large" rounded="none">
                    <SvgIcon icon={userIcon} />
                  </Avatar>
                </GridLayoutItem>
                <GridLayoutItem
                  style={{}}
                  className="box"
                  col={2}
                  colSpan={4}
                  row={1}
                >
                  <h1>{userName}</h1>
                  <p> {userDescription}</p>
                </GridLayoutItem>
              </GridLayout>
            </div>
          </div>
        </div>
      </div>
      <hr />
      <h3>Welcome to {eventName}</h3>
      <p>{eventDescription}</p>
      <hr />
      <h3>Your quests</h3>
      <TreeView
        items={data}
      />
    </div>
  );
}

export default Dashboard;
