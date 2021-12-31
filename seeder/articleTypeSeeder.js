import { MongoClient } from 'mongodb';
import faker from 'faker';
const uri = 'mongodb://root:rootpassword@localhost:27017/paczajBlogTest?authSource=admin'
const client = new MongoClient(uri);

const articleTypeSeeder = async () => {
  const conn = await client.connect();
  const database = conn.db();
  const userCollection = database.collection('users');
  const articleTypeCollection = database.collection('articleTypes');
  const initcount = await articleTypeCollection.countDocuments();

  const userMarcin = await userCollection.findOne({ lastName: 'Paczkowski' });
  const userId = userMarcin._id.toString();

  const categories = ['React', 'Vue', 'CSS'];
  const series = ['SQL', 'Python', 'Docker', 'MongoDB'];
  const dataScience = ['Statystyka', 'Deep Learning', 'Machine Learning', 'Pandas'];

  let articleType;
  let isEnabled
  if (initcount !== 11) {
    await articleTypeCollection.deleteMany({});
    for (let i = 1; i <= 3; i++) {
      isEnabled = i<=2 ? true : false;
      articleType = {
        name: categories[0],
        slug:  categories[0].toLowerCase().replace(' ', '-'),
        type: 'category',
        icon: faker.lorem.word(),
        isEnabled,
        description: { pl: 'Opis kategorii', en: 'Category description' },
        creator: userId,
        createdAt: faker.date.between('2020-11-01', '2021-09-15'),
        updatedAt: faker.date.between('2020-11-01', '2021-09-15')
      };
      await articleTypeCollection.insertOne(articleType);
      categories.shift();
    }
    for (let i = 1; i <= 4; i++) {
      isEnabled = i<=3 ? true : false;
      articleType = {
        name: series[0],
        slug:  series[0].toLowerCase().replace(' ', '-'),
        type: 'serie',
        icon: faker.lorem.word(),
        isEnabled,
        description: { pl: 'Opis serie', en: 'serie description' },
        creator: userId,
        createdAt: faker.date.between('2020-11-01', '2021-09-15'),
        updatedAt: faker.date.between('2020-11-01', '2021-09-15')
      };
      await articleTypeCollection.insertOne(articleType);
      series.shift();
    }

    for (let i = 1; i <= 4; i++) {
      isEnabled = i<=2 ? true : false;
      articleType = {
        name: dataScience[0],
        slug:  dataScience[0].toLowerCase().replace(' ', '-'),
        type: 'dataScience',
        icon: faker.lorem.word(),
        isEnabled,
        description: { pl: 'Opis dataScience', en: 'dataScience description' },
        creator: userId,
        createdAt: faker.date.between('2020-11-01', '2021-09-15'),
        updatedAt: faker.date.between('2020-11-01', '2021-09-15')
      };
      await articleTypeCollection.insertOne(articleType);
      dataScience.shift();
    }
  }
  console.log(await articleTypeCollection.countDocuments());
};

articleTypeSeeder();
