export type VersionType = "retro" | "simple" | "complex";

export type Loader = "forge" | "neoforge" | "fabric";

export type Link =
  | {
      type: "url";
      href: string;
      text: string;
    }
  | {
      type: "attachment";
      code: string;
    };

export type Version = {
  version: string;
  loader: Loader;
  link: Link;
  dependencies: Dependency[];
};

export type Dependency = {
  link: string;
  name: string;
};
