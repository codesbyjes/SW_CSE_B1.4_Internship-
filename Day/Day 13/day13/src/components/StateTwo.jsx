import { useState } from 'react';

function ToggleText() {
    // showText is a state
    const [showText, setShowText] = useState(true);

    return(
        <div className="toggle">
            <h2>Toggle Text</h2>
            <button onClick={()=>setShowText(!showText)}>{showText ? "Hide" : "Show"}</button>
            {/* showText ? "Hide" : "Show"  is conditional rendering*/}
            {showText && <p>Now you can see this text.</p>}
        </div>
    );
}
export default ToggleText;