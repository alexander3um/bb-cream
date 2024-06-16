import { parse } from "./parse/parse.ts";
import { render } from "./render/render.ts";

export const process = (input: string): string => render(parse(input));
