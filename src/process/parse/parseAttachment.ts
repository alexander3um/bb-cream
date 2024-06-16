import { Link } from "../../types.ts";

export const parseAttachment = (version: string, input: string): Link => {
  const matches = input.matchAll(
    /(\[attachment=(?<attachment>\d+:.*?)]|\[url=(?<href>.*?)](?<text>.*?)\[\/url])/gim,
  );

  const match = [...matches][0];

  if (!match || !match.groups) {
    throw new Error(`${version}: не понимаю что тут надо скочать`);
  }

  if (match.groups.attachment) {
    return {
      type: "attachment",
      code: match.groups.attachment,
    };
  }

  return {
    type: "url",
    href: match.groups.href,
    text: match.groups.text,
  };
};
