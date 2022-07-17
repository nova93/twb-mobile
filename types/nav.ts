export interface NavProps {
  prev: string | null;
  next: string | null;
}

export interface HomeProps extends NavProps {
  image: string | null;
}
