import { useEffect, useState } from 'react';
import { UserData } from '../types/dataType';
import { getUserData } from '../api/getUserData';


const useUserData = () => {
  
  const [userData, setUserData] = useState<UserData | null>(null);
  const [userPointData, setUserPointData] = useState<number>(0);

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await getUserData();
        setUserData(data);
        setUserPointData(data.data.point);
      } catch (error) {
        console.error(error);
      }
    };

    getData();
  }, []);

  return { userData, userPointData };
}

export default useUserData;
