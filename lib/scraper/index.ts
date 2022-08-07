import { HomeProps } from "../../types/nav";

export default function scraper(data: string): HomeProps {
  const imageRegex = /<br><img SRC=".*"><br>/gim;
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

  return { prev, next, image, date };
}
