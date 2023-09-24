import { ReactNode } from 'react';
import { createPortal } from 'react-dom';
import styles from '../Modal/Modal.module.scss';

const modalRoot = document.querySelector('#modal-root');

interface IProps {
  children: ReactNode;
}

export const Modal = ({ children}:IProps) => {
  return createPortal(
    <div className={styles.Overlay}>
      <div className={styles.Modal}>
        {children}
      </div>
    </div>,
    modalRoot!
  );
};

