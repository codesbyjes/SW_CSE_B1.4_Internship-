import Button from './components/FunctionalComponent'
import { LeftArrow,RightArrow } from "./components/FunctionalComponentTwo";

import ProfileList from "./components/Props";
import InfoBoxDemo from "./components/PropsTwo";

import './App.css'

const name = "Amay";
const isLoggedIn = false;

function App() {
 
  return (
    // React Fragments
    <>
      {/* JSX Rule 1: Return one parent element */}
      <h1>Hello</h1>
      <p>Hello again</p>

      {/* JSX Rule 2: Every tag must be closed properly */}
      <p>Error</p>
      <input type="text" />

      {/* JSX Rule 3: use camelCase for attributes */}
      <button onClick onSubmit>Click</button>

      {/* JSX Rule 4: Embedding JavaScript with curly braces */}
      <h3>Hello, {name}</h3>

      {/* JSX Rule 5: use expressions, not statements */}
      <p>{isLoggedIn ? "Welcome back" : "Please Login"}</p>

      <Button />
      <LeftArrow />
      <RightArrow />

      <ProfileList />

      <InfoBoxDemo />
    </>
    
  )
}

export default App