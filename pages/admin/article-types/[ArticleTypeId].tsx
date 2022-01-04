import { Formik, Form, Field, ErrorMessage } from 'formik';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import * as Yup from 'yup';
import CodeMirror from '@uiw/react-codemirror';
import { html } from '@codemirror/lang-html';
import { oneDark } from '@codemirror/theme-one-dark';
import DB from '../../../db/db';
import { ObjectId } from 'mongodb';
import {menuItems, menuItemsDecriptions} from '../../../utils/menu';

interface MyFormValues {
  name: string;
  icon: string;
  type: string | undefined;
  isEnabled: boolean;
}

const ArticleTypeId = (props: any) => {
  console.log(props);

  const router = useRouter();
  const [description, setDescription] = useState(props.description.pl);
  const { ArticleTypeId } = router.query;
  const initialValues: MyFormValues = { 
    
    name: props.name, 
    icon: props.icon, 
    type: props.type || undefined, 
    isEnabled: props.isEnabled || false };
  // console.log(description);

  const SignupSchema = Yup.object().shape({
    name: Yup.string()
      .required('Pole nazwa jest wymagane')
      .min(2, 'Za krótkie')
      .max(50, 'Za długie'),
    icon: Yup.string().required('Pole ikona wymagane').min(2, 'Za krótkie').max(50, 'Za długie'),
    type: Yup.string().required('Wybierz typ')
  });

  return (
    <>
      <Head>
        <title>{ArticleTypeId === 'new' ? 'Tworzenie nowego' : 'Edycja'} typu artykułu</title>
      </Head>
      <Formik
        initialValues={initialValues}
        validationSchema={SignupSchema}
        onSubmit={(values, actions) => {
          const body = {
            name: values.name,
            type: values.type,
            icon: values.icon,
            isEnabled: values.isEnabled,
            description: {
              pl: description,
              en: ''
            }
          };

          console.log(body);
        }}>
        {({ errors, touched, values }) => (
          <Form>
            <div className="flex">
              <div className="form-control">
                <label htmlFor="firstName">Nazwa</label>
                <Field
                  id="name"
                  name="name"
                  placeholder="Nazwa"
                  className="dark:text-zinc-200 dark:bg-neutral-700 h-10 px-1 focus:outline-none"
                />
                <ErrorMessage name="name" />
                {/* {touched.name && errors.name && <div>{errors.name}</div>} */}
              </div>
              <div className="form-control">
                <label htmlFor="icon">Ikona</label>
                <Field
                  id="icon"
                  name="icon"
                  placeholder="Ikona"
                  className="dark:text-zinc-200 dark:bg-neutral-700 h-10 px-1 focus:outline-none"
                />
                <ErrorMessage name="icon" />
              </div>
              <div className="form-control">
                <label htmlFor="type">Typ</label>
                <Field
                  id="type"
                  name="type"
                  placeholder="Typ"
                  as="select"
                  className="dark:text-zinc-200 dark:bg-neutral-700 h-10 px-1 focus:outline-none">
                  <option value="">--wybierz--</option>
                  {menuItems.map((item)=>(
                    <option value={item} key={item}>{menuItemsDecriptions[item as 'dataScience' | 'developmnet' | 'serie']}</option>
                  ))}
                  <option value="red">Red</option>
                  <option value="green">Green</option>
                  <option value="blue">Blue</option>
                </Field>
                <ErrorMessage name="type" />
              </div>
              <div className="form-control">
                <label>
                  Właczony
                  <Field type="checkbox" name="isEnabled" checked={values.isEnabled} />
                  {/* {`${values.toggle}`} */}
                </label>
              </div>
            </div>
            <CodeMirror
              value={props.description.pl}
              // value="console.log('hello world!');"
              height="auto"
              theme={oneDark}
              extensions={[html({})]}
              onChange={(value) => {
                setDescription(value);
              }}
            />
            <button type="submit">Submit</button>
          </Form>
        )}
      </Formik>
    </>
  );
};

export async function getServerSideProps(context: any) {
  const { ArticleTypeId } = context.query;
  const db = await DB.setUp();
  const ATCollection = db.collection('articleTypes');
  const result = await ATCollection.findOne({ _id: new ObjectId(ArticleTypeId) });
  console.log(result);

  return {
    props: {
      name: result ? result.name : '',
      icon: result ? result.icon : '',
      type: result ? result.type : '',
      isEnabled: result ? result.isEnabled : false,
      description: result ? result.description : false
    }
  };
}
export default ArticleTypeId;
