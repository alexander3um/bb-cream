import { Version } from "../../types.ts";

export const parseAttachment = (
  version: string,
  input: string,
): Pick<Version, "linkType" | "link"> => {
  const matches = input.matchAll(
    /(\[attachment=(?<attachment>\d+:.*?)]|\[url=(?<link>.*?)](?<name>.*?)\[\/url])/gim,
  );

  const match = [...matches][0];

  if (!match || !match.groups) {
    throw new Error(`${version}: не понимаю что тут надо скочать`);
  }

  if (match.groups.attachment) {
    return {
      linkType: "attachment",
      link: match.groups.attachment,
    };
  }

  return {
    linkType: "url",
    link: match.groups.link,
  };
};
