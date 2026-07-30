import { useState, useEffect } from "react";

// GitHubUsersList demonstrates:
// - Basic data fetching with useEffect
// - Storing fetched data in state
// - Rendering a list from API response
function GitHubUsersList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Fetch list of GitHub users when component mounts
    fetch("https://api.github.com/users")
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
      })
      .catch((err) => {
        console.error("Error fetching users:", err);
      });
  }, []); // empty dependency array → run once on mount

  return (
    <div className="fetch-box">
      <h2>GitHub Users List</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.login}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default GitHubUsersList;