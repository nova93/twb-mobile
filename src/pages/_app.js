import { createGlobalStyle } from "styled-components";

import Layout from "../components/Layout";

const GlobalStyles = createGlobalStyle`
  body {
    margin: 0;
  }
`;

const MyApp = ({ Component, pageProps }) => {
  return (
    <>
      <GlobalStyles />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
};

export default MyApp;