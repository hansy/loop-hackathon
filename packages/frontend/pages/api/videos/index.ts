import type { NextApiRequest, NextApiResponse } from "next";
import { getUserByWalletAddress } from "../../../models/user";
import { createVideo, getVideos } from "../../../models/video";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const { method, body } = req;

  if (method === "POST") {
    const { price, title, description, assetId } = body;

    try {
      const user = await getUserByWalletAddress("test", "test");
      const video = await createVideo(user.id, {
        price,
        title,
        description,
        assetId,
      });

      return res.status(201).json({ data: video });
    } catch (e: any) {
      return res.status(e.statusCode).json(e);
    }
  } else if (method === "GET") {
    try {
      const user = await getUserByWalletAddress("test", "test");
      const videos = await getVideos(user.id);

      return res.status(200).json({ data: videos });
    } catch (e: any) {
      return res.status(e.statusCode).json(e);
    }
  }

  res.status(404).json({});
}
