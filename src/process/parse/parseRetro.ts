import { Version } from "../../types.ts";
import { parseAttachment } from "./parseAttachment.ts";

export const parseRetro = (version: string, input: string): Version => {
  const link = parseAttachment(version, input);

  return {
    version,
    link,
    loader: "forge",
    dependencies: [],
  };
};
