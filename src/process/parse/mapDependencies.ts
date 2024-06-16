import { Dependency } from "../../types.ts";
import { loaders } from "../../loaders.ts";

export const mapDependencies = (
  version: string,
  input: string,
): Dependency[] => {
  const matches = input.matchAll(
    /\[url=(?<link>.*?\.html)](?<name>.*?)\[\/url]/gim,
  );

  const dependencies: Dependency[] = [];

  for (const match of matches) {
    const name = match.groups?.name;
    const link = match.groups?.link;

    if (!name || !link) {
      throw new Error(`${version}: не получилось распарсить зависимости`);
    }

    if (Object.keys(loaders).includes(name.toLowerCase())) {
      continue;
    }

    dependencies.push({
      name,
      link,
    });
  }

  return dependencies;
};
