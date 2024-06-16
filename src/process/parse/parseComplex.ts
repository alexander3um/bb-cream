import { Link, Version } from "../../types.ts";
import { determineLoader } from "./determineLoader.ts";
import { mapDependencies } from "./mapDependencies.ts";

export const parseComplex = (version: string, input: string): Version[] => {
  const versions: Version[] = [];

  const matches = input.matchAll(
    /(\[attachment=(?<attachment>.*?)]|\[url=(?<href>.*?)](?<text>.*?)\[\/url])\n*(\[d](?<dependencies>.*?)\[\/d])/gim,
  );

  for (const match of matches) {
    const link: Link | undefined = (() => {
      if (match.groups?.attachment) {
        return {
          type: "attachment",
          code: match.groups?.attachment,
        };
      }

      if (match.groups?.href && match.groups?.text) {
        return {
          type: "url",
          href: match.groups.href,
          text: match.groups.text,
        };
      }
    })();

    if (!link) {
      throw new Error(`${version}: не понимаю что тут можно скочать`);
    }

    versions.push({
      version,
      link,
      loader: determineLoader(match[0]),
      dependencies: mapDependencies(version, match[0]),
    });
  }

  return versions;
};
