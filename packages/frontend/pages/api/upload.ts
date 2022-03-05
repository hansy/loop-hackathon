import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  url: string;
  id: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { fileName } = req.query;
  const response = await fetch(
    "https://livepeer.com/api/asset/request-upload",
    {
      method: "post",
      headers: {
        Authorization: `Bearer ${process.env.LIVEPEER_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: fileName }),
    }
  );
  const {
    url,
    asset: { id },
  } = await response.json();
  console.log(id);

  res.status(200).json({ url, id });
}
