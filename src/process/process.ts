import { parse } from "./parse/parse.ts";
import { render } from "./render/render.ts";

const attachmentRegExp = /\[attachment=/gim;

export const process = (
  input: string,
  handleNonBlockingError: (message: string) => void,
): string => {
  const { versions, inputCount } = parse(input);
  const { output, count } = render(versions);

  if (inputCount !== count) {
    handleNonBlockingError(
      "Сбой нахрюк системы! Количество версий не совпадает",
    );
  }

  if (
    input.match(attachmentRegExp)?.length !==
    output.match(attachmentRegExp)?.length
  ) {
    handleNonBlockingError(
      "Сбой нахрюк системы! Количество аттачментов не совпадает",
    );
  }

  return output;
};
