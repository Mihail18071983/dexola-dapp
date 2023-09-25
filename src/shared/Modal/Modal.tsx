import { ReactNode, useCallback, useEffect, TouchEvent } from "react";
import { createPortal } from "react-dom";
import styles from "../Modal/Modal.module.scss";

const modalRoot = document.querySelector("#modal-root");

interface IProps {
  children: ReactNode;
  close: () => void;
}

export const Modal = ({ children, close }: IProps) => {
  const closeModal = useCallback(
    (ev: TouchEvent<HTMLDivElement>) => {
      if (ev.target === ev.currentTarget) {
        close();
      }
    },
    [close]
  );

  useEffect(() => {
    window.addEventListener("click", closeModal as unknown as EventListener);
    return () =>
      window.removeEventListener(
        "click",
        closeModal as unknown as EventListener
      );
  }, [closeModal]);

  return createPortal(
    <div className={styles.Overlay} onTouchStart={closeModal}>
      <div className={styles.Modal}>{children}</div>
    </div>,
    modalRoot!
  );
};
