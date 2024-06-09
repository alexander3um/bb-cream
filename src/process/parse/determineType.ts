import { VersionType } from "../../types.ts";

export const determineType = (input: string): VersionType => {
  if (/\[c]\[l]\d+(\.\d+)+/gim.test(input)) {
    return "complex";
  }

  if (/(\[d]|\[\/d])/gim.test(input)) {
    return "simple";
  }

  return "retro";
};
