import type { NextApiRequest, NextApiResponse } from "next";

export const SKUS = {
  adult: "adult",
  the_adviser: "the_adviser",
}
export default function handler(
  _req: NextApiRequest,
  res: NextApiResponse<string[]>
) {
  res.status(200).json([SKUS.adult, SKUS.the_adviser]);
}
