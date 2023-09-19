import { Header } from "./components/Header/Header";
import { Main } from "./components/Main/Main";
import { Footer } from "./components/Footer/Footer";
import styles from "./App.module.scss"

function App() {
  return (
    <>
      <Header />
      <div className={styles.wrapper}>
        <Main />
        <Footer />
      </div>
    </>
  );
}

export default App;
