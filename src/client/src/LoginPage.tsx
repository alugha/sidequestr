import React, { useState, type ReactElement } from 'react';
import './App.css';
import type { Login } from '../../shared/schemas/auth';
import { useFetchCallable } from './hooks/useFetchCallable';
import type { User } from '../../shared/schemas/user';

function LoginPage({ onLoginSuccess }: { onLoginSuccess(): void }): ReactElement {
  const [name, setName] = useState("");

  const { loading, call: login } = useFetchCallable<User>("/api/login", { method: "POST", headers: { "Content-Type": "application/json" } });

  const handleLogin = async () => {
    try {
      const payload: Login = { name };
      const result = await login({ body: JSON.stringify(payload) })
      if (!result) {
        // TODO: handle API error, e.g. show error notification (do we have a Kendo Toast thingy?)
        console.error("could not log in")
      } else {
        onLoginSuccess();
      }
    } catch (err) {
      // TODO: handle network errors
      console.error(err);
    }
  }

  const handleSubmit: React.SubmitEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    void handleLogin();
  }

  return (
    <form onSubmit={handleSubmit}>
      Name: <input value={name} onChange={e => setName(e.currentTarget.value)} required></input>
      <button type="submit" disabled={loading}>{loading ? "Logging in …" : "Login"}</button>
    </form>
  );
}

export default LoginPage;
