import * as React from 'react'
import type { ReactElement } from 'react';
import './App.css';

import { TreeView} from '@progress/kendo-react-treeview';
import { Avatar } from '@progress/kendo-react-layout';
import { userIcon } from '@progress/kendo-svg-icons';
import { SvgIcon } from '@progress/kendo-react-common';
import { GridLayout, GridLayoutItem } from '@progress/kendo-react-layout';

function App(): ReactElement {


    const userName = "Alugha"
    const userDescription = "I'm a company"

    const eventName = "HAcHackathonParty"
    const eventDescription = "Design and build a product that improves how events are created or experienced, from discovering better content and participants, to enabling more meaningful interactions at scale. Focus on solving a specific, real problem and show clear value to organisers or attendees. Use Kendo UI to bring your idea to life through a polished, interactive experience."
   
   interface TreeViewDataItem {
    text: string,
    expanded?: boolean,
    selected?: boolean,
    items?: TreeViewDataItem[]
}

const requests: TreeViewDataItem[] = [
  
  {
    text: 'Open (5)', expanded: false, items: [
        { text: 'Open Quest One (0/4)' }, 
        { text: 'Open Quest Two (0/7)' }, 
        { text: 'Open Quest Three (0/1)' }, 
        { text: 'Open Quest Four (0/3)' }, 
        { text: 'Open Quest Five (0/6)' }, 

      
      ]
}, 

{
    text: 'Running (3)', items: [
        { text: 'Quest Runnig One (1/3)' }, 
        { text: 'Quest Running Two (2/8)' }, 
        { text: 'Quest Running Three (5/6)' },
       ]
},
{
    text: 'Completed (1)', items: [
        { text: 'Quest Completed (2/2)' }]
}

];

 const [data, setData] = React.useState(requests);
    const onExpandChange = (event: any) => {
        event.item.expanded = !event.item.expanded;
        setData([...data]);
    }
   
    return (
    <div style={{margin:"1rem"}}>


      <div>
        <div className="example-wrapper">
          <div className="page">
            <div className="content">
              <GridLayout
                rows={[{}, {}]}
            
                gap={{rows: 1, cols: 1}}
              >
                <GridLayoutItem style={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}} col={1} row={1} >
                    
                     <Avatar type="icon" size="large" rounded='none'>
                    <SvgIcon icon={userIcon} />
                </Avatar>
                </GridLayoutItem>
                <GridLayoutItem  style={{}} className="box" col={2} colSpan={4} row={1}>
                     <h1>{userName}</h1> 
 <p>  {userDescription}</p>
                </GridLayoutItem>
             
              </GridLayout>
            </div>
          </div>
        </div>
      </div>





  

 <hr/>
 <h3>Welcome to {eventName}</h3>
<p>{eventDescription}</p>
 <hr/>
 <h3>Your quests</h3>

 <TreeView data={data} expandIcons={true} onExpandChange={onExpandChange} />;

  </div>
  );
}

export default App;
