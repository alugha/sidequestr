import React, { useState, type ReactElement } from 'react';
import './App.css';
import type { Login } from '../../shared/schemas/auth';
import { useFetchCallable } from './hooks/useFetchCallable';
import type { User } from '../../shared/schemas/user';

import { StackLayout } from '@progress/kendo-react-layout';
import { Button } from '@progress/kendo-react-buttons';
import { FieldWrapper } from '@progress/kendo-react-form';
import { Label } from '@progress/kendo-react-labels';
import { Input } from '@progress/kendo-react-inputs';

function LoginPage({ onLoginSuccess }: { onLoginSuccess(user:User): void }): ReactElement {
  const [name, setName] = useState("");
  const [touched, setTouched] = useState(false);

  const { loading, call: login } = useFetchCallable<User>("/api/login", { method: "POST", headers: { "Content-Type": "application/json" } });

  const handleLogin = async () => {
    try {
      const payload: Login = { name };
      const result = await login({ body: JSON.stringify(payload) })
      if (!result) {
        // TODO: handle API error, e.g. show error notification (do we have a Kendo Toast thingy?)
        console.error("could not log in")
      } else {
        onLoginSuccess(result);
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

  const inputValid = !touched || !!name

  return (
    <form onSubmit={handleSubmit}>
      <StackLayout orientation='vertical' style={{ margin: "1rem" }}>
        <h1>Sidequestr</h1>
        <p>Welcome, traveler! I am glad you have found your way here. The kingdom is in dire need, and His Majesty the King has sent me in search of brave adventurers — and you look like just the kind of hero we need. Great honor awaits those who succeed, and epic rewards along with it.</p>
        <p>But first, tell me... what is your name?</p>
        <StackLayout orientation='vertical' gap="1rem">
          <FieldWrapper>

            <Label editorId={"name"} editorValid={inputValid} editorDisabled={loading}>
              Character Name
            </Label>
            <Input
              value={name}
              valid={inputValid}
              type="text"
              id="name"
              disabled={loading}
              maxLength={255}
              onChange={e => {
                setName(e.value)
                setTouched(true)
              }}
            />
          </FieldWrapper>
          <Button type="submit" disabled={loading || !name}>{loading ? "Loading…" : "Start"}</Button>
        </StackLayout>
      </StackLayout>
    </form >
  );
}

export default LoginPage;
