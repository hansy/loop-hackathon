import { postGQL } from "../pages/api/_util/request";
import { error } from "../pages/api/_util/error";

const createUser = async (walletAddress: string) => {
  const query = `
    mutation {
      insert_users_one(
        object: {
          network: "eth",
          wallet_address: "${walletAddress}"
        }
      ) {
        id
      }
    }
  `;

  return await postGQL(query, null, "insert_users_one");
};

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
    const user = users[0];

    if (user) {
      return user;
    } else {
      return await createUser(address);
    }
  } catch (e) {
    return Promise.reject(e);
  }
};
