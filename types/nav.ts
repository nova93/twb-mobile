import { Dispatch, SetStateAction } from "react";

export interface NavProps {
  prev: string | null;
  next: string | null;
  date: string | null;
}

export interface HomeProps extends NavProps {
  image: string | null;
}
