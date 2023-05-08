import { NextApiRequest, NextApiResponse } from "next";

import prismadb from '@/lib/prismdb'
import serverAuth from "@/lib/serverAuth";

export default async function handkler(req:NextApiRequest, res:NextApiResponse) {
  if (req.method !== "GET") {
    return res.status(405).end()
  }

  try {
    await serverAuth(req, res)

    const {movieId} = req.query
    if (typeof movieId !== "string") {
      throw new Error('Invalid ID, not a sting')
    }

    if (!movieId) {
      throw new Error('Invalid ID, no query')
    }

    const movie = await prismadb.movie.findUnique({
      where: { 
        id: movieId,
      }
    })

    if (!movie) {
      throw new Error('Ivalid ID, no movie')
    }

    return res.status(200).json(movie)

  } catch (err) {
    console.log(err)
    return res.status(400).end()
  }
}