import { createContext, useEffect, useState, type ReactElement } from 'react';
import './App.css';
import { useFetch } from './hooks/useFetch';
import type { User } from '../../shared/schemas/user';
import LoginPage from './LoginPage';

export const SessionContext = createContext<User|null>(null);

function LoginWrapper({ children }: { children: React.ReactNode }): ReactElement {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user,setUser] = useState<User|null>(null);

  // TODO: handle errors
  const { data, loading } = useFetch<User>("/api/auth")

  useEffect(() => {
    if (!loading) {
      setLoggedIn(data != null)
    }
  }, [loading, data])

  if (loading) {
    return (
      <>
        Loading ...
      </>
    )
  }

  if (!loggedIn) {
    return <LoginPage onLoginSuccess={(user) => {setLoggedIn(true);setUser(user)}} />
  }

  return (
    <SessionContext value={data??user}>
      {children}
    </SessionContext>
  );
}

export default LoginWrapper;
