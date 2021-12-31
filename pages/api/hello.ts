// // Next.js API route support: https://nextjs.org/docs/api-routes/introduction
// import {Collection,Document} from 'mongodb';
// import type { NextApiRequest, NextApiResponse } from 'next';
// // import {connection } from '../../db/db';

// // import { MongoClient } from "mongodb";
// // const uri =`mongodb://root:rootpassword@localhost:27017/paczajBlogTest?authSource=admin`;
// // const client  = new MongoClient(uri);
// import { connectDb, getDb } from '../../db/db';


export const aa= 44;
// // console.log(await connection());

// // const numner  = async () => {
// //   await client.connect()
// //   const  db = client.db(process.env.MONGO_TEST_DB)
// //   const collection = db.collection('articleTypes');
// // //  console.log(await collection.countDocuments());

// // return await collection.countDocuments();
   
// // };

// // const dd = numner();
// // console.log(dd);
// type Data = {
//   name: string;
// };

// // export default function handler(
// //   req: NextApiRequest,
// //   res: NextApiResponse<Data>
// // ) {
// //   res.status(200).json({ name: 'John Doe 33' });
// // }

// var coll: Collection<Document> 
// connectDb(() => ( coll = getDb("articleTypes") ))
// async function handler(req:NextApiRequest, res:NextApiResponse) {
//   if (req.method === 'GET' && coll) {
//     // const data = req.body;
//    // store db object in this object
   
//     // const client = await MongoClient.connect(
//     //   uri
//     // );
//     // const db = client.db();

//     // const meetupsCollection = dbticleTypes');

//     const result = await coll.aggregate([
//       {$match:{isEnabled:true}},
//     {$facet: {
//           "dataScience": [
//             { $match: {type:"dataScience" }},
//             {$lookup:{
//              from:"articles",
//              let: {id:"$_id"},
//              pipeline:[
//              { $match: 
//                   { isEnabled:true, $expr: { "$eq":["$articleTypeId", "$$id"]}}
//                   },
//                   {$project:{_id:1}}
//              ],
//              as: "articles"
//         }
//     },
//             {$project: {name:1, icon:1, articles:1}},
//            { $addFields: { 'totlaArticle':{$size:'$articles'}}}
            
//           ],
//           "category": [
//             { $match: {type:"category" }},
//             {$lookup:{
//              from:"articles",
//              let: {id:"$_id"},
//              pipeline:[
//              { $match: 
//                   { isEnabled:true, $expr: { "$eq":["$articleTypeId", "$$id"]}}
//                   },
//                   {$project:{_id:1}}
//              ],
//              as: "articles"
//         }
//     },
//             {$project: {name:1, icon:1, articles:1}},
//            { $addFields: { 'totlaArticle':{$size:'$articles'}}}
            
//           ],
//           "series": [
//             { $match: {type:"serie" }},
//             {$lookup:{
//              from:"articles",
//              let: {id:"$_id"},
//              pipeline:[
//              { $match: 
//                   { isEnabled:true, $expr: { "$eq":["$articleTypeId", "$$id"]}}
//                   },
//                   {$project:{_id:1}}
//              ],
//              as: "articles"
//         }
//     },
//             {$project: {name:1, icon:1, articles:1}},
//            { $addFields: { 'totlaArticle':{$size:'$articles'}}}
            
//           ]
//     }
//     },
    
    
//     // { $addFields: { 'datascienceArtlcesNo':{$sum:'$dataScience.totlaArticle'}}}
    
//       ]).toArray()
     
//     console.log(result);

//     // client.close();

//     res.status(201).json({...result.shift()});
//   }
// }

// export default handler;