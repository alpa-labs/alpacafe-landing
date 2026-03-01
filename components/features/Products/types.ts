export type Product = {
  href: string;
  title: string;
  desc: string;
  src: string;
  alt: string;
};

export type ProductsContent = {
  subtitle: string;
  title: string;
  products: Product[];
};
