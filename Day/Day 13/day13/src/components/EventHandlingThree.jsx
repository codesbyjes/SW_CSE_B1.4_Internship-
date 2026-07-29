// Event Handling is the way components respond to user actions and browser events
// clicks, typing, form submissions, hovering, key presses

// 1.Events are named in camelCase(onClick, ❌onclick, ❌OnClick)
// 2.We pass a function reference as the handler, not a string
// 3.🌟 default behaviour of reactJS is to rerender when state gets modified, forms 
// if gets re-rendered then the content: preventDefault()

function ActionButtons({ onGreet, onShowInfo }) {
  return (
    <div className="buttons">
      {/* onClick uses the function passed from parent */}
      <button onClick={onGreet}>Greet</button>
      <button onClick={onShowInfo}>Show Info</button>
    </div>
  );
}

// Parent component that defines the logic and passes it down
function ActionButtonsDemo() {
  function handleGreet() {
    alert("Hello from parent!");
  }

  function handleShowInfo() {
    alert("Info button clicked");
  }

  return (
    <div className="demo">
      <h2>Action Buttons Demo</h2>

      {/* Pass functions as props to child */}
      <ActionButtons onGreet={handleGreet} onShowInfo={handleShowInfo} />
    </div>
  );
}

export default ActionButtonsDemo;