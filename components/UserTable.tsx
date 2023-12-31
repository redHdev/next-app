"use client"
import React, { useEffect, useRef, useState } from 'react';
import { buildQueryString } from '@/util';
import { useUsers } from '@/contexts/UserProvider';

const apiURl = process.env.API_URL || 'http://127.0.0.1:50000';

type User = {
    id: number;
    firstName: string;
    middleName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    address: string;
    registered: Date;
};

const UserTable: React.FC = () => {
    // const { users, setUsers } = useUsers();
    const [users, setUsers] = useState<User[] | null>(null)
    const [loading, setLoading] = useState(false)
    // const [userID, setUserID] = useState(0)
    let userID = 0
    const loader = useRef(null);

    const fetchMoreUsers = async () => {
        console.log(users);
        setLoading(true);
        try {
            const queryParams = {
                search : "",
                after : userID
            };
    
            const query = buildQueryString(queryParams);
            const response = await fetch(`${apiURl}/users?${query}`);
            const newUsersResponse = await response.json();
            const newUsers = newUsersResponse.data;
        
            setUsers((prevUsers) => {
              return [...(prevUsers || []), ...newUsers];
            });
            userID += newUsers.length
        } catch (error) {
            
        } finally {
            setLoading(false)
        }
      };

    
    useEffect(() => {
        const observer = new IntersectionObserver(
          entries => {
            if (entries[0].isIntersecting) {
              fetchMoreUsers();
            }
          },
          { threshold: 1 }
        );
      
        if (loader.current) {
          observer.observe(loader.current);
        }
      
        return () => {
          if (loader.current) {
            observer.unobserve(loader.current);
          }
        };
      }, [loader]);

    const editUser = (id: number) => {
      console.log(id);
    }

    const removeUser = (id: number) => {
      console.log(id);
    }

    return (
        <div className="mt-8 overflow-x-auto">
            <table className="min-w-full bg-white border">
                <thead>
                    <tr>
                        <th className="border p-2">First Name</th>
                        <th className="border p-2">Middle Name</th>
                        <th className="border p-2">Last Name</th>
                        <th className="border p-2">Email</th>
                        <th className="border p-2">Phone Number</th>
                        <th className="border p-2">Address</th>
                        <th className="border p-2">Registered</th>
                        <th className="border p-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users && users.map((user: User) => (
                        <tr key={user.id}>
                            <td className="border p-2">{user.firstName}</td>
                            <td className="border p-2">{user.middleName}</td>
                            <td className="border p-2">{user.lastName}</td>
                            <td className="border p-2">{user.email}</td>
                            <td className="border p-2">{user.phoneNumber}</td>
                            <td className="border p-2">{user.address}</td>
                            <td className="border p-2">{new Date(user.registered).toLocaleDateString()}</td>
                            <td className="border p-2">
                                <button onClick={() => editUser(user.id)} className="bg-blue-500 text-white p-2 rounded mr-2">Edit</button>
                                <button onClick={() => removeUser(user.id)} className="bg-red-500 text-white p-2 rounded">Remove</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {loading && <p>Loading...</p>}
            <div ref={loader}></div>
        </div>
    );
};

export default UserTable;
