import React, { useState } from 'react';
import DB from '../../../db/db';
import Badge from '../../../components/atoms/Badge/Badge';
import Head from 'next/head';
import IconActionButton from '../../../components/atoms/IconActionButton/IconActionButton';
import { useRouter } from 'next/router';
import Backdrop from '../../../components/atoms/Backdrop/Backdrop';
import Modal from '../../../components/molecules/Modal/Modal';
import axios from 'axios';
import { toast } from 'react-toastify';

const ArticleTypes = ({ data }: any) => {

  const [tableRows, setTableRows] = useState(data);
  const router = useRouter();

  // new document
  const redirectToNewAType = () => {
    router.push('/admin/article-types/new');
  };

  // edit document
  const redirectToEditAType = (e: any) => {
    router.push('/admin/article-types/' + e.target.dataset.id);
  };

  //delete document
  const [showModal, setShowModal] = useState(false);
  const [idToDelete, setIdToDelete] = useState('');

  const toggleModal = (e: { target: any }) => {
    setShowModal(!showModal);
    setIdToDelete(e.target.dataset.id);
  };

  const deleteItemHandler = () => {
    axios({
      method: 'delete',
      url: '/api/article-types/' + idToDelete
    })
      .then((response) => {
        if (response.status === 200) {
          toast.success('Usunięto wpis!');
          setTableRows(data.filter((el: {id: string;})=>(el.id!==idToDelete)));
         
        }
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
      setIdToDelete('');
      setShowModal(false);
  };

  return (
    <>
      <Head>
        <title>Typy artykułów</title>
      </Head>
      <div className="min-w-full mb-10">
        <Modal isModalShown={showModal}>
          <p>{idToDelete}</p>
          This is modal
          <button onClick={toggleModal}>close</button>
          <button onClick={deleteItemHandler}>remove</button>
        </Modal>
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
                <th>
                  {' '}
                  <IconActionButton buttonType="create" onClick={redirectToNewAType} />
                </th>
              </tr>
            </thead>
            <tbody>
              {tableRows.map(
                (row: {
                  name: string | undefined;
                  id: string | undefined;
                  type: string | undefined;
                  icon: string | undefined;
                  createdAt: string | undefined;
                  isEnabled: boolean;
                }) => (
                  <tr key={row.id} className="table-row">
                    <td className="item-name">{row.name}</td>
                    <td>{row.type}</td>
                    <td className="text-center text-[24px]">
                      <i className={row.icon}></i>
                    </td>
                    <td className="text-center">
                      {row.isEnabled === true ? (
                        <i className="icon-check-square-o text-xl text-emerald-400 text-shadow-xl"></i>
                      ) : (
                        <i className="icon-close text-2xl text-shadow-xl text-rose-500"></i>
                      )}
                    </td>
                    <td className="text-center">{row.createdAt}</td>
                    <td>
                      <IconActionButton
                        dataId={row.id}
                        buttonType="edit"
                        onClick={redirectToEditAType}
                      />
                      <IconActionButton dataId={row.id} buttonType="delete" onClick={toggleModal} />
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
