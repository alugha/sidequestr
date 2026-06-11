import * as React from "react";
import type { ReactElement } from "react";
import "./App.css";

import { TreeView } from "@progress/kendo-react-treeview";
import { Avatar } from "@progress/kendo-react-layout";
import { userIcon } from "@progress/kendo-svg-icons";
import { SvgIcon } from "@progress/kendo-react-common";
import { GridLayout, GridLayoutItem } from "@progress/kendo-react-layout";

const userName = "Alugha";
const userDescription = "I'm a company";

const eventName = "HAcHackathonParty";
const eventDescription =
  "Design and build a product that improves how events are created or experienced, from discovering better content and participants, to enabling more meaningful interactions at scale. Focus on solving a specific, real problem and show clear value to organisers or attendees. Use Kendo UI to bring your idea to life through a polished, interactive experience.";

interface TreeViewDataItem {
  text: string;
  expanded: boolean;
  selected: boolean;
  items: TreeViewDataItem[];
}

const questsData: TreeViewDataItem[] = [
  {
    text: "Open",
    expanded: false,
    selected: false,
    items: [],
  },
  {
    text: "Running",
    expanded: false,
    selected: false,
    items: [],
  },
  {
    text: "Completed",
    expanded: false,
    selected: false,
    items: [],
  },
];

function Dashboard(): ReactElement {
  const [data, setData] = React.useState<TreeViewDataItem[]>([]);
  const onExpandChange = (event: any) => {
    event.item.expanded = !event.item.expanded;
    setData([...data]);
  };

  React.useEffect(() => {
    fetch('/api/quests').then(body => body.json()).then(obj => {
      questsData[0].items.length = 0
      questsData[1].items.length = 0
      questsData[2].items.length = 0
      obj.forEach((quest: any) => {
        const totalTasks = quest.tasks.length;
        let completedTasks = 0;
        quest.tasks.forEach((task: any) => {
          if (task.completed) completedTasks++;
        })
        if (completedTasks == totalTasks) {
          // Add to completed list
          questsData[2].items.push({ text: `${quest.displayName} [${totalTasks}]`, items: [], expanded: false, selected: false })
        } else if (completedTasks > 0) {
          // Add to running list
          questsData[1].items.push({ text: `${quest.displayName} [${completedTasks}/${totalTasks}]`,  items: [], expanded: false, selected: false })
        } else {
          // Add to open list
          questsData[0].items.push({ text: `${quest.displayName} [${totalTasks}]`,  items: [], expanded: false, selected: false })
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
        data={data}
        expandIcons={true}
        onExpandChange={onExpandChange}
      />
    </div>
  );
}

export default Dashboard;
