import { parse } from "./parse/parse.ts";

export const process = (input: string): string => {
  const versions = parse(input);

  console.log(versions);

  return input;
};
