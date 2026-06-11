import type { ReactElement } from 'react';
import './App.css';

import { Checkbox } from '@progress/kendo-react-inputs';
import kendoReactLogo from './assets/ProgressKendoReact_logo.svg';

function App(): ReactElement {

    const eventName = "HAcHackathonParty"
    const eventDescription = "Design and build a product that improves how events are created or experienced, from discovering better content and participants, to enabling more meaningful interactions at scale. Focus on solving a specific, real problem and show clear value to organisers or attendees. Use Kendo UI to bring your idea to life through a polished, interactive experience."
  
const tasks= [
      {
        "id": "quest1task1",
        "displayName": "Scan your first QR code",
        "required": [],
        "completed": false
      },

           {
        "id": "quest1task1",
        "displayName": "Scan your second QR code",
        "required": [],
        "completed": false
      },
           {
        "id": "quest1task1",
        "displayName": "Scan your third QR code",
        "required": [],
        "completed": false
      },
           {
        "id": "quest1task1",
        "displayName": "Scan your fouth QR code",
        "required": [],
        "completed": false
      },
           {
        "id": "quest1task1",
        "displayName": "Scan your fith QR code",
        "required": [],
        "completed": false
      }
    ];


    return (
    <div style={{margin:"1rem"}}>
                <img src={kendoReactLogo} alt="KendoReact Logo" />
      <div>
        <div className="example-wrapper">
          <div className="page">
            <div className="content">
        
            </div>
          </div>
        </div>
      </div>
 <hr/>
 <h3>{eventName}</h3>
<p>{eventDescription}</p>

{tasks.map(t =>  <p style={{display:'flex', gap: "1rem"}}><Checkbox defaultChecked={t.completed} size={'large'} /> {t.displayName}</p>  )}
  </div>
  );
}

export default App;
