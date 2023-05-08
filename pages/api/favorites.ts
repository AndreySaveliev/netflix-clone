import { NextApiRequest, NextApiResponse } from "next";
import prismadb from '../../lib/prismdb'
import serverAuth from "@/lib/serverAuth";

export default async function hendler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).end()
  }

  try {
    const {currentUser} = await serverAuth(req, res)

    const favoriteMovies = await prismadb.movie.findMany({
      where: {
        id: {
          in: currentUser?.favoriteIds
        }
      }
    })
    return res.status(200).json(favoriteMovies)
  } catch (err) {
    console.log(err)
    res.status(400).end()
  }
}