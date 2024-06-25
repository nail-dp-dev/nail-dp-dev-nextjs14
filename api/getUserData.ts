import { UserData } from '../types/dataType';

const data: UserData = {
  "success": true,
  "code": 200,     
  "data": {
    "nickname": "somi",
    "postsCount": 1,
    "saveCount": 1,
    "followerCount": 1,
    "point": 1000
  }
};

export const getUserData = async () => {

  // const res = await fetch("http://localhost:3000/api/getUserData", {
  //   method: "GET",
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  // });

  // if (!res.ok) {
  //   throw new Error(`HTTP error! status: ${res.status}`);
  // }

  // const data = await res.json();

  return data;
};