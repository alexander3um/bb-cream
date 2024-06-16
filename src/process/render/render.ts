import { Version } from "../../types.ts";
import { sortVersions } from "./sortVersions.ts";

export const render = (versions: Version[]): string => {
  const sortedVersions = sortVersions(versions);

  return sortedVersions
    .map((version) => {
      const versionBbCode = `[v]${version.version}[/v]`;

      // const download = version.linkType === "attachment" ? `[attachment=${version.link}]` : ``;

      return `[vers]${versionBbCode}[files][${version.loader}][/${version.loader}][/files][/vers]`;
    })
    .join("\n");
};
