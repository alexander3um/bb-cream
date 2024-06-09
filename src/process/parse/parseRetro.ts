import { Version } from "../../types.ts";
import { parseAttachment } from "./parseAttachment.ts";

export const parseRetro = (version: string, input: string): Version => {
  const match = parseAttachment(version, input);

  return {
    version,
    loader: "forge",
    dependencies: [],
    ...match,
  };
};
