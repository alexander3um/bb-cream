import { mapVersions } from "./mapVersions.ts";
import { Version } from "../../types.ts";
import { parseRetro } from "./parseRetro.ts";
import { parseSimple } from "./parseSimple.ts";
import { parseComplex } from "./parseComplex.ts";

export const parse = (input: string): Version[] => {
  const mappedVersions = mapVersions(input);

  const versions: Version[] = [];

  for (const version of Object.keys(mappedVersions)) {
    const line = mappedVersions[version];

    if (/\[c]\[l]\d+(\.\d+)+/gim.test(line)) {
      versions.push(...parseComplex(version, line));
      continue;
    }

    if (/(\[d]|\[\/d])/gim.test(line)) {
      versions.push(parseSimple(version, line));
      continue;
    }

    versions.push(parseRetro(version, line));
  }

  return versions;
};
