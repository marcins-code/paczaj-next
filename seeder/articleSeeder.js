import { MongoClient, ObjectId } from 'mongodb';
import faker from "faker";
// import { connectionOptions} from '../db/db';
const uri = 'mongodb://root:rootpassword@localhost:27017/paczajBlogTest?authSource=admin'
const client = new MongoClient(uri);

const articleSeeder = async () => {
  const conn = await client.connect();
  const database = conn.db();
  const userCollection = database.collection('users');
  const articleTypeCollection = database.collection('articleTypes');
  const articleCollection = database.collection('articles');
  const userMarcin = await userCollection.findOne({ lastName: 'Paczkowski' });
  const userId = userMarcin._id.toString();
  let article;

  const categories = await articleTypeCollection.find({ type: 'category' }).toArray();
  const dataScience = await articleTypeCollection.find({ type: 'dataScience' }).toArray();
  const series = await articleTypeCollection.find({ type: 'serie' }).toArray();

  

  const initCount = await articleCollection.countDocuments();
  if (initCount !== 55) {
    console.log(series);
    await articleCollection.deleteMany({});

    // categories
    for (let i = 0; i < categories.length; i++) {
      for (let j = 1; j <= 5; j++) {
        const isEnabled = j <= 4 ? true : false;
        article = {
          titlePl: faker.lorem.words(faker.datatype.number({ min: 5, max: 10 })),
          titleEn: faker.lorem.words(faker.datatype.number({ min: 5, max: 10 })),
          articleType: categories[i].name,
          articleTypeId: new ObjectId(categories[i]._id.toString()),
          isEnabled,
          creator:  new ObjectId(userId),
          content: {
            pl: faker.lorem.paragraphs(faker.datatype.number({ min: 2, max: 40 })),
            en: faker.lorem.paragraphs(faker.datatype.number({ min: 2, max: 40 }))
          },
          createdAt: faker.date.between('2020-11-01', '2021-09-15'),
          updatedAt: faker.date.between('2020-11-01', '2021-09-15')
        };
        await articleCollection.insertOne(article);
      }
    }

    // dataScience
    for (let i = 0; i < dataScience.length; i++) {
      for (let j = 1; j <= 5; j++) {
        const isEnabled = j <= 4 ? true : false;
        article = {
          titlePl: faker.lorem.words(faker.datatype.number({ min: 5, max: 10 })),
          titleEn: faker.lorem.words(faker.datatype.number({ min: 5, max: 10 })),
          articleType: dataScience[i].name,
          articleTypeId: new ObjectId(dataScience[i]._id.toString()),
          isEnabled,
          creator: new ObjectId(userId),
          content: {
            pl: faker.lorem.paragraphs(faker.datatype.number({ min: 2, max: 40 })),
            en: faker.lorem.paragraphs(faker.datatype.number({ min: 2, max: 40 }))
          },
          createdAt: faker.date.between('2020-11-01', '2021-09-15'),
          updatedAt: faker.date.between('2020-11-01', '2021-09-15')
        };
        await articleCollection.insertOne(article);
      }
    }

    // series
    for (let i = 0; i < series.length; i++) {
      for (let j = 1; j <= 5; j++) {
        const isEnabled = j <= 4 ? true : false;
        article = {
          titlePl: faker.lorem.words(faker.datatype.number({ min: 5, max: 10 })),
          titleEn: faker.lorem.words(faker.datatype.number({ min: 5, max: 10 })),
          articleType: series[i].name,
          articleTypeId: new ObjectId(series[i]._id.toString()),
          seriePart: j,
          isEnabled,
          creator: new ObjectId(userId),
          content: {
            pl: faker.lorem.paragraphs(faker.datatype.number({ min: 2, max: 40 })),
            en: faker.lorem.paragraphs(faker.datatype.number({ min: 2, max: 40 }))
          },
          createdAt: faker.date.between('2020-11-01', '2021-09-15'),
          updatedAt: faker.date.between('2020-11-01', '2021-09-15')
        };
        await articleCollection.insertOne(article);
      }
    }
  }
};

articleSeeder();
