/* eslint-disable @next/next/no-img-element */
import Head from "next/head";
import { GetServerSideProps } from "next";
import { Card, Grid, Text } from "@nextui-org/react";
import { useEffect, useRef } from "react";

import Container from "../components/Layout/Container";
import Main from "../components/Layout/Main";
import Nav from "../components/Layout/Nav";
import scraper from "../lib/scraper";
import { COMIC_URL } from "../config/names";
import { HomeProps } from "../types/nav";
import { useRouter } from "next/router";
import Link from "next/link";

export default function Home({ prev, next, image, date }: HomeProps) {
  const router = useRouter();
  const componentRef = useRef<any>();

  console.log({ prev, next, image });

  useEffect(() => {
    componentRef.current?.scrollTo(0, 0);
  }, [router.asPath]);

  return (
    <Container>
      <>
        <Head>
          <title>The Whiteboard - made mobile</title>
          <meta name="description" content="The Whiteboard Mobile" />
        </Head>
        <Main>
          <>
            {date && <Text css={{ textAlign: "center" }}>{date}</Text>}

            {image && next && (
              <Link href={next}>
                <div
                  style={{
                    overflow: "auto",
                    height: "calc(100vh - 4.5rem - 40px)",
                    textAlign: "center",
                  }}
                  ref={componentRef}
                >
                  <img
                    style={{ maxWidth: "unset" }}
                    src={`${COMIC_URL}${image}`}
                    alt={`${COMIC_URL}${image}`}
                  />
                </div>
              </Link>
            )}
            {image && !next && (
              <div
                style={{
                  overflow: "auto",
                  height: "fit-content",
                }}
                ref={componentRef}
              >
                <img
                  style={{ maxWidth: "unset" }}
                  src={`${COMIC_URL}${image}`}
                  alt={`${COMIC_URL}${image}`}
                />
              </div>
            )}

            {!image && (
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
