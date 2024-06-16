import { Version } from "../../types.ts";
import { sortVersions } from "./sortVersions.ts";

export const render = (versions: Version[]): string => {
  const sortedVersions = sortVersions(versions);

  const groupedVersions: Record<string, string> = {};

  for (const version of sortedVersions) {
    const attachmentLine =
      version.linkType === "attachment"
        ? `[attachment=${version.link}]`
        : `[url=${version.link}]${version.link}[/url]`;

    const dependencies = version.dependencies
      .map((dependency) => `[url=${dependency.link}]${dependency.name}[/url]`)
      .join(" и ");

    const dependenciesLine =
      version.dependencies.length > 0
        ? `[dep]требуется установить ${dependencies}[/dep]`
        : "";

    groupedVersions[version.version] =
      (groupedVersions[version.version] ?? "") +
      `[${version.loader}]${attachmentLine}${dependenciesLine}[/${version.loader}]`;
  }

  const codes: string[] = [];

  for (const version of Object.keys(groupedVersions)) {
    codes.push(
      `[vers][v]${version}[/v][files]${groupedVersions[version]}[/files][/vers]`,
    );
  }

  return codes.join("\n\n");
};
