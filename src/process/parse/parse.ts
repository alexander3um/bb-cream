import { mapVersions } from "./mapVersions.ts";

// const basicForgeTypeFinder = //gim

export const parse = (input: string) => {
  const mappedVersions = mapVersions(input);

  for (const version of Object.keys(mappedVersions)) {
    const line = mappedVersions[version];

    console.log(line);
  }
};
