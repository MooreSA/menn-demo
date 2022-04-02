import Head from "next/head";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Deployment Ready MENN Boilerplate</title>

        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Self Directed Example</h1>
        <h2 className={styles.subtitle}>By Seamus Moore</h2>
        <h4 className={styles.description}>With MongoDB/Mongoose</h4>
      </main>
    </div>
  );
}
