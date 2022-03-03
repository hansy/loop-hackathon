import { post } from "./request";

export const pinJSONFile = async (json: any) => {
  return await post("https://api.pinata.cloud/pinning/pinJSONToIPFS", json, {
    "Content-Type": "application/json",
    Authorization: `Bearer ${process.env.PINATA_JWT}`,
  });
};
