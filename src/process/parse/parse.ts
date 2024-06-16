import { mapVersions } from "./mapVersions.ts";
import { Version } from "../../types.ts";
import { parseRetro } from "./parseRetro.ts";
import { parseSimple } from "./parseSimple.ts";
import { parseComplex } from "./parseComplex.ts";

export const parse = (input: string): Version[] => {
  const mappedVersions = mapVersions(
    input.trim().startsWith("[download]") ? input.slice(10, -11) : input,
  );

  const versions: Version[] = [];

  for (const version of Object.keys(mappedVersions)) {
    const line = mappedVersions[version];

    if (/\[c]\[l]\d+(\.\d+)+/gim.test(line)) {
      console.log("First");
      versions.push(...parseComplex(version, line));
      continue;
    }

    if (/(\[d]|\[\/d])/gim.test(line)) {
      console.log("Second");
      versions.push(parseSimple(version, line));
      continue;
    }

    console.log("Third");
    versions.push(parseRetro(version, line));
  }

  return versions;
};
