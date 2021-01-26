interface Node {
  [key: string]: Node|string;
}

type Entry = [key: string, value: string];
type Entries = Entry[];

type EntriesFilter = (entries: Entries) => Entry|null;

function reverseNodes(node: Node|string, filter: EntriesFilter, exists: Node|string = ''): Node|null {
  if (!(node instanceof Object)) {
    return { [node]: exists };
  }

  const entries = Object.entries(node);

  let key: string;
  let child: Node|string;
  let entry;

  switch (entries.length) {
    // Empty object, 如果是 root, 回傳 {}; 如果是內層, 略過此層
    case 0:
      return exists instanceof Object ? exists : null;
    // 標準狀況, 單一 key-value
    case 1:
      [[key, child]] = entries;
      break;
    // 多 key-value 時，透過 filter 決定要使用的 entry
    default:
      entry = filter(<Entries> entries);
      if (entry === null) {
        // filter 回 null，代表 sub-nodes 都不要，應該要停在 exists 部分
        return exists instanceof Object ? exists : null;
      }
      [key, child] = entry;
      break;
  }

  return reverseNodes(
    <Node|string> child,
    filter,
    exists ? { [key]: exists } : key,
  );
}

function defaultEntriesFilter(entries: Entries): Entry|null {
  return entries[0] ?? null;
}

/**
 * 反轉 Nested Object 中每階層的 parent-child nodes
 *
 * 如果輸入值不合法，會回傳 null:
 *   - 輸入值非 Object instance，e.g. null
 *   - 輸入值最底層為 empty object，e.g. {}
 *   - 輸入值次一層為 empty object，e.g. { key: {} }
 *
 * @param nodes  要進行反轉的 object
 * @param filter optional，如果 object 中包含多組 key-value pair，會透過此 filter 進行挑選
 */
function reverse(nodes: Node, filter: EntriesFilter = defaultEntriesFilter) {
  // 不合規格的 inputs，回 null
  if (!(nodes instanceof Object)) return null;

  return reverseNodes(nodes, filter);
}

export default reverse;
