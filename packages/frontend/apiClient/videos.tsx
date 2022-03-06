import { postGQL } from "../util/request";

export const getVideos = async (
  userAddress: string,
  purchaserAddress?: string
) => {
  const loweredAddress = userAddress.toLowerCase();
  let purchases = "";

  if (purchases) {
    const loweredPurchaserAddress = purchaserAddress?.toLowerCase();
    return `
      purchases(
        where: {
          user: "${loweredPurchaserAddress}"
        }
      ) {
        id
      }
    `;
  }

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
      ${purchases}
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
