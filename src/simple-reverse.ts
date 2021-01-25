interface Path {
  [key: string]: Path|string;
}

function reverse(node: Path|string, exists: Path|string = ''): Path {
  if (typeof node === 'string') {
    return { [node]: exists };
  }

  const [[key, child]] = Object.entries(node);

  return reverse(
    <Path|string> child,
    exists ? { [key]: exists } : key,
  )
}

export default reverse;
