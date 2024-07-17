export const postsDetail = [
  {
    postContent: 'string1',
    tags: ['가리비네일', '가리비네일'],
    tempSave: true,
    photos: [
      {
        fileName: "12",
        fileSize: 22,
        fileUrl: 'https://helpx.adobe.com/content/dam/help/en/photoshop/using/convert-color-image-black-white/jcr_content/main-pars/before_and_after/image-before/Landscape-Color.jpg',
      },
      {
        fileName: "13",
        fileSize: 22,
        fileUrl: 'https://helpx.adobe.com/content/dam/help/en/photoshop/using/convert-color-image-black-white/jcr_content/main-pars/before_and_after/image-before/Landscape-Color.jpg',
      },
    ],
    boundary: 'ALL'
  },
  {
    postContent: 'string2',
    tags: ['가리비네일', '가리비네일'],
    tempSave: true,
    photos: [
      {
        fileName: "12",
        fileSize: 22,
        fileUrl: 'https://helpx.adobe.com/content/dam/help/en/photoshop/using/convert-color-image-black-white/jcr_content/main-pars/before_and_after/image-before/Landscape-Color.jpg',
      },
      {
        fileName: "13",
        fileSize: 22,
        fileUrl: 'https://helpx.adobe.com/content/dam/help/en/photoshop/using/convert-color-image-black-white/jcr_content/main-pars/before_and_after/image-before/Landscape-Color.jpg',
      },
    ],
    boundary: 'ALL'
  },
  {
    postContent: 'string3',
    tags: ['가리비네일', '가리비네일'],
    tempSave: true,
    photos: [
      {
        fileName: "12",
        fileSize: 22,
        fileUrl: 'https://helpx.adobe.com/content/dam/help/en/photoshop/using/convert-color-image-black-white/jcr_content/main-pars/before_and_after/image-before/Landscape-Color.jpg',
      },
      {
        fileName: "13",
        fileSize: 22,
        fileUrl: 'https://helpx.adobe.com/content/dam/help/en/photoshop/using/convert-color-image-black-white/jcr_content/main-pars/before_and_after/image-before/Landscape-Color.jpg',
      },
    ],
    boundary: 'ALL'
  },

  {
    postContent: 'string4',
    tags: ['가리비네일', '가리비네일'],
    tempSave: true,
    photos: [
      {
        fileName: "12",
        fileSize: 22,
        fileUrl: 'https://helpx.adobe.com/content/dam/help/en/photoshop/using/convert-color-image-black-white/jcr_content/main-pars/before_and_after/image-before/Landscape-Color.jpg',
      },
      {
        fileName: "13",
        fileSize: 22,
        fileUrl: 'https://helpx.adobe.com/content/dam/help/en/photoshop/using/convert-color-image-black-white/jcr_content/main-pars/before_and_after/image-before/Landscape-Color.jpg',
      },
    ],
    boundary: 'ALL'
  },
  {
    postContent: 'string5',
    tags: ['가리비네일', '가리비네일'],
    tempSave: true,
    photos: [
      {
        fileName: "12",
        fileSize: 22,
        fileUrl: 'https://helpx.adobe.com/content/dam/help/en/photoshop/using/convert-color-image-black-white/jcr_content/main-pars/before_and_after/image-before/Landscape-Color.jpg',
      },
      {
        fileName: "13",
        fileSize: 22,
        fileUrl: 'https://helpx.adobe.com/content/dam/help/en/photoshop/using/convert-color-image-black-white/jcr_content/main-pars/before_and_after/image-before/Landscape-Color.jpg',
      },
    ],
    boundary: 'ALL'
  },
  {
    postContent: "string6",
    tags: ['가리비네일', '가리비네일'],
    tempSave: true,
    photos: [
      {
        fileName: "12",
        fileSize: 22,
        fileUrl: 'https://helpx.adobe.com/content/dam/help/en/photoshop/using/convert-color-image-black-white/jcr_content/main-pars/before_and_after/image-before/Landscape-Color.jpg',
      },
      {
        fileName: "13",
        fileSize: 22,
        fileUrl: 'https://helpx.adobe.com/content/dam/help/en/photoshop/using/convert-color-image-black-white/jcr_content/main-pars/before_and_after/image-before/Landscape-Color.jpg',
      },
    ],
    boundary: 'ALL'
  }
];
interface propPostData {
  postContent: string;
  tags: string[];
  tempSave: boolean;
  photos: {
      fileName: string;
      fileSize: number;
      fileUrl: string;
  }[];
  boundary: string;
}

export const getPostEditData = async (postId: string) => {
  const postData:propPostData = await postsDetail[+postId];

  return postData
};
