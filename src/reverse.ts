interface Path {
  [key: string]: Path|string;
}

type Entry = [key: string, value: string];
type Entries = Entry[];

type EntriesFilter = (entries: Entries) => Entry|null;

function reverseNodes(node: Path|string, filter: EntriesFilter, exists: Path|string = ''): Path|null {
  if (!(node instanceof Object)) {
    return { [node]: exists };
  }

  const entries = Object.entries(node);

  let key: string;
  let child: Path|string;
  let entry;

  switch (entries.length) {
    // Empty object, 如果是 root, 回傳 {}; 如果是內層, 略過此層
    case 0:
      return exists instanceof Object ? exists : {};
    // 標準狀況, 單一 key-value
    case 1:
      [[key, child]] = entries;
      break;
    // 多 key-value 時，透過 filter 決定要使用的 entry
    default:
      entry = filter(<Entries> entries);
      if (entry === null) return exists instanceof Object ? exists : null;
      [key, child] = entry;
      break;
  }

  return reverseNodes(
    <Path|string> child,
    filter,
    exists ? { [key]: exists } : key,
  );
}

function defaultEntriesFilter(entries: Entries): Entry|null {
  return entries[0] ?? null;
}

function reverse(nodes: Path|null, filter: EntriesFilter = defaultEntriesFilter) {
  if (!(nodes instanceof Object)) return null;

  return reverseNodes(nodes, filter);
}

export default reverse;
