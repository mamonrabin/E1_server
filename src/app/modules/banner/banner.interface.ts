export type TBanner = {
  subtitle: string;
  title: string;
  image: string;
  link?: string;
  status: 'active' | 'inactive';
  type: 'main' | 'offer' | 'promotion';
};
