// Event Handling is the way components respond to user actions and browser events
// clicks, typing, form submissions, hovering, key presses

// 1.Events are named in camelCase(onClick, ❌onclick, ❌OnClick)
// 2.We pass a function reference as the handler, not a string
// 3.🌟 default behaviour of reactJS is to rerender when state gets modified, forms 
// if gets re-rendered then the content: 

function ClickDemo() {
    function handleSeperateClick() {
        alert("Seperate handler clicked");
    }

    return(
        <div>
            <h6>Click demo</h6>
            <button onClick={handleSeperateClick}>Seperate Handler</button>

            <button onClick={()=>alert("Inline handler clicked")}>Inline Handler</button>
        </div>
    )
}
export default ClickDemo;