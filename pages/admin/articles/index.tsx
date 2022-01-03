import {lorem} from 'faker';
import Head from 'next/head';
import {useRouter} from 'next/router';
import React from 'react';
import Badge from '../../../components/atoms/Badge/Badge';
import IconActionButton from '../../../components/atoms/IconActionButton/IconActionButton';
import DB from '../../../db/db';

const Articles = ({ data }: any) => {
  const router = useRouter();

  const createNewArticle = () =>{
    router.push('/admin/articles/new')
  }

  const editArticle = (e:any) =>{
   
    router.push('/admin/articles/'+e.target.dataset.id)
  }

  return (
    <>
      <Head>
        <title>Artykuły</title>
      </Head>
      <div className="min-w-full">
        <h4>
          <i className="icon-file_copy"></i> Administracja artykułami
        </h4>
        <br />
        <br />
        <div className="overflow-hidden shadow-lg w-full rounded-2xl m-auto mb-10">
          <table className="table w-full table-bordered-rows">
            <thead>
              <tr>
              <th className="text-left text-lg">Tytuł</th>
              <th className="text-left text-lg">Kategoria</th>
              <th className="text-center text-lg">Aktywne</th>
              <th className="text-center text-lg">Autor</th>
              <th className="text-center text-lg hidden sm:block">Data utworzenia</th>
              <th> <IconActionButton buttonType='create' onClick={createNewArticle}/></th>
              </tr>
            </thead>
            <tbody>
              {data.map(
                (row: {
                  title: string | undefined;
                  id: string | undefined;
                  articleType: {
                    type: string | undefined;
                    icon: string | undefined;
                    name: string | undefined;
                  };
                  author: {
                    firstName: string | undefined;
                    lastName: string | undefined;
                  };
                  createdAt: string | undefined;
                  isEnabled: boolean;
                }) => (
                  <tr key={row.id} className="table-row">
                    <td className="table-cell md:w-1/3">{row.title}</td>
                    <td className="table-cell">
                      <i className={row.articleType.icon}></i>
                      {row.articleType.name}
                    </td>
                    <td className="text-center">
                    {row.isEnabled === true ? (
                     <i className='icon-check-square-o text-xl text-emerald-400 text-shadow-xl'></i>
                    ) : (
                     <i className='icon-close text-2xl text-shadow-xl text-rose-500'></i>
                    )}
                    </td>
                    <td className="text-center">
                      {row.author.firstName + ' ' + row.author.lastName}
                    </td>
                    <td className="text-center hidden md:table-cell">{row.createdAt}</td>
                    <td>
                    <IconActionButton dataId={row.id} buttonType='edit' onClick={editArticle}/>
                    <IconActionButton dataId={row.id} buttonType='delete'/>
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export async function getServerSideProps() {
  const db = await DB.setUp();
  const ACollection = db.collection('articles');
  const data = await ACollection.aggregate([
    {
      $lookup: {
        from: 'users',
        let: { id: '$creator' },
        pipeline: [
          { $match: { $expr: { $eq: ['$_id', '$$id'] } } },
          { $project: { _id: 0, firstName: 1, lastName: 1 } }
        ],
        as: 'author_data'
      }
    },
    {
      $lookup: {
        from: 'articleTypes',
        let: { id: '$articleTypeId' },
        pipeline: [
          { $match: { $expr: { $eq: ['$_id', '$$id'] } } },
          { $project: { _id: 0, name: 1, type: 1, icon: 1 } }
        ],
        as: 'articleType'
      }
    },
    {
      $project: {
        _id: 0,
        id: { $toString: '$_id' },
        title: '$titlePl',
        author: { $arrayElemAt: ['$author_data', 0] },
        isEnabled: 1,
        articleType: { $arrayElemAt: ['$articleType', 0] },
        createdAt: { $dateToString: { format: '%d-%m-%Y', date: '$createdAt' } },
        updatedAt: { $dateToString: { format: '%d-%m-%Y', date: '$updatedAt' } }
      }
    }
  ]).toArray();

  return { props: { data } };
}

export default Articles;
