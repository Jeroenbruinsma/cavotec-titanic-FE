import { Container } from "@material-ui/core";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Titanic app for Cavotec</title>
        <meta name="description" content="Passenger list of the Titanic" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to{" "}
          <a href="https://nl.wikipedia.org/wiki/Titanic_(schip,_1912)">
            Titanic
          </a>
        </h1>

        <p className={styles.description}>Passenger managment system</p>
        <Container maxWidth="sm">
          <img src="/images/titanic.jpg" alt="boat" />
        </Container>
        <div className={styles.grid}>
          <a
            href="https://github.com/Jeroenbruinsma/cavotec-titanic-FE"
            className={styles.card}
          >
            <h2>Frontend Repo &rarr;</h2>
            <p className={styles.nextJs}>
              Discover how the frontend app is made using{" "}
              <a href="https://nextjs.org">NextJs</a>
            </p>
          </a>

          <a
            href="https://github.com/Jeroenbruinsma/cavotec-titanic"
            className={styles.card}
          >
            <h2>Backend repo &rarr;</h2>
            <p className={styles.nextJs}>
              Discover how the backend code is written using{" "}
              <a href="https://nodejs.org/en/">NodeJS</a>,{" "}
              <a href="https://expressjs.com/">Express</a> &{" "}
              <a href="https://sequelize.org/">Sequelize</a>
            </p>
          </a>
        </div>
      </main>
    </div>
  );
}
