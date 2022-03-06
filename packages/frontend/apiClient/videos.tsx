import { postGQL } from "../util/request";

export const getVideos = async (userAddress: string) => {
  const loweredAddress = userAddress.toLocaleLowerCase();

  const query = `
  query {
    videos(
      where: {
        creator: "${loweredAddress}"
      }
    ) {
      id
      price
      ipfsHash
      src
      title
      description
      creator {
        id
      }
      purchases {
        user {
          id
        }
      }
    }
  }
    
  `;

  try {
    return await postGQL(query, null, "videos");
  } catch (e) {
    console.log(e);

    return [];
  }
};
