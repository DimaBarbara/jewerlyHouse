import React, { useState, useEffect } from 'react';
import type { IUser } from '../../models/IUser';
import Loader from '../../pages/common/Loader';

const AccountData = () => {
  const [userData, setUserData] = useState<IUser | null>(null);
  useEffect(() => {
    const userJson = localStorage.getItem('currentUser');
    
    if (userJson) {
      try {
        const userObject = JSON.parse(userJson);
        setUserData(userObject);
      } catch (error) {
        console.error("Error parsing user data from Local Storage:", error);
      }
    }
  }, []);

  const name = userData?.name || 'N/A';
  const surname = userData?.surname || 'N/A'; 
  const email = userData?.email || 'N/A';

  if (!userData) {
    return (
        <Loader />
    );
  }

  return (
    <div className="flex flex-col items-start !mx-auto w-[850px] h-[500px] bg-gray-300 !pt-10 !px-16 overflow-hidden !mb-5 !mt-5">
      <h2 className="text-3xl font-bold text-gray-800">My profile</h2>
      
      <div className="flex flex-col gap-6 w-full">
        <h3 className="text-xl font-semibold text-gray-700 border-b pb-2 text-start">Personal Information</h3>
        <div className="grid grid-cols-2 gap-x-10 gap-y-4 text-gray-800">
          <div className='flex items-center justify-between relative'>
            <p className="text-lg font-medium">Name:</p>
            <p className="text-lg font-semibold">{name}</p>
            <div className="absolute bottom-0 left-1/2 w-full -translate-x-1/2 border-custom-dash h-[1px]"></div>
          </div>
          <div className='flex items-center justify-between relative'>
            <p className="text-lg font-medium ">Surname:</p>
            <p className="text-lg font-semibold">{surname}</p>
            <div className="absolute bottom-0 left-1/2 w-full -translate-x-1/2 border-custom-dash h-[1px]"></div>
          </div>
          <div className="flex items-center justify-between col-start-1 mt-4 relative"> 
            <p className="text-lg font-medium ">Email:</p>
            <p className="text-lg font-semibold">{email}</p>
            <div className="absolute bottom-0 left-1/2 w-full -translate-x-1/2 border-custom-dash h-[1px]"></div>
          </div>
          
        </div>
        <div className="mt-6 flex justify-end">
            <button className="px-5 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition duration-150">
                Edit Profile
            </button>
        </div>

      </div>
    </div>
  )
}

export default AccountData;