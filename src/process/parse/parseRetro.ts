import { Version } from "../../types.ts";

export const parseRetro = (version: string, input: string): Version => {
  const matches = input.matchAll(
    /(\[attachment=(?<attachment>\d+:.*?)]|\[url=(?<link>.*?)](?<name>.*?)\[\/url])/gim,
  );

  const normalizedMatches = [...matches];
  const match = normalizedMatches[0];

  if (!match || !match.groups) {
    throw new Error(`Не получилось распарсить retro скачку ${version}`);
  }

  if (match.groups.attachment) {
    return {
      version,
      loader: "forge",
      dependencies: [],
      linkType: "attachment",
      link: match.groups.attachment,
    };
  }

  return {
    version,
    loader: "forge",
    dependencies: [],
    linkType: "url",
    link: match.groups.link,
  };
};
