// UserContext.tsx
"use client"
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { buildQueryString } from '@/util';

const apiURl = process.env.API_URL || 'http://127.0.0.1:50000';

interface User {
  id: number;
  registered: Date;
  firstName: string;
  middleName?: string;
  lastName: string;
  email: string;
  phoneNumber?: string;
  address?: string;
  adminNotes?: string;
}

interface UserProviderProps {   
  children: ReactNode;
}

interface UserContextProps {
  users: User[] | null;
  addUser: (user: User) => Promise<void>;
  setUsers: React.Dispatch<React.SetStateAction<User[] | null>>;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [users, setUsers] = useState<User[] | null>(null);

  const [after, setAfter] = useState<number>(0);
  const [search, setSearch] = useState("");
  const [hasMore, setHasMore] = useState(true);

  const refetchUsers = async () => {
    try {
        const queryParams = {
            search : search,
            after : 0 
        };
        const query = buildQueryString(queryParams)
        console.log(query);

        const resonse = await fetch(`${apiURl}/users?${query}`);
        const refreshUsers = await resonse.json();
        setUsers(refreshUsers.data);
        setHasMore(refreshUsers.hasMore);
        setAfter(prevAfter => {
            const lastUserId = refreshUsers.data[refreshUsers.data.length - 1]?.id || prevAfter;
            return lastUserId;
          });
    } catch (error) {
        console.error('Error refetching users:', error);
    }
  }

  // useEffect(() => {
  //   if(!users){
  //     refetchUsers();
  //   }
  // }, [users]);
  
  const addUser = async (user: User) => {
    // API call or logic to add a user
    // Then, update the state:
    setUsers(prevUsers => [...(prevUsers || []), user]);
  };


  return (
    <UserContext.Provider value={{ users, addUser, setUsers }}>
      {children}
    </UserContext.Provider>
  );
}

export const useUsers = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUsers must be used within a UserProvider");
  }
  return context;
};
