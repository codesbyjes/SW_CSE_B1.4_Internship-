function SimpleList(params) {
    const items = ["Apple", "Banana", "Cherry", "Mango"];
    return(
        <div className="list-box">
            <h3>Simple List</h3>
            <ul>
                {/* map() */}
                {items.map((item)=>(
                    <li key={item}>{item}</li>
                ))}
            </ul>
        </div>
    );
}
export default SimpleList;