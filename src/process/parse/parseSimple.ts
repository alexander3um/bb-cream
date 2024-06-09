import { Version } from "../../types.ts";
import { parseAttachment } from "./parseAttachment.ts";
import { mapDependencies } from "./mapDependencies.ts";
import { determineLoader } from "./determineLoader.ts";

export const parseSimple = (version: string, input: string): Version => {
  const [attachmentLine, dependenciesLine] =
    input.split(/(?=\[d].*?\[\/d])/gim);

  if (!dependenciesLine) {
    console.log("Wrong input", input);
  }

  const attachment = parseAttachment(version, attachmentLine);
  const dependencies = mapDependencies(dependenciesLine);
  const loader = determineLoader(input);

  return {
    version,
    loader,
    dependencies,
    ...attachment,
  };
};
