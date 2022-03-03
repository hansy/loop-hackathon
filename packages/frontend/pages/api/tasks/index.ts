import type { NextApiRequest, NextApiResponse } from "next";
import { checkIPFSMigration } from "../../../models/task";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const { method, headers } = req;

  if (
    method === "POST" &&
    headers["x-cronjob-key"] === process.env.CRONJOB_KEY
  ) {
    try {
      await checkIPFSMigration();

      return res.status(200).json({});
    } catch (e: any) {
      return res.status(e.statusCode).json(e);
    }
  }

  res.status(404).json({});
}
