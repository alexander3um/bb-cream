type GroupKey = string | number;

// Generated
function groupBy<T>(array: T[], key: keyof T): Map<GroupKey, T[]> {
  return array.reduce((result, currentItem) => {
    let groupKey = currentItem[key] as GroupKey;
    let group = result.get(groupKey);
    if (!group) {
      group = [];
      result.set(groupKey, group);
    }
    group.push(currentItem);
    return result;
  }, new Map<GroupKey, T[]>());
}
