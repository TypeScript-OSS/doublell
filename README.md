# doublell

[![Downloads][downloads-badge]][downloads]
[![Size][size-badge]][size]
[![TypeScript][typescript-badge]](https://www.typescriptlang.org/)
[![MIT License][license-badge]](LICENSE)

> **The most type-safe, performant, and developer-friendly doubly linked list for TypeScript and JavaScript**

A production-ready doubly linked list implementation that works seamlessly in **both browsers and Node.js**. Combines the performance of low-level data structures with the convenience of modern JavaScript APIs. Perfect for algorithms, data processing, and any application requiring efficient insertion/deletion operations.

## 🚀 Quick Start

```bash
npm install doublell
# or
yarn add doublell
```

```typescript
import { DoubleLinkedList } from 'doublell';

// Create and populate
const list = new DoubleLinkedList(1, 2, 3);

// Modern iteration
for (const item of list) {
  console.log(item); // 1, 2, 3
}

// Array-like methods
const doubled = list.map((x) => x * 2);
console.log([...doubled]); // [2, 4, 6]

// Stack/Queue operations
list.push(4);           // Add to end
const last = list.pop(); // Remove from end
const first = list.shift(); // Remove from start
```

## ✨ Why Choose doublell?

### 🎯 **Type-Safe by Design**
```typescript
// Full TypeScript generics support
const numbers = new DoubleLinkedList<number>(1, 2, 3);
const strings = numbers.map((n) => n.toString()); // DoubleLinkedList<string>

// AI assistants and IDEs love the complete type information
const found = list.find((x) => x > 5); // number | undefined
```

### ⚡ **Performance Optimized**
- **O(1)** insertion/deletion at any position (when you have the node reference)
- **O(1)** push/pop/shift/unshift operations
- **Cached array conversion** - only rebuilds when needed
- **Zero dependencies** - minimal bundle impact for web and Node.js

### 🧑‍💻 **Universal Developer Experience**
```typescript
// Array-like index access with optimization
console.log(list.get(0));    // First item
console.log(list.get(-1));   // Last item (optimized from tail)
console.log(list.get(5));    // Item at index 5

// Familiar Array-like API
list.forEach((item, index) => console.log(item, index));
const found = list.find((x) => x > 10);
const includes = list.includes(42);
const index = list.indexOf('hello');

// Iterator protocol support
const array = [...list];              // Spread operator
const mapped = Array.from(list);      // Array.from
for (const item of list) { /* */ }    // for...of loops

// Stack and Queue operations (works in browser and Node.js)
const stack = new DoubleLinkedList<string>();
stack.push('first'); stack.push('second');
console.log(stack.pop()); // 'second' (LIFO)

const queue = new DoubleLinkedList<number>();
queue.push(1); queue.push(2);
console.log(queue.shift()); // 1 (FIFO)
```

### 🔧 **Node-Level Control**
```typescript
// Traditional node manipulation
const list = new DoubleLinkedList('a', 'b', 'd');
const nodeB = list.getHead()?.nextNode;
if (nodeB) {
  list.insertAfterNode(nodeB, 'c'); // O(1) insertion
}

// Enhanced node-based splice - even more powerful!
const list2 = new DoubleLinkedList(1, 2, 5, 6);
const nodeAt5 = list2.getTail()?.previousNode;
if (nodeAt5) {
  // Replace one item with multiple - all in O(1)!
  list2.splice(nodeAt5, 1, 3, 4); // [1, 2, 3, 4, 6]
}

// Append efficiently using undefined
list2.splice(undefined, 0, 7, 8, 9); // [1, 2, 3, 4, 6, 7, 8, 9]
```

## 📚 Complete API Reference

### Core Operations
```typescript
// Creation and basic operations
const list = new DoubleLinkedList<T>(...items);
list.append(item)           // Add to end
list.prepend(item)          // Add to beginning  
list.getLength()            // Get size
list.isEmpty()              // Check if empty
list.clear()                // Remove all items
list.remove(node)           // Remove specific node

// Node access
list.getHead()              // First node
list.getTail()              // Last node
list.insertAfterNode(node, item)   // Insert after node
list.insertBeforeNode(node, item)  // Insert before node
```

### Array-like Methods
```typescript
// Index-based access
list.get(index)             // Get item by index (supports negative indices)
list.getNodeAt(index)       // Get node by index (supports negative indices)

// Iteration and transformation
list.forEach(callback)      // Execute function for each item
list.map(callback)          // Transform to new list
list.find(predicate)        // Find first matching item
list.indexOf(item)          // Get index of item
list.includes(item)         // Check if item exists
list.toArray()              // Convert to array

// Array modification
list.splice(start, deleteCount, ...items)  // Remove/insert items at index

// Stack/Queue operations  
list.push(item)             // Add to end (alias for append)
list.pop()                  // Remove from end
list.shift()                // Remove from beginning
list.unshift(item)          // Add to beginning (alias for prepend)

// Iterator support
[...list]                   // Spread to array
Array.from(list)            // Convert to array
for (const item of list)    // for...of iteration
```

## 🎨 Real-World Use Cases

### LRU Cache Implementation
```typescript
// Why DoubleLinkedList is perfect for LRU Cache:
// - O(1) access to both ends (most/least recently used)
// - O(1) removal from anywhere (when you have the node reference)  
// - O(1) insertion at head (mark as most recently used)

class LRUCache<K, V> {
  private capacity: number;
  private list = new DoubleLinkedList<{ key: K; value: V }>();
  private map = new Map<K, DoubleLinkedListNode<{ key: K; value: V }>>();

  constructor(capacity: number) {
    this.capacity = capacity;
  }

  get(key: K): V | undefined {
    const node = this.map.get(key);
    if (node !== undefined) {
      // Move to front (most recently used) - O(1)!
      this.list.remove(node);
      const newNode = this.list.prepend(node.value);
      this.map.set(key, newNode);
      return node.value.value;
    }
    return undefined;
  }

  set(key: K, value: V): void {
    const existingNode = this.map.get(key);
    
    if (existingNode !== undefined) {
      // Update existing - move to front
      this.list.remove(existingNode);
      const newNode = this.list.prepend({ key, value });
      this.map.set(key, newNode);
    } else {
      // Check capacity - evict LRU if needed
      if (this.list.getLength() >= this.capacity) {
        const tail = this.list.getTail(); // Least recently used
        if (tail !== undefined) {
          this.list.remove(tail);        // O(1) eviction!
          this.map.delete(tail.value.key);
        }
      }
      
      // Add new item at front (most recently used)
      const newNode = this.list.prepend({ key, value });
      this.map.set(key, newNode);
    }
  }
}

// Perfect O(1) performance for all LRU operations!
const cache = new LRUCache<string, number>(3);
cache.set('a', 1); cache.set('b', 2); cache.set('c', 3);
cache.get('a'); // Move 'a' to front
cache.set('d', 4); // Evicts 'b' (LRU) in O(1)
```

### Undo/Redo System
```typescript
class UndoRedoManager<T> {
  private history = new DoubleLinkedList<T>();
  private current: DoubleLinkedListNode<T> | undefined;
  
  execute(state: T): void {
    // When executing new action, discard any "future" states using node-based splice
    if (this.current !== undefined && this.current.nextNode !== undefined) {
      // Remove all states after current position - O(1) with node reference!
      this.history.splice(this.current.nextNode, this.history.getLength());
    }
    
    // Add new state
    this.current = this.current !== undefined ? 
      this.history.insertAfterNode(this.current, state) : 
      this.history.append(state);
  }
  
  undo(): T | undefined {
    if (this.current !== undefined && this.current.previousNode !== undefined) {
      this.current = this.current.previousNode;
      return this.current.value;
    }
    return undefined;
  }
  
  redo(): T | undefined {
    if (this.current !== undefined && this.current.nextNode !== undefined) {
      this.current = this.current.nextNode;
      return this.current.value;
    }
    return undefined;
  }
}
```

## 🤖 AI Assistant Friendly

This library is designed to work seamlessly with AI coding assistants:

```typescript
// Rich type information helps AI understand your intent
const userList = new DoubleLinkedList<User>();

// AI can suggest appropriate methods based on context
userList.find((user) => user.isActive);     // AI knows this returns User | undefined
userList.map((user) => user.email);         // AI knows this returns DoubleLinkedList<string>
userList.forEach((user, index) => {       // AI provides correct callback signature
  console.log(`User ${index}: ${user.name}`);
});

// Comprehensive JSDoc comments provide context for AI suggestions
// AI assistants can explain performance characteristics and usage patterns
```

## 📊 Performance Comparison

| Operation | doublell | Array | Native Set |
|-----------|----------|-------|------------|
| Insert at position | **O(1)** ⚡ | O(n) | N/A |
| Delete at position | **O(1)** ⚡ | O(n) | N/A |
| Push/Pop | **O(1)** ⚡ | **O(1)** ⚡ | N/A |
| Shift/Unshift | **O(1)** ⚡ | O(n) | N/A |
| Find element | O(n) | O(n) | **O(1)** ⚡ |
| Iteration | O(n) | O(n) | O(n) |

*Use doublell when you need frequent insertions/deletions. Use Array for random access. Use Set for fast lookups.*

## 🛠️ Development

```bash
# Install dependencies
yarn install

# Run tests (Node.js)
yarn test

# Build for production (CommonJS + ESM)
yarn build

# Generate documentation
yarn generate:docs

# Lint code
yarn lint
```

### Browser Support
- **Modern browsers** with ES2015+ support
- **Bundle size**: Minified and tree-shakeable
- **Module formats**: ESM and UMD available

### Node.js Support
- **Node.js 14.14+** (all maintained versions)
- **CommonJS and ESM** module support
- **TypeScript definitions** included

## 🌟 Why Developers Love doublell

- **Familiar yet powerful** - All the convenience of arrays with O(1) insertion/deletion performance
- **TypeScript excellence** - Comprehensive generic typing that makes development a breeze
- **Iterator protocol support** - Use it anywhere you'd use an array with for...of, spread operator, and more
- **AI assistant friendly** - Rich type information and documentation that coding assistants understand perfectly
- **Zero learning curve** - If you know JavaScript arrays, you already know most of the API
- **Production ready** - High test coverage, works in browsers and Node.js, battle-tested performance

## 📖 API Documentation

Complete API documentation with examples is available at [https://typescript-oss.github.io/doublell/](https://typescript-oss.github.io/doublell/)

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

## 📄 License

MIT © [TypeScript OSS](https://github.com/TypeScript-OSS)

---

**Keywords:** doubly-linked-list, data-structure, typescript, javascript, algorithm, performance, type-safe, iterator, functional-programming, generic, zero-dependencies, browser, nodejs, universal

<!-- Definitions -->

[downloads-badge]: https://img.shields.io/npm/dm/doublell.svg
[downloads]: https://www.npmjs.com/package/doublell
[size-badge]: https://img.shields.io/bundlephobia/minzip/doublell.svg
[size]: https://bundlephobia.com/result?p=doublell
[typescript-badge]: https://img.shields.io/badge/TypeScript-Ready-blue.svg
[license-badge]: https://img.shields.io/badge/license-MIT-green.svg