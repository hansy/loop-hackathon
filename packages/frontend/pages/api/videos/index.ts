import type { NextApiRequest, NextApiResponse } from "next";
import { getUserByWalletAddress } from "../../../models/user";
import { createVideo, getVideos, updateVideo } from "../../../models/video";
import { getWalletAddress } from "../_util/auth";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const { method, body } = req;
  const address: string = getWalletAddress(req.headers);

  if (method === "POST") {
    const { price, title, description, assetId } = body;

    try {
      const user = await getUserByWalletAddress("eth", address);
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
      const user = await getUserByWalletAddress("eth", address);
      const videos = await getVideos(user.id);

      return res.status(200).json({ data: videos });
    } catch (e: any) {
      return res.status(e.statusCode).json(e);
    }
  } else if (method === "PUT") {
    const { id } = req.body;

    try {
      // await getUserByWalletAddress("eth", address);

      // this is not secure
      const video = await updateVideo(id, {
        status: "deployed",
      });

      return res.status(200).json({ data: video });
    } catch (e: any) {
      return res.status(e.statusCode).json(e);
    }
  }

  res.status(404).json({});
}
