import { postGQL } from "../pages/api/_util/request";
import { error } from "../pages/api/_util/error";

export const getUserByWalletAddress = async (
  network: string,
  address: string
) => {
  const query = `
    query {
      users(
        where: {
          network: { _eq: "${network}" }
          wallet_address: { _eq: "${address}" }
        }
      ) {
        id
      }
    }
  `;

  try {
    const users = await postGQL(query, null, "users");

    return users[0] || Promise.reject(error(404, "User not found"));
  } catch (e) {
    return Promise.reject(e);
  }
};
