import React from 'react';
import './Modal.css';
import ReactDOM from 'react-dom';

const Backdrop = (props) => {
    return <div className='backdrop' onClick={props.onHideForm} ></div>
};

const ModalWindow = (props) => {
    return (
        <div className="modal">
            <div className='content'>{props.children}</div>
        </div>
    );
};

const portalElement = document.getElementById('darkside');

const Modal = (props) => {
    return (
        <React.Fragment>
            {ReactDOM.createPortal(<Backdrop onHideForm= {props.onHideForm} />, portalElement)}
            {ReactDOM.createPortal(<ModalWindow>{props.children}</ModalWindow>, portalElement)}
        </React.Fragment>
    );
};

export default Modal;