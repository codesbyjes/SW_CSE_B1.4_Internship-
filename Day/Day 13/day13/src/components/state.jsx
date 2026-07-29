// Key points:
    // > State is like memory of a componnent
    // > State is managed inside the component
    // > State can change over time
    // > When the state changes, react re-renders the component
// Why it matters:
    // State makes the component dynamic & interactive
    // User input
    // Api data loads
    // Form value
import { useState } from "react";
function Counter() {
    // count is the state, setCount update it
    const [count,setCount] = useState(0);
    // const [cartItemCount,setCartItemCount] = useState(0);
    // const [carSpeed,setCarSpeed] = useState(0);

    return(
        <div>
            <h2>Counter</h2>
            <p>Count: {count}</p>

            <button onClick={() => setCount(count + 1)}>Increase</button>
            <button onClick={() => setCount(count - 1)}>Decrease</button>
        </div>
    );
}

export default Counter;