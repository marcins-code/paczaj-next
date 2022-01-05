import { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";
import DB from '../../../db/db';



const handler = nc<NextApiRequest, NextApiResponse>({
  onError: (err, req, res, next) => {
    console.error(err.stack);
    res.status(500).end("Something broke!");
  },
  onNoMatch: (req, res, next) => {
    res.status(404).end("Page is not found");
  },
})
//   .use(someMiddleware())
  // .get((req, res) => {
  //   res.send("Hello world");
  // })
  // .post(async(req, res) => {
  //   // console.log(req.body);
  //   const body = req.body
  //   const db = await DB.setUp();
  //   const ATCollection = db.collection('articleTypes');
  //   const insert = await ATCollection.insertOne({...body})
  //   res.status(201).send({...insert});
    
  // })
  // .put(async (req, res) => {
  //   res.status(200).send({...req.body});
  // })
  // .patch(async (req, res) => {
  //   throw new Error("Throws me around! Error can be caught and handled.");
  // });

export default handler;
