import { ErrorMessage } from 'formik';
import { ObjectId } from 'mongodb';
import { NextApiRequest, NextApiResponse } from 'next';
import nc from 'next-connect';
import DB from '../../../db/db';

const dbConnect = async () => {
  const db = await DB.setUp();
  const ATCollection = db.collection('articleTypes');
  return ATCollection;
};

const handler = nc<NextApiRequest, NextApiResponse>({
  onError: (err, req, res, next) => {
    res.status(500).end(err.message);
  },
  onNoMatch: (req, res, next) => {
    res.status(404).end(`Method ${req.method} is not allowed for this endpoint`);
  }
})
  .get((req, res) => {
    res.send('Hello world');
  })
  .post(async (req, res) => {
    const collection = await dbConnect();
    try {
      const isNameExists = await collection.countDocuments({ name: req.body.name });

      if (isNameExists) {
        return res.status(422).send({ message: 'Taka nazwa już istnieje' });
      } else {
        const insert = await collection.insertOne({
          name: req.body.name,
          type: req.body.type,
          icon: req.body.icon,
          slug: req.body.name.toLowerCase().replace(' ', '-'),
          isEnabled: req.body.isEnabled,
          description: req.body.description,
          createdAt: new Date(),
          updatedAt: new Date()
        });

        res.status(201).send({ ...insert });
      }
    } catch (err) {
      throw new Error('Something went wrong');
    }
  })
  .put(async (req, res) => {
    const { articleTypeId } = req.query;
    const collection = await dbConnect();

    const isNameExists = await collection.countDocuments({ name: req.body.name, _id: {$ne: new ObjectId(articleTypeId as string)} });
    if (isNameExists) {
      return res.status(422).send({ message: 'Taka nazwa już istnieje' });
    } else {
    const update = await collection.updateOne(
      { _id: new ObjectId(articleTypeId as string) },
      {
        $set: {
          name: req.body.name,
          slug: req.body.name.toLowerCase().replace(' ', '-'),
          type: req.body.type,
          icon: req.body.icon,
          isEnabled: req.body.isEnabled,
          description: req.body.description,
          updatedAt: new Date()
        }
      }
    );
    res.status(200).send(update);
    }
  })
  .patch(async (req, res) => {
    // throw new Error("Throws me around! Error can be caught and handled.");

    return res.status(501).send('No i dupa orza pipa');
  })
  .delete(async(req, res)=>{  const { articleTypeId } = req.query;
  const collection = await dbConnect();

  const isNameExists = await collection.countDocuments({_id:  new ObjectId(articleTypeId as string)});
  if (!isNameExists) {
    return res.status(404).send({ message: 'Nie znaleziono takiego dokumentu' });
  }

  else {
   const result = await  collection.deleteOne({_id:  new ObjectId(articleTypeId as string)});   
   return res.status(200).send(result);
  }
})
export default handler;
