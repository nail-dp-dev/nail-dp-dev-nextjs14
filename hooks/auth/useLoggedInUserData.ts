'use client'

import { useEffect, useState } from 'react';
import { UserData } from '../../types/dataType';
import { getUserData } from '../../api/user/getUserData';
import { useSelector } from 'react-redux';
import { selectLoginStatus } from '../../store/slice/loginSlice';

const useLoggedInUserData = () => {
  
  const [userData, setUserData] = useState<UserData | null>(null);
  const [userPointData, setUserPointData] = useState<number>(0);
  const isLoggedIn = useSelector(selectLoginStatus);
  
  useEffect(() => {
    const getData = async () => {
      try {
        let data;
        if (isLoggedIn === 'loggedIn') {
          data = await getUserData();
          setUserData(data);
          setUserPointData(data.data.point);
        }
      } catch (error) {
        console.error(error);
      }
    };

    getData();
  }, [isLoggedIn]);

  return { userData, userPointData };
}

export default useLoggedInUserData;
