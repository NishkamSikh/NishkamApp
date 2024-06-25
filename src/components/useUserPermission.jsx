import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const useUserPermission = (currentPageId) => {
    const [hasPermission, setHasPermission] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const getUserID = localStorage.getItem("UserId");

        const fetchUserPermission = async () => {

            console.log(getUserID,currentPageId ,"Fetch Componets Works");
            try {
                const response = await fetch('http://localhost:3000/api/v1/getAllUserPermissions');

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const data = await response.json();

                if (data.status === 'success') {
                    const filteredPermissions = data.data.filter((entry) => entry.user_id == getUserID);
                    const pagePermission = filteredPermissions.some((permission) => permission.page_id === currentPageId);
                    setHasPermission(pagePermission);

                    console.log(pagePermission, "pagePermission");

                    if (!pagePermission && error === null) {
                        navigate('/');
                    }
                } else {
                    throw new Error('API returned an unsuccessful status');
                }
            } catch (error) {
                setError(error.message);
                console.error('Error fetching the data:', error);
            }
        };

        fetchUserPermission();
    }, [navigate, currentPageId, error]);

    return { hasPermission, error };
};

export default useUserPermission;
