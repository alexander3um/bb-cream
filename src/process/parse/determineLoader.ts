import { loaders } from "../../loaders.ts";
import { Loader } from "../../types.ts";

export const determineLoader = (input: string): Loader => {
  for (const loader of Object.keys(loaders)) {
    const url = loaders[loader as Loader];

    if (input.includes(url)) {
      return loader as Loader;
    }
  }

  return "forge";
};
