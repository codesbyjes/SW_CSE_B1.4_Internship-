// Event Handling is the way components respond to user actions and browser events
// clicks, typing, form submissions, hovering, key presses

// 1.Events are named in camelCase(onClick, ❌onclick, ❌OnClick)
// 2.We pass a function reference as the handler, not a string
// 3.🌟 default behaviour of reactJS is to rerender when state gets modified, forms 
// if gets re-rendered then the content: preventDefault()
import { useState } from 'react';

function FormDemo() {
    const [name, setName] = useState("");

    function handleChange(event) {
        setName(event.target.value);
    }

    function handleSubmit(event) {
        event.preventDefault(); //stop page reload
        alert("Submitted name: "+name);
    }

    return(
        <form>
            <h4>Form Demo</h4>
            <input type="text" 
                value={name} 
                placeholder="Enter your name" 
                onChange = {handleChange}
            />

            <button type="submit">Submit</button>
            <p>Hi, {name}. Have a great day.</p>
        </form>
    );
}
export default FormDemo;