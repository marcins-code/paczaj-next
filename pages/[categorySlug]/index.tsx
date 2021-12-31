/* eslint-disable react-hooks/rules-of-hooks */
import React, {useContext} from 'react';
import DB from '../../db/db';
import { useRouter } from 'next/router';
import { ObjectId } from 'mongodb';
import Head from 'next/head';
import {AppSettingsContext} from '../../context';
interface articlesProps {
  id: string;
  titlePl: string;
  titleEn: string;
  articleType: string;
}

interface categoryProps {
  name: string;
  icon: string;
  id: string;
  description: string;
}

interface PropsTypes {
  category: categoryProps;
  articles: articlesProps[];
}

export const index = (props: PropsTypes) => {

// const {appTheme} = useContext(AppSettingsContext);
// console.log(appTheme);

  const router = useRouter();
  const { categorySlug } = router.query;
  return (
    <>
      <Head>
        <title>{props.category.name}</title>
      </Head>
      <h3 className="mb-3 text-shadow-md">
        <span className={props.category.icon}></span>
        {props.category.name}
      </h3>
      <p>{props.category.description}</p>
      <p>{props.articles.length}</p>
      {props.articles.map((article: articlesProps) => (
        <>
          <h2 key={article.id}>{article.titlePl}</h2>
        </>
      ))}
    </>
  );
};

export async function getStaticProps(context: { params: { categorySlug: string } }) {
  const db = await DB.setUp();
  const ATCollection = db.collection('articleTypes');
  const catSlug = context.params.categorySlug;
  const categoryData = await ATCollection.aggregate([
    { $match: { slug: catSlug } },
    {
      $project: {
        id: { $toString: '$_id' },
        _id: 0,
        icon: 1,
        name: 1,
        description: '$description.pl'
      }
    }
  ]).toArray();

  const category = categoryData.shift();

  const ACollection = db.collection('articles');
  const articles = await ACollection.aggregate([
    {
      $match: {
        articleTypeId: new ObjectId(category!.id),
        isEnabled: true
      }
    },
    {
      $lookup: {
        from: 'users',
        let: { id: '$creator' },
        pipeline: [
          { $match: { isEnabled: true, $expr: { $eq: ['$_id', '$$id'] } } },
          { $project: { _id: 0, firstName: 1, lastName: 1 } }
        ],
        as: 'author_data'
      }
    },
    {
      $project: {
        author: { $arrayElemAt: ['$author_data', 0] },
        titlePl: 1,
        leadText: { $substr: ['$content.pl', 0, 300] },
        articleType: 1,
        id: { $toString: '$_id' },
        createdAt: { $dateToString: { format: '%d-%m-%Y', date: '$createdAt' } },
        updatedAt: { $dateToString: { format: '%d-%m-%Y', date: '$updatedAt' } },
        _id: 0
      }
    }
  ]).toArray();

  return {
    props: {
      category,
      articles
    }
  };
}

export async function getStaticPaths() {
  const db = await DB.setUp();
  const collection = db.collection('articleTypes');
  const result = await collection.aggregate([{ $project: { slug: 1, _id: 0 } }]).toArray();
  // await DB.closeConnection();

  return {
    paths: result.map((slug) => ({
      params: { categorySlug: slug.slug }
    })),
    fallback: false // See the "fallback" section below
  };
}

export default index;
