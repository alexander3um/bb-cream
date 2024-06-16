import { Version } from "../../types.ts";
import { parseAttachment } from "./parseAttachment.ts";
import { mapDependencies } from "./mapDependencies.ts";
import { determineLoader } from "./determineLoader.ts";

export const parseSimple = (version: string, input: string): Version => {
  const [attachmentLine, dependenciesLine] =
    input.split(/(?=\[d].*?\[\/d])/gim);

  if (!dependenciesLine) {
    throw new Error(`${version}: не понимаю что именно тут скочать`);
  }

  const link = parseAttachment(version, attachmentLine);
  const dependencies = mapDependencies(version, dependenciesLine);
  const loader = determineLoader(input);

  return {
    version,
    link,
    loader,
    dependencies,
  };
};
