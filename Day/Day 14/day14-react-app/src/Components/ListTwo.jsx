function UserList(){
    const users = [
        
            {id:1,name:"Jes",role:"developer"},
            {id:2,name:"ini",role:"software engineer"},
            {id:3,name:"pinky",role:"IT professional"},
        
        
    ];
    return (
        <div ClassName = "list-box">
            <h3>User List</h3>
            <ul>
                {/*map()*/}
                {users.map((user)=>(
                    <li key={user.id}> {user.name}, is a {user.role}</li>
                ))}
            </ul>
        </div>
    )
}
export default UserList;