// Child component
function InfoBox({title,variant="primary",children}){
    return(
        <div className={`box box-${variant}`}>
            <h3>{title}</h3>
            <div className="content">
                {children}
            </div>
        </div>
    );
}

// Parent component
function InfoBoxDemo() {
    return(
        <div>
            <h2>Info box with props</h2>
            <InfoBox title="Welcome">
                <p>Hi, there 👋</p>
            </InfoBox>

            <InfoBox title="Welcome" variant="Secondary">
                <p>Some details here</p>
                <ul>
                    <li>Item 1</li>
                    <li>Item 2</li>
                </ul>
            </InfoBox>
        </div>
    )
}
export default InfoBoxDemo;