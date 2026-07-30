import './App.css'
import SimpleList from "./components/ListOne";
import UserList from "./components/ListTwo";
import ProductListDemo from "./components/ListThree";
import CounterHook from "./components/HookOne";
import UserListHook from "./components/HookTwo"

function App() {
  
  return (
    <>
      <SimpleList />
      <UserList />
      <ProductListDemo />
      <CounterHook/>
      <UserListHook/>
    </>
  )
}

export default App