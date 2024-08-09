'use client'

import { useEffect, useState } from 'react';
import { UserData } from '../../types/dataType';
import { getUserData } from '../../api/user/getUserData';
import { useSelector } from 'react-redux';
import { selectLoginStatus } from '../../store/slices/loginSlice';

const useLoggedInUserData = () => {
  
  const [userData, setUserData] = useState<UserData | null>(null);
  const [userPointData, setUserPointData] = useState<number>(0);
  const [userProfileUrl, setUserProfileUrl] = useState<string>('');
  const isLoggedIn = useSelector(selectLoginStatus);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        let data;
        if (isLoggedIn === 'loggedIn') {
          data = await getUserData();
          setUserData(data);
          setUserPointData(data.data.point);
          setUserProfileUrl(data.data.profileUrl)
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [isLoggedIn]);

  return { userData, userPointData, userProfileUrl, setUserProfileUrl };
}

export default useLoggedInUserData;
