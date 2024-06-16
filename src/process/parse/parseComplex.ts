import { Version } from "../../types.ts";
import { determineLoader } from "./determineLoader.ts";
import { mapDependencies } from "./mapDependencies.ts";

export const parseComplex = (version: string, input: string): Version[] => {
  const versions: Version[] = [];

  const matches = input.matchAll(
    /(\[attachment=(?<attachment>.*?)]|\[url=(?<link>.*?)].*?\[\/url])\n*(\[d](?<dependencies>.*?)\[\/d])/gim,
  );

  for (const match of matches) {
    const attachment = (() => {
      if (match.groups?.attachment) {
        return {
          link: match.groups?.attachment,
          linkType: "attachment" as const,
        };
      }

      if (match.groups?.link) {
        return {
          link: match.groups?.link,
          linkType: "url" as const,
        };
      }
    })();

    if (!attachment) {
      throw new Error(`${version}: не понимаю что тут можно скочать`);
    }

    versions.push({
      version,
      loader: determineLoader(match[0]),
      dependencies: mapDependencies(version, match[0]),
      ...attachment,
    });
  }

  return versions;
};
