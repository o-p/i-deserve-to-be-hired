interface Node {
  [key: string]: Node|string;
}

/**
 * 簡易版實作，以 recursion 方式逐層反轉，
 * 輸入值必須每階層 Object 至少包含一個 key
 *
 * @param node   欲進行反轉的物件
 * @param exists [optional] 已反轉好的內層部分
 */
function reverse(node: Node|string, exists: Node|string = ''): Node {
  if (!(node instanceof Object)) {
    return { [node]: exists };
  }

  const [[key, child]] = Object.entries(node);

  return reverse(
    <Node|string> child,
    exists ? { [key]: exists } : key,
  );
}

export default reverse;
