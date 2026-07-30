import { useState, useEffect } from "react";

function UserListHook() {
    // 1. Fixed lowercase 'usestate' typos
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    // 2. Fixed duplicate variable 'loading' to 'error'
    const [error, setError] = useState(null);

    useEffect(() => {
        // 3. Fixed 'htptps' typo in URL
        fetch("https://jsonplaceholder.typicode.com/users")
            .then((res) => {
                if (!res.ok) {
                    throw new Error("Failed to fetch data");
                }
                return res.json();
            })
            .then((data) => {
                setUsers(data);
                setError(null);
                setLoading(false);
            })
            .catch((err) => {
                setError(err.message);
                setLoading(false);
            });
    }, []); // 4. Fixed brackets: moved closing parenthesis after the array

    if (loading) {
        return <div>Loading users....</div>;
    }

    if (error) {
        // 5. Removed accidental line break after 'return'
        return <div>Error: {error}...</div>;
    }

    return (
        // 6. Wrapped multiple JSX tags in a single parent Fragment (<>...</>)
        <>
            <h3>useEffect example</h3>
            <ul>
                {users.map((user) => (
                    <li key={user.id}>
                        {/* Note: JSONPlaceholder uses user.company.name or user.username, not user.role */}
                        {user.name} ({user.username})
                    </li>
                ))}
            </ul>
        </>
    );
}

// 7. Capitalised the export name to match the function definition
export default UserListHook;
