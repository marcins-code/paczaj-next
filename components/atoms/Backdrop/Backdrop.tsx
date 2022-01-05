import React, {useRef} from 'react'
import { CSSTransition } from 'react-transition-group';

interface BackdropProps {
    isBackdropShown?: boolean;
    clickHandler?:React.MouseEventHandler;
}

 const Backdrop: React.FC<BackdropProps> = ({isBackdropShown, clickHandler}) => {
    const nodeRef = useRef<HTMLDivElement>(null);

    return (
       <CSSTransition nodeRef={nodeRef} in={isBackdropShown} timeout={1200} classNames="my-node" unmountOnExit onClick={clickHandler}>
        <div ref={nodeRef} className="fixed top-0 left-0 w-full  h-full bg-stone-700 opacity-75 z-20"/>
        </CSSTransition>
            
    )
}

export default Backdrop;