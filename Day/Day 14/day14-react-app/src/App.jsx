import './App.css'
import SimpleList from "./components/ListOne";
import UserList from "./components/ListTwo";
import ProductListDemo from "./components/ListThree";
import CounterHook from "./components/HookOne";
import UserListHook from "./components/HookTwo"
import ThemeProviderDemo from "./components/HookThree"

function App() {
  
  return (
    <>
      <SimpleList />
      <UserList />
      <ProductListDemo />
      <CounterHook/>
      <UserListHook/>
      <ThemeProviderDemo/>
    </>
  )
}

export default App