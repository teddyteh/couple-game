import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(
  _req: NextApiRequest,
  res: NextApiResponse<string[]>
) {
  res.status(200).json(["adult", "test1", "test2"]);
}
