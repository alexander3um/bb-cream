import { mapVersions } from "./mapVersions.ts";

export const parse = (input: string) => {
  const mappedVersions = mapVersions(input);

  console.log(mappedVersions);
};
