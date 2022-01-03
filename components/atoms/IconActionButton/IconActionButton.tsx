import {type} from 'os';
import React from 'react';

interface IconActionButtonPropTypes {
    buttonType: 'edit'|'delete' | 'create';
    dataId?:string;
    onClick?: React.MouseEventHandler;
}

const IconActionButton: React.FC<IconActionButtonPropTypes> = ({buttonType, dataId, onClick}) => {
    
  return (
    <button className='text-2xl text-center ml-5 text-shadow-lg'>
        {buttonType === 'edit' && (<i onClick={onClick} data-id={dataId} className={'icon-tools text-sky-300'}></i>)}
        {buttonType === 'delete' && (<i onClick={onClick} data-id={dataId} className={'icon-trash-o text-red-500'}></i>)}
        {buttonType === 'create' && (<i  onClick={onClick} data-id={dataId} className={'text-3xl icon-document-add text-emerald-400'}></i>)}
    </button>
  );
};

export default IconActionButton;