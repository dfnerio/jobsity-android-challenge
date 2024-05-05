export type Appearance = {
  self: boolean;
  voice: boolean;
  _links: {
    show: {
      href: string;
      name: string;
    };
    character: {
      href: string;
      name: string;
    };
  };
};
