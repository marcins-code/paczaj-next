import React, {useRef, useState} from 'react';
import Backdrop from '../../atoms/Backdrop/Backdrop';
import { CSSTransition } from 'react-transition-group';

interface ModalProps {
  isModalShown: boolean;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isModalShown, children }) => {

    const [isModaVisible, setIsModalVisible] = useState(isModalShown)
  
  const nodeRef = useRef<HTMLDivElement>(null);
  return (
    <>
      <Backdrop isBackdropShown={isModalShown} />
      <CSSTransition
        in={isModalShown}
        mountOnEnter
        unmountOnExit
        timeout={1000}
        nodeRef={nodeRef}
        classNames={{ enter: 'scale-in-ver-center', exit: 'scale-out-vertical' }}>
        <div ref={nodeRef} className="fixed w-[25%] h-[25%] left-[37.5%] top-[12vh] bg-stone-400 text-white z-[100] shadow-2xl rounded-xl p-7">
        {children}
        </div>
      </CSSTransition>
    </>
  );
};

export default Modal;
