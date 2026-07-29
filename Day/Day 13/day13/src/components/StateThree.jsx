import { useState } from 'react';

function NameInput() {
    // name is a state
    const [name, setName] = useState("");

    return(
        <div>
            <h4>Enter your name</h4>
            <input type="text" 
            value={name} 
            placeholder="Enter your name" 
            onChange = {(e) => setName(e.target.value)}
            />
            <p>Hello, {name || "Guest"}</p>
        </div>
    );
}
export default NameInput;