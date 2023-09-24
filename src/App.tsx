import { useState, useEffect } from "react";

import { Header } from "./components/Header/Header";
import { Main } from "./components/Main/Main";
import { Footer } from "./components/Footer/Footer";
import { ToastContainer, toast } from "react-toastify";
import { useWindowSize } from "./hooks/useWindowsSize";
import { Modal } from "./shared/Modal/Modal";
import { ModalContent } from "./shared/Modal/ModalContent";
import styles from "./App.module.scss";

function App() {
  const [position, setPosition] = useState(toast.POSITION.BOTTOM_CENTER);
  const [width] = useWindowSize();
  const [showModal, setShowModal] = useState<boolean>(false);
  const [modalContent, setModalContent] = useState<string>("");

  const openModal = (content: string) => {
    setShowModal(true);
    setModalContent(content);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  useEffect(() => {
    console.log(position);
    if (width > 743) {
      setPosition(toast.POSITION.BOTTOM_RIGHT);
    } else {
      setPosition(toast.POSITION.BOTTOM_CENTER);
    }
  }, [width, position]);

  return (
    <>
      <Header onOpenModal={openModal} onCloseModal={closeModal} />
      <div className={styles.wrapper}>
        <Main />
        <Footer />
      </div>
      {showModal && width < 1440 && (
        <Modal>
          {modalContent === "content1" && (
            <div className={styles.contentWrapper}>
              <h3 className={styles.title}>{ModalContent[0].name}</h3>
              <p className={styles.modalcontent}>{ModalContent[0].content}</p>
            </div>
          )}
          {modalContent === "content2" && (
            <div className={styles.contentWrapper}>
              <h3 className={styles.title}>{ModalContent[1].name}</h3>
              <p className={styles.modalcontent}>{ModalContent[1].content}</p>
            </div>
          )}
          {modalContent === "content3" && (
            <div className={styles.contentWrapper}>
              <h3 className={styles.title}>{ModalContent[2].name}</h3>
              <p className={styles.modalcontent}>{ModalContent[2].content}</p>
            </div>
          )}
        </Modal>
      )}
      <ToastContainer
        position={position}
        autoClose={2000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        className={styles.toastContainer}
        limit={1}
      />
    </>
  );
}

export default App;
