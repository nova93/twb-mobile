import Head from "next/head";

// import Button from "../components/Button";

import { APP_NAME } from "../config/main";

const Home = () => (
  <>
    <Head>
      <title>{APP_NAME}</title>
    </Head>
    <p>Home page</p>
  </>
);

export default Home;