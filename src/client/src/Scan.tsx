import { useCallback, useState  } from 'react';
import './App.css';

// https://www.npmjs.com/package/@yudiel/react-qr-scanner
import { Scanner } from '@yudiel/react-qr-scanner';
import { Button } from '@progress/kendo-react-buttons';
import { Input } from '@progress/kendo-react-inputs';

const Scan:React.FC = ()=>{

  const [taskId,setTaskId] = useState('');
  const [success,setSuccess] = useState<null|boolean>(null);

    const completeTask = useCallback((taskId:string)=>{
      fetch(`/api/task/${taskId}`,{method:"PUT"}).then((r)=>{setSuccess(r.ok)}).catch(()=>{setSuccess(false)});
    },[])

    return (
    <div style={{margin:"1rem"}}>
    <h2>Scan a code and keep questing</h2>

    {success === true && <>
      <h2>Hussah!</h2>
      <p>You successfully claimed your magical object and made progress. Congratulations. But your journey is not over yet. More stuff to find out there, keep your eyes open!</p>
      </>
    }
    {success === false && <><h2>Huh?!</h2>
    <p>It appears that whatever your experiment is about, it is not working. Maybe you are holding it wrong. Stay focused.</p></>}
    {success !== null ? <Button onClick={()=>setSuccess(null)}>Make another claim</Button> : 
      <>
        <div style={{width:"15rem", margin:"0 auto", maxWidth:"calc(100vw - 1rem)"}}>  
          <Scanner 

            onScan={(result) => completeTask(result[0].rawValue)}
            onError={(error) => console.log(error?.message)}
          />
            
          </div>
          <h3>No camera available?</h3>
          <form onSubmit={(e)=>{e.preventDefault();completeTask(taskId)}}>
            <label  >Code<Input type="text" onChange={e=>setTaskId(e.target.value as string)} required/></label> 
            <Button type="submit" style={{width:'100%'}}>Complete a task</Button>
          </form>   
        </>}
    
  </div>
  );
}

export default Scan;
