import React, { useEffect, useState } from 'react';

const Permissions = () => {
  const [users, setUsers] = useState([]);
  const [pages, setPages] = useState([]);
  const [permissions, setPermissions] = useState({});
  const [error, setError] = useState('');

  useEffect(() => {
    fetchUsers();
    fetchPages();
    fetchPermissions();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch('https://sikligarapi-fpe3b0bjfhgsadg5.centralindia-01.azurewebsites.net/api/v1/getAllUsers');
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const result = await response.json();
      console.log("Users:",result);
      setUsers(Array.isArray(result.data) ? result.data : []);
    } catch (error) {
      setError(error.message);
    }
  };

  const fetchPages = async () => {
    try {
      const response = await fetch('https://sikligarapi-fpe3b0bjfhgsadg5.centralindia-01.azurewebsites.net/api/v1/getAllpages');
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const result = await response.json();
      console.log("Pages:",result);
      setPages(Array.isArray(result.data) ? result.data : []);
    } catch (error) {
      setError(error.message);
    }
  };

  const fetchPermissions = async () => {
    try {
      const response = await fetch('https://sikligarapi-fpe3b0bjfhgsadg5.centralindia-01.azurewebsites.net/api/v1/getAllUserPermissions');
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const result = await response.json();
      console.log("Permissions:",typeof result.data);
      if (!Array.isArray(result.data)) {
        throw new Error('Invalid permissions data');
      }
      const permissionsData = {};
      result.data.forEach(permission => {
        if (!permissionsData[permission.user_id]) {
          permissionsData[permission.user_id] = [];
        }
        permissionsData[permission.user_id].push(permission.page_id);
      });

      console.log("permissionsData: ",permissionsData);
      setPermissions(permissionsData);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleCheckboxChange = async (userId, pageId, isChecked) => {
    console.log("userId", typeof toString(userId), "pageId", pageId, "isChecked", isChecked);
  
    // Update local permissions state
    const updatedPermissions = { ...permissions };
    if (isChecked) {
      if (!updatedPermissions[userId]) {
        updatedPermissions[userId] = [];
      }
      if (!updatedPermissions[userId].includes(pageId)) {
        updatedPermissions[userId].push(pageId);
      }
    } else {
      if (updatedPermissions[userId]) {
        updatedPermissions[userId] = updatedPermissions[userId].filter(id => id !== pageId);
        if (updatedPermissions[userId].length === 0) {
          delete updatedPermissions[userId];
        }
      }
    }
    setPermissions(updatedPermissions);
  
    // Send update to the server
    try {
      const response = await fetch('https://sikligarapi-fpe3b0bjfhgsadg5.centralindia-01.azurewebsites.net/api/v1/permissions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: userId.toString(),
          pageId: pageId.toString(),
          granted: isChecked,
        }),
      });
  
      if (!response.ok) {
        throw new Error('Failed to update permissions');
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div>
      <h2>User Permissions</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <table>
        <thead>
          <tr>
            <th>User</th>
            {console.log("pagess sdsd", pages )}
            {pages.map(page => (
              <th key={page.id}>{page.name}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {console.log(users)}
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.Name}</td>
              {pages.map(page => (
                <td key={page.id}>
                  <input
                    type="checkbox"
                    checked={(permissions[user.Id] || []).includes(page.id)}
                    onChange={(e) => handleCheckboxChange(user.Id, page.id, e.target.checked)}
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Permissions;
