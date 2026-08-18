import { HomeProps } from "../../types/nav";
import { COMIC_PAGE } from "../../config/names";

// The nav targets below are fed straight into next/link and router.push, and
// the image path is concatenated onto COMIC_URL. They come from a third-party
// page, so nothing leaves the scraper unless it is a plain relative path with
// no scheme, no authority and no traversal.
const safePage = (value: string | null): string | null =>
  value && COMIC_PAGE.test(value) ? value : null;

const safeImagePath = (value: string | null): string | null =>
  value && /^[A-Za-z0-9._\-/]+$/.test(value) && !value.includes("..") && !value.startsWith("/")
    ? value
    : null;

export default function scraper(data: string): HomeProps {
  const imageRegex = /<br><img src=".{4,35}"><br>/gim;
  const justImageRegex = /".*"/;
  const justHTMLRegex = /".*.html/;
  const prevRegex = /<a href=".{4,30}\.html"><img src="previous\.png"><\/a>/gim;
  const nextRegex = /<a href=".{4,30}\.html"><img src="next\.png"><\/a>/gim;
  const dateRegex = /\d{4}-\d{2}-\d{2}/;

  const image =
    data.match(imageRegex)?.[0].match(justImageRegex)?.[0].slice(1, -1) ?? null;

  const prev =
    data.match(prevRegex)?.[0].match(justHTMLRegex)?.[0].slice(1) ?? null;

  const next =
    data.match(nextRegex)?.[0].match(justHTMLRegex)?.[0].slice(1) ?? null;

  const date = data.match(dateRegex)?.[0] ?? null;

  return {
    prev: safePage(prev),
    next: safePage(next),
    image: safeImagePath(image),
    date,
  };
}
