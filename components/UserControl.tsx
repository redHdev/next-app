"use client"
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useUsers } from '@/contexts/UserProvider';

const apiURl = process.env.API_URL || 'http://127.0.0.1:50000';

type FormData = {
    firstName: string;
    middleName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    address: string;
  };
  
  const UserControls: React.FC = () => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>();
    // const { addUser } = useUsers();
    const [showAddUserModal, setShowAddUserModal] = useState(false);
  
    const onSubmit = async (data: FormData) => {
      const response = await fetch(`${apiURl}/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
            registered: new Date(),
            ...data
          }),
      });
      if (response.status === 200) {
        console.log(response, "response");
      }
      reset();
      setShowAddUserModal(false);
    };
  
    return (
        <div className="relative">
        <div>
          <input className="border p-2 rounded" type="text" placeholder="Search users..." />
          <button onClick={() => setShowAddUserModal(true)} className="bg-blue-500 text-white p-2 rounded ml-10">Add User</button>
        </div>
  
        {showAddUserModal && (
          <div className="fixed top-0 left-0 w-full h-full bg-gray-500 bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-8 rounded shadow-xl w-100">
              <button onClick={() => setShowAddUserModal(false)} className="absolute top-2 right-2 text-gray-400 hover:text-gray-700">&times;</button>
              <h2 className="text-xl mb-4">Add New User</h2>
              <form onSubmit={handleSubmit(onSubmit)}>
                
                <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-6 mb-4">
                    <div className="flex-1 flex flex-col space-y-2">
                        <label className="text-sm font-semibold text-left">First Name <span className="text-red-500">*</span></label>
                        <input className={`border p-2 rounded w-full ${errors.firstName ? 'border-red-500' : 'border-gray-300'}`} {...register('firstName', {required : true})} />
                        {errors.firstName && <span className="text-red-500 text-sm text-[14px]">This field is required</span>}
                    </div>
                    <div className="flex-1 flex flex-col space-y-2">
                        <label className="text-sm font-semibold text-left">Middle Name</label>
                        <input className={`border p-2 rounded w-full`} {...register('middleName')} />
                    </div>
                    <div className="flex-1 flex flex-col space-y-2">
                        <label className="text-sm font-semibold text-left">Last Name <span className="text-red-500">*</span></label>
                        <input className={`border p-2 rounded w-full ${errors.lastName ? 'border-red-500' : 'border-gray-300'}`} {...register('lastName', {required : true})} />
                        {errors.lastName && <span className="text-red-500 text-sm text-[14px]">This field is required</span>}
                    </div>
                </div>
                
                <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-6 mb-4">
                    <div className="flex-1 flex flex-col space-y-2">
                        <label className="text-sm font-semibold text-left">Email <span className="text-red-500">*</span></label>
                        <input className={`border p-2 rounded w-full ${errors.email ? 'border-red-500' : 'border-gray-300'}`} {...register('email', {required : true})} />
                        {errors.email && <span className="text-red-500 text-sm text-[14px]">This field is required</span>}
                    </div>
                    <div className="flex-1 flex flex-col space-y-2">
                        <label className="text-sm font-semibold text-left">Phone Number</label>
                        <input className={`border p-2 rounded w-full`} {...register('phoneNumber')} />
                    </div>
                </div>
                
                <div className="flex flex-col space-y-2 mb-4">
                    <label className="text-sm font-semibold text-left">Address</label>
                    <input className="border p-2 rounded w-full border-gray-300" {...register('address')} />
                </div>
                
                <div className="flex justify-between">
                  <button type="submit" className="bg-green-500 text-white p-2 rounded">Submit</button>
                  <button type="button" onClick={() => {setShowAddUserModal(false); reset();}} className="bg-red-500 text-white p-2 rounded">Cancel</button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
      );
  };
  
  export default UserControls;