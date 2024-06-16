const versionsSeparator =
  /((?<=\[\/url]\s*\[\/d]\n|\[\/url]\s*\[\/d]\s*\[\/r]\s*\[\/c])(?!\n*\[d|\[atta)|(?<=\.jar])(?=\n*[1-9]+))/gim;

const versionFinder = /\d+(\.\d+)+/im;

export const mapVersions = (input: string) => {
  const list = input
    .replace(/\[h]/gm, "")
    .replace(/\[\/h]/gm, "")
    .split(versionsSeparator)
    .filter((line) => !!line)
    .map((line) => line.trim())
    .filter((line) => versionFinder.test(line));

  const versions: Record<string, string> = {};

  for (const line of list) {
    const version = line.match(versionFinder);

    if (!version) {
      throw new Error("Не получилось распарсить версии");
    }

    versions[version[0]] = line;
  }

  return versions;
};
