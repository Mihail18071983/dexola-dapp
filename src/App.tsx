import { useState, useEffect } from "react";

import { Header } from "./components/Header/Header";
import { Main } from "./components/Main/Main";
import { Footer } from "./components/Footer/Footer";
import { ToastContainer, toast } from "react-toastify";
import { useWindowSize } from "./hooks/useWindowsSize";
import styles from "./App.module.scss";

function App() {
  const [position, setPosition] = useState(toast.POSITION.BOTTOM_CENTER);
  const [width] = useWindowSize();

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
      <Header />
      <div className={styles.wrapper}>
        <Main />
        <Footer />
      </div>
      <ToastContainer
        position={position}
        autoClose={5000}
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
