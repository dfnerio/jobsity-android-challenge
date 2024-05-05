export type Person = {
  id: number;
  url: string;
  name: string;
  country?: {
    name: string;
    code: string;
    timezone: string;
  };
  birthday: string | null;
  deathday: string | null;
  gender: string;
  image?: {
    medium: string;
    original: string;
  };
  updated: number;
  _links: {
    self: {
      href: string;
    };
  };
};
