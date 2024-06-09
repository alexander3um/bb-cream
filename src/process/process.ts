import { parse } from "./parse/parse.ts";

export const process = (input: string): string => {
  parse(input);

  return input;
};
