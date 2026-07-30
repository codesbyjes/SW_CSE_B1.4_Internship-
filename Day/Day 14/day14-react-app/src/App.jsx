import './App.css'
import SimpleList from "./components/ListOne";
import UserList from "./components/ListTwo";
import ProductListDemo from "./components/ListThree";
import CounterHook from "./components/HookOne";
import UserListHook from "./components/HookTwo"
import ThemeProviderDemo from "./components/HookThree"
import SimpleNameForm from "./components/FormOne"
import SignupForm from "./components/FormTwo"
import ValidatedForm from "./components/FormThree"
import GitHubUsersList from "./components/FetchingData"
import GitHubProfile from "./components/FetchingDataTwo"


function App() {
  
  return (
    <>
      <SimpleList />
      <UserList />
      <ProductListDemo />
      <CounterHook/>
      <UserListHook/>
      <ThemeProviderDemo/>
      <SimpleNameForm/>
      <SignupForm/>
      <ValidatedForm/>
      <GitHubUsersList/>
      <GitHubProfile/>

    </>
  )
}

export default App