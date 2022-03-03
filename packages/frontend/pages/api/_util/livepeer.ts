import { post } from "./request";
import { error } from "./error";

export const transferVideotoIPFS = async (assetId: string) => {
  try {
    const data = await post(
      `https://livepeer.com/api/asset/${assetId}/export`,
      {
        ipfs: {
          pinata: { jwt: `${process.env.PINATA_JWT}` },
        },
      },
      {
        Authorization: `Bearer ${process.env.LIVEPEER_API_KEY}`,
        "Content-Type": "application/json",
      }
    );

    return data.task.id;
  } catch (e) {
    console.error("Error migrating video to IPFS", e);

    return Promise.reject(error(500));
  }
};
