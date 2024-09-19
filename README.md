# doublell

[![Downloads][downloads-badge]][downloads]
[![Size][size-badge]][size]

A very minimal Double Linked List implementation for browsers and Node.

Provided as:

- CommonJS
- ES Module

## Usage Examples

```typescript
const list = new DoubleLinkedList<number>();
const node1 = list.append(1);
const node0 = list.prepend(0);
const node0_5 = list.insertBeforeNode(node1, 0.5);
const node1_5 = list.insertAfterNode(node1, 1.5);
console.log(list.getLength());
console.log(list.getHead()?.value);
console.log(list.getTail()?.value);
console.log(node0.nextNode?.value);
console.log(node1.previousNode?.value);
list.remove(node0);
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
