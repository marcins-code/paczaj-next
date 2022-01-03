import React from 'react';
import DB from '../../../db/db';
import Badge from '../../../components/atoms/Badge/Badge';
import Head from 'next/head';
import IconActionButton from '../../../components/atoms/IconActionButton/IconActionButton';
import { useRouter } from 'next/router'

const ArticleTypes = ({ data }: any) => {

  const router = useRouter();

  const createNewAType = () =>{
    router.push('/admin/article-types/new')
  }

  const editAType = (e:any) =>{
   
    router.push('/admin/article-types/'+e.target.dataset.id)
  }

  return (
    <>
    <Head>
        <title>Typy artykułów</title>
      </Head>
    <div className="min-w-full">
      <h4>
        <i className="icon-storage"></i> Administracja typami artykułów{' '}
      </h4>
      <br />
      <br />
      <div className="overflow-hidden shadow-lg w-10/12 rounded-2xl m-auto">
        <table className="table w-full table-bordered-rows">
          <thead>
            <tr>
            <th className="text-left text-lg">Nazwa</th>
            <th className="text-left text-lg">Typ</th>
            <th className="text-center text-lg">Ikona</th>
            <th className="text-center text-lg">Aktywne</th>
            <th className="text-center text-lg">Data utworzenia</th>
            <th> <IconActionButton buttonType='create' onClick={createNewAType}/></th>
            </tr>
          </thead>
          <tbody>
            {data.map(
              (row: {
                name: string | undefined;
                id: string | undefined;
                type: string | undefined;
                icon: string | undefined;
                createdAt: string | undefined;
                isEnabled: boolean;
              }) => (
                <tr key={row.id} className="table-row">
                  <td className="table-cell">{row.name}</td>
                  <td>{row.type}</td>
                  <td className="text-center text-[24px]">
                    <i className={row.icon}></i>
                  </td>
                  <td className="text-center">
                    {row.isEnabled === true ? (
                     <i className='icon-check-square-o text-xl text-emerald-400 text-shadow-xl'></i>
                    ) : (
                     <i className='icon-close text-2xl text-shadow-xl text-rose-500'></i>
                    )}
                  </td>
                  <td className="text-center">{row.createdAt}</td>
                  <td>
                  <IconActionButton dataId={row.id} buttonType='edit' onClick={editAType}/>
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
  const ATCollection = db.collection('articleTypes');
  const data = await ATCollection.aggregate([
    {
      $project: {
        _id: 0,
        id: { $toString: '$_id' },
        name: 1,
        slug: 1,
        type: 1,
        icon: 1,
        isEnabled: 1,
        description: '$description.pl',
        createdAt: { $dateToString: { format: '%d-%m-%Y', date: '$createdAt' } },
        updatedAt: { $dateToString: { format: '%d-%m-%Y', date: '$updatedAt' } }
      }
    }
  ]).toArray();

  return { props: { data } };
}

export default ArticleTypes;
