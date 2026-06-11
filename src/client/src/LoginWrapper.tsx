import { useEffect, useState, type ReactElement } from 'react';
import './App.css';
import { useFetch } from './hooks/useFetch';
import type { User } from '../../shared/schemas/user';
import LoginPage from './LoginPage';

function LoginWrapper({ children }: { children: React.ReactNode }): ReactElement {
  const [loggedIn, setLoggedIn] = useState(false);

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
    return <LoginPage onLoginSuccess={() => setLoggedIn(true)} />
  }

  return (
    <>
      {children}
    </>
  );
}

export default LoginWrapper;
