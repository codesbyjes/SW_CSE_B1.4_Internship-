const name = "Jes"

const IsLoggedIn = true

function App() {
  return (
    // React Fragments
    <>
      <p>
      Rule 1 : Return one parent element
      </p>
      <h3>hello</h3>
      <h3>hello again</h3>
      <br></br>

     <p>
      Rule 2:  every tag must be closed properly
      </p>

      <h3>Error</h3>
      <input type = "text"/>
      <br></br><br></br>

      <p>
      Rule 3: use camelCase for attributes
      </p>
      <button OnClick><h3>click</h3></button>
      <br></br>

      <p>
      Rule 4: embedding javascript with curly braces*/</p>
      <h3>Hello, {name} </h3>

      <p>rule 5: use expressions, not statements</p>
      <h3>{IsLoggedIn ? "welcome back": "please Login"}</h3>


    </>
    
  )
}
export default App