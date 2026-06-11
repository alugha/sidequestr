import type { ReactElement  } from 'react';
import './App.css';

// https://www.npmjs.com/package/@yudiel/react-qr-scanner
import { Scanner } from '@yudiel/react-qr-scanner';

function App(): ReactElement {

    return (
    <div style={{margin:"1rem"}}>
<h2>Scan a code and keep questing</h2>

    <div style={{width:"15rem"}}>  
     <Scanner 
     
      onScan={(result) => console.log(result)}
      onError={(error) => console.log(error?.message)}
    /></div>
  </div>
  );
}

export default App;
