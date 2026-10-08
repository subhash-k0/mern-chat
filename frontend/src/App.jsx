import { useState } from 'react'
import {SignInButton, SignUpButton, UserButton, Show} from "@clerk/react";
import './App.css'

function App() {

  return (
      <div>
        <h1>My app</h1>

        <header>
          <Show when="signed-out">
            <SignInButton />
            <SignUpButton />
          </Show>
          <Show when="signed-in">
            <UserButton />
          </Show>
        </header>

      </div>

  );
}

export default App
