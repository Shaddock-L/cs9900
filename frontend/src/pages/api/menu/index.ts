import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import { ApiEndpionts } from "@src/configs";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const category = req.query.category;
  const keyword = req.query.search ?? "";

  const menu = (await axios.get(ApiEndpionts.GetMenu)).data as Array<MenuItem>;

  if (category === "all") {
    res.status(200).json(
      menu.filter((item) => {
        return item.name.toLowerCase().includes(keyword as string);
      })
    );
  } else {
    res.status(200).json(
      menu.filter((item) => {
        return (
          item.category === category &&
          item.name.toLowerCase().includes(keyword as string)
        );
      })
    );
  }
}
