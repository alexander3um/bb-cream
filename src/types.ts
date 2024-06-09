export type Loader = "forge" | "neoforge" | "fabric";

export type LinkType = "attachment" | "url";

export type Version = {
  loader: Loader;
  linkType: LinkType;
  link: string;
  dependencies: Dependency[];
};

export type Dependency = {
  link: string;
  name: string;
};
