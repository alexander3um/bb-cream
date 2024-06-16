import { Version } from "../../types.ts";

export const sortVersions = (versions: Version[]): Version[] =>
  [...versions].sort((a, b) => {
    const pa = a.version.split(".");
    const pb = b.version.split(".");

    for (let i = 0; i < 3; i++) {
      const na = Number(pa[i]);
      const nb = Number(pb[i]);

      if (na > nb) {
        return 1;
      }

      if (nb > na) {
        return -1;
      }

      if (!isNaN(na) && isNaN(nb)) {
        return 1;
      }

      if (isNaN(na) && !isNaN(nb)) {
        return -1;
      }
    }

    return 0;
  });
