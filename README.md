# doublell

[![Downloads][downloads-badge]][downloads]
[![Size][size-badge]][size]

A very minimal Double Linked List implementation for browsers and Node.

## Usage Examples

```typescript
const list = new DoubleLinkedList<number>();
const node1 = list.append(1);
const node2 = list.prepend(2);
console.log(list.getLength());
console.log(list.getHead()?.value);
console.log(list.getTail()?.value);
console.log(node2.nextNode?.value);
console.log(node1.previousNode?.value);
list.remove(node2);
list.clear();
```

[API Docs](https://typescript-oss.github.io/doublell/)

## Thanks

Thanks for checking it out.  Feel free to create issues or otherwise provide feedback.

Be sure to check out our other [TypeScript OSS](https://github.com/TypeScript-OSS) projects as well.

<!-- Definitions -->

[downloads-badge]: https://img.shields.io/npm/dm/doublell.svg

[downloads]: https://www.npmjs.com/package/doublell

[size-badge]: https://img.shields.io/bundlephobia/minzip/doublell.svg

[size]: https://bundlephobia.com/result?p=doublell
