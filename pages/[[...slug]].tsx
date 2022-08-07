/* eslint-disable @next/next/no-img-element */
import Head from "next/head";
import { GetServerSideProps } from "next";
import { Card, Grid, Loading, Text, useSSR } from "@nextui-org/react";
import { CSSProperties, useEffect, useRef, useState } from "react";

import Container from "../components/Layout/Container";
import Main from "../components/Layout/Main";
import Nav from "../components/Layout/Nav";
import scraper from "../lib/scraper";
import { COMIC_URL } from "../config/names";
import { HomeProps } from "../types/nav";
import { useRouter } from "next/router";
import Link from "next/link";

const imageWrapperStyling: CSSProperties = {
  overflow: "auto",
  height: "calc(100vh - 4.5rem - 44px)",
  textAlign: "center",
};

export default function Home({ prev, next, image, date }: HomeProps) {
  const router = useRouter();
  const componentRef = useRef<any>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    componentRef.current?.scrollTo(0, 0);
  }, [router.asPath]);

  useEffect(() => {
    router.events.on("routeChangeStart", () => setLoading(true));
    router.events.on("routeChangeComplete", () => setLoading(false));
  });

  return (
    <Container>
      <>
        <Head>
          <title>The Whiteboard - made mobile</title>
          <meta name="description" content="The Whiteboard Mobile" />
        </Head>
        <Main>
          <>
            {loading && (
              <Loading
                css={{ display: "flex", textAlign: "center", margin: "1rem" }}
              />
            )}

            {!loading && date && (
              <Text css={{ textAlign: "center" }}>{date}</Text>
            )}

            {!loading && image && next && (
              <Link href={next}>
                <div style={imageWrapperStyling} ref={componentRef}>
                  <img
                    style={{ maxWidth: "unset" }}
                    src={`${COMIC_URL}${image}`}
                    alt={`${COMIC_URL}${image}`}
                  />
                </div>
              </Link>
            )}
            {!loading && image && !next && (
              <div style={imageWrapperStyling} ref={componentRef}>
                <img
                  style={{ maxWidth: "unset" }}
                  src={`${COMIC_URL}${image}`}
                  alt={`${COMIC_URL}${image}`}
                />
              </div>
            )}

            {!loading && !image && (
              <div>
                <Card
                  variant="bordered"
                  css={{ margin: "2rem 1rem", width: "unset" }}
                >
                  <Text b css={{ margin: "1rem" }}>
                    Something went wrong, badly wrong
                  </Text>
                </Card>
              </div>
            )}
          </>
        </Main>
        <Nav prev={prev} next={next} date={date} />
      </>
    </Container>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const slug = context.params?.slug;
  const lastPage = "index.html";

  let url = COMIC_URL;
  if (slug) {
    url += slug[0] === "index" ? lastPage : slug[0];
  } else {
    url += lastPage;
  }

  const res = await fetch(url);
  const data = await res.text();
  const { prev, next, image, date } = scraper(data);

  let alternativeNext: string | null = null;

  if (!next && !url.endsWith(lastPage) && slug) {
    alternativeNext = lastPage;
  }

  return { props: { prev, next: alternativeNext ?? next, image, date } };
};
