import { useState } from "react";

function CounterHook() {
    
    const [count, setCount] = useState(0);
    const [step, setStep] = useState(1);

    function handleIncrease() {
        setCount((prev) => prev + step);
    }


    function handleReset() {
        setCount(0);

    }

    function handleStepChange(event) {
        const value = Number(event.target.value);
        setStep(value);
    }
    return (
        <div>
            <h3>COUNT INCREASER</h3>
            <p>Count: {count} </p>
            no

            Step: <input type="number" value={step} onChange={handleStepChange} />
            <div>
                <button onClick={handleIncrease}>Increase</button>
                <button onClick={handleReset}>Reset</button>
            </div>


        </div>
    )
}
export default CounterHook;