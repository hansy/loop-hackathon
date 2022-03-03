import type { NextApiRequest, NextApiResponse } from "next";
import { getUserByWalletAddress } from "../../../models/user";
import { createVideo } from "../../../models/video";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  if (req.method === "POST") {
    const { price, title, description, assetId } = req.body;

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
  }

  res.status(404).json({});
}
