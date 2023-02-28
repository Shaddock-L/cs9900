import { NextApiResponse, NextApiRequest } from "next";

export default function hellow(
  _req: NextApiRequest,
  res: NextApiResponse<string>
) {
  return res.status(200).json("hello world");
}
