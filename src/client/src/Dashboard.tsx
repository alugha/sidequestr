import React, {useContext, useState, useEffect}  from "react";
import "./App.css";

import { Avatar } from "@progress/kendo-react-layout";
import { userIcon } from "@progress/kendo-svg-icons";
import { SvgIcon } from "@progress/kendo-react-common";
import { GridLayout, GridLayoutItem } from "@progress/kendo-react-layout";
import TreeView, { type QuestList } from "./QuestList";
import { SessionContext } from "./LoginWrapper";

const eventName = "HackathonParty";
const eventDescription = "Your magical handheld device is exactly what you need to gather more might. You will do so by holding over one of the many tokens of power that have been hidden accross this noble establishment. Every action you take increases your connection with the area and opens up more opportunities. Have a look around and see for yourself!"

const Dashboard:React.FC =()=> {
  const [data, setData] = useState<QuestList[]>([]);
  const user = useContext(SessionContext);

  useEffect(() => {
    if (!user) {
      return;
    }
    fetch('/api/quests').then(body => body.json()).then(obj => {
      const questsData: QuestList[] = [
        {
          text: "Available",
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

  if (!user) {
    console.log('No user present. This should have been caught by the LoginWrapper')
    return;
  }

  return (
    <div style={{ margin: "1rem" }}>
      <div>
        <div className="example-wrapper">
          <div className="page">
            <div className="content">
              <GridLayout rows={[{}, {}]} gap={{ rows: 1, cols: 1 }}>
                <GridLayoutItem
                  col={1}
                  row={1}
                  rowSpan={2}
                >
                  <Avatar type="icon" size="large" rounded="none" themeColor="secondary">
                    <SvgIcon icon={userIcon} />
                  </Avatar>
                </GridLayoutItem>
                <GridLayoutItem
                  className="box"
                  col={2}
                  colSpan={4}
                  row={1}
                  rowSpan={1}
                >
                  <h2 style={{margin:0}}>{user.name}</h2>
                </GridLayoutItem>
                <GridLayoutItem
                  className="box"
                  col={2}
                  colSpan={4}
                  row={2}
                  rowSpan={1}
                  style={{alignSelf:"flex-end"}}
                >
                  <em>Ready for an adventure!</em>
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
