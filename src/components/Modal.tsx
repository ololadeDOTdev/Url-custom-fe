import React from 'react';
import { IoIosCloseCircleOutline } from "react-icons/io";

interface ModalProps extends React.PropsWithChildren {
    isOpen: boolean;
    onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {

    if (!isOpen) {
        return <></>;
    }

    return (
        <div className="fixed top-0 left-0 bg-slate-600/35 w-full p-5
                        h-screen z-50 flex justify-center items-center">
            <div className="bg-white rounded-md shadow-lg p-5 w-full max-w-lg h-fit relative">
                <button className="top-3 right-5 absolute"  onClick={onClose}>
                    <IoIosCloseCircleOutline className='w-10 h-10'/>
                </button>
                {children}
            </div>
        </div>
    );
};

export default Modal;