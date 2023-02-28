import { NextApiRequest, NextApiResponse } from "next";
import categories from "./category.json";

export default function handler(_req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json(categories);
}
