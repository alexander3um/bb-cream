import { parse } from "./parse/parse.ts";
import { render } from "./render/render.ts";

export const process = (input: string): string => {
  const { versions, inputCount } = parse(input);
  const { output, count } = render(versions);

  if (inputCount !== count) {
    throw new Error("Сбой нахрюк системы! Количество версий не совпадает");
  }

  return output;
};
