/**
 * A high-performance, type-safe doubly linked list implementation for TypeScript.
 *
 * Features:
 * - Full TypeScript generic support with type safety
 * - Bidirectional traversal and insertion
 * - Iterator protocol support (for...of, spread operator, Array.from)
 * - Array-like methods (forEach, map, find, includes, indexOf)
 * - Stack/Queue operations (push, pop, shift, unshift)
 * - O(1) insertion/deletion at any position when you have the node reference
 * - Memory-efficient with automatic cleanup
 * - Zero dependencies
 *
 * @typeParam ItemT - The type of items stored in the list
 *
 * @example Basic usage
 * ```typescript
 * const list = new DoubleLinkedList<number>(1, 2, 3);
 * const node = list.append(4);
 * console.log([...list]); // [1, 2, 3, 4]
 * ```
 *
 * @example Iterator support
 * ```typescript
 * const list = new DoubleLinkedList('a', 'b', 'c');
 * for (const item of list) {
 *   console.log(item); // 'a', 'b', 'c'
 * }
 * ```
 *
 * @example Stack operations
 * ```typescript
 * const stack = new DoubleLinkedList<number>();
 * stack.push(1); stack.push(2);
 * console.log(stack.pop()); // 2
 * ```
 */
export class DoubleLinkedList<ItemT> {
  /** This is set to `undefined` on any list mutations and rebuilt when `toArray` is called if needed */
  private allValues: Readonly<ItemT[]> | undefined;

  private firstNode: DoubleLinkedListNode<ItemT> | undefined;
  private lastNode: DoubleLinkedListNode<ItemT> | undefined;
  private length = 0;

  /**
   * Creates a new DoubleLinkedList with optional initial items.
   *
   * @param items - Initial items to add to the list (added in order)
   *
   * @example
   * ```typescript
   * const list = new DoubleLinkedList<number>();        // Empty list
   * const list2 = new DoubleLinkedList(1, 2, 3);       // [1, 2, 3]
   * const list3 = new DoubleLinkedList<string>('a');    // ['a']
   * ```
   */
  public constructor(...items: ItemT[]) {
    for (const item of items) {
      this.append(item);
    }
  }

  /**
   * Gets the number of items in the list.
   *
   * @returns The number of items in the list
   * @remarks Time complexity: O(1)
   *
   * @example
   * ```typescript
   * const list = new DoubleLinkedList(1, 2, 3);
   * console.log(list.getLength()); // 3
   * ```
   */
  public readonly getLength = () => this.length;

  /**
   * Checks if the list is empty.
   *
   * @returns `true` if the list has no items, `false` otherwise
   * @remarks Time complexity: O(1)
   *
   * @example
   * ```typescript
   * const list = new DoubleLinkedList<number>();
   * console.log(list.isEmpty()); // true
   * list.append(42);
   * console.log(list.isEmpty()); // false
   * ```
   */
  public readonly isEmpty = () => this.firstNode === undefined;

  /**
   * Adds an item to the end of the list.
   *
   * @param item - The item to add
   * @returns A readonly reference to the newly created node
   * @remarks Time complexity: O(1)
   *
   * @example
   * ```typescript
   * const list = new DoubleLinkedList<string>();
   * const node = list.append('hello');
   * console.log(node.value); // 'hello'
   * ```
   */
  public readonly append = (item: ItemT): Readonly<DoubleLinkedListNode<ItemT>> => {
    const newNode = new DoubleLinkedListNode<ItemT>(this, item);

    if (this.firstNode === undefined) {
      this.firstNode = newNode;
      this.lastNode = newNode;
    } else {
      newNode.previousNode = this.lastNode;
      this.lastNode!.nextNode = newNode;
      this.lastNode = newNode;
    }

    this.allValues = undefined;
    this.length += 1;

    return newNode;
  };

  /**
   * Adds an item to the beginning of the list.
   *
   * @param item - The item to add
   * @returns A readonly reference to the newly created node
   * @remarks Time complexity: O(1)
   *
   * @example
   * ```typescript
   * const list = new DoubleLinkedList(2, 3);
   * const node = list.prepend(1);
   * console.log([...list]); // [1, 2, 3]
   * ```
   */
  public readonly prepend = (item: ItemT): Readonly<DoubleLinkedListNode<ItemT>> => {
    const newNode = new DoubleLinkedListNode<ItemT>(this, item);

    if (this.firstNode === undefined) {
      this.firstNode = newNode;
      this.lastNode = newNode;
    } else {
      newNode.nextNode = this.firstNode;
      this.firstNode!.previousNode = newNode;
      this.firstNode = newNode;
    }

    this.allValues = undefined;
    this.length += 1;

    return newNode;
  };

  /**
   * Removes all items from the list, making it empty.
   * Properly cleans up all node references to prevent memory leaks.
   *
   * @remarks Time complexity: O(n) where n is the number of items
   *
   * @example
   * ```typescript
   * const list = new DoubleLinkedList(1, 2, 3);
   * list.clear();
   * console.log(list.isEmpty()); // true
   * ```
   */
  public readonly clear = () => {
    while (this.firstNode !== undefined) {
      this.remove(this.firstNode);
    }
  };

  /**
   * Gets the first node in the list.
   *
   * @returns The first node, or `undefined` if the list is empty
   * @remarks Time complexity: O(1)
   *
   * @example
   * ```typescript
   * const list = new DoubleLinkedList('a', 'b', 'c');
   * const head = list.getHead();
   * console.log(head?.value); // 'a'
   * ```
   */
  public readonly getHead = (): Readonly<DoubleLinkedListNode<ItemT>> | undefined => this.firstNode;
  /**
   * Gets the last node in the list.
   *
   * @returns The last node, or `undefined` if the list is empty
   * @remarks Time complexity: O(1)
   *
   * @example
   * ```typescript
   * const list = new DoubleLinkedList('a', 'b', 'c');
   * const tail = list.getTail();
   * console.log(tail?.value); // 'c'
   * ```
   */
  public readonly getTail = (): Readonly<DoubleLinkedListNode<ItemT>> | undefined => this.lastNode;

  /**
   * Converts the list to a readonly array.
   * Uses internal caching for performance - the array is only rebuilt when the list is modified.
   *
   * @returns A readonly array containing all items in the list
   * @remarks Time complexity: O(n) on first call after modification, O(1) for cached results
   *
   * @example
   * ```typescript
   * const list = new DoubleLinkedList('x', 'y', 'z');
   * const array = list.toArray();
   * console.log(array); // ['x', 'y', 'z'] (readonly)
   * ```
   */
  public readonly toArray = (): Readonly<ItemT[]> => {
    if (this.allValues !== undefined) {
      return this.allValues;
    }

    const output: ItemT[] = [];
    let cursor = this.firstNode;
    while (cursor !== undefined) {
      output.push(cursor.value);
      cursor = cursor.nextNode;
    }

    this.allValues = Object.freeze(output);

    return output;
  };

  /**
   * Removes a specific node from the list.
   * Safely handles removal of head, tail, or middle nodes.
   *
   * @param node - The node to remove
   * @returns `true` if the node was removed, `false` if it doesn't belong to this list
   * @remarks Time complexity: O(1)
   *
   * @example
   * ```typescript
   * const list = new DoubleLinkedList(1, 2, 3);
   * const node = list.getHead();
   * if (node) {
   *   const removed = list.remove(node);
   *   console.log(removed); // true
   *   console.log([...list]); // [2, 3]
   * }
   * ```
   */
  public readonly remove = (node: DoubleLinkedListNode<ItemT>) => {
    if (node.list !== this) {
      return false; // Nothing to do -- wrong list
    }

    if (node === this.firstNode) {
      // Removing head

      this.firstNode = node.nextNode;
      if (this.firstNode !== undefined) {
        this.firstNode.previousNode = undefined;
      } else {
        this.lastNode = undefined;
      }
    } else if (node === this.lastNode) {
      // Removing tail

      this.lastNode = node.previousNode;
      if (this.lastNode !== undefined) {
        this.lastNode.nextNode = undefined;
      } else {
        this.firstNode = undefined;
      }
    } else {
      // Removing middle

      node.previousNode!.nextNode = node.nextNode;
      node.nextNode!.previousNode = node.previousNode;
    }

    node.previousNode = undefined;
    node.nextNode = undefined;
    node.list = undefined;

    this.allValues = undefined;
    this.length -= 1;

    return true;
  };

  /**
   * Inserts a new item immediately after the specified node.
   *
   * @param node - The node after which to insert the new item
   * @param item - The item to insert
   * @returns The newly created node, or `undefined` if the reference node doesn't belong to this list
   * @remarks Time complexity: O(1)
   *
   * @example
   * ```typescript
   * const list = new DoubleLinkedList(1, 3);
   * const firstNode = list.getHead();
   * if (firstNode) {
   *   list.insertAfterNode(firstNode, 2);
   *   console.log([...list]); // [1, 2, 3]
   * }
   * ```
   */
  public readonly insertAfterNode = (node: DoubleLinkedListNode<ItemT>, item: ItemT): Readonly<DoubleLinkedListNode<ItemT>> | undefined => {
    if (node.list !== this) {
      return undefined; // Nothing to do -- wrong list
    }

    const newNode = new DoubleLinkedListNode<ItemT>(this, item);

    if (node.list.lastNode === node) {
      this.lastNode = newNode;
    }

    newNode.previousNode = node;

    if (node.nextNode !== undefined) {
      newNode.nextNode = node.nextNode;
      node.nextNode.previousNode = newNode;
    }

    node.nextNode = newNode;

    this.allValues = undefined;
    this.length += 1;

    return newNode;
  };

  /**
   * Inserts a new item immediately before the specified node.
   *
   * @param node - The node before which to insert the new item
   * @param item - The item to insert
   * @returns The newly created node, or `undefined` if the reference node doesn't belong to this list
   * @remarks Time complexity: O(1)
   *
   * @example
   * ```typescript
   * const list = new DoubleLinkedList(1, 3);
   * const lastNode = list.getTail();
   * if (lastNode) {
   *   list.insertBeforeNode(lastNode, 2);
   *   console.log([...list]); // [1, 2, 3]
   * }
   * ```
   */
  public readonly insertBeforeNode = (
    node: DoubleLinkedListNode<ItemT>,
    item: ItemT
  ): Readonly<DoubleLinkedListNode<ItemT>> | undefined => {
    if (node.list !== this) {
      return undefined; // Nothing to do -- wrong list
    }

    const newNode = new DoubleLinkedListNode<ItemT>(this, item);

    if (node.list.firstNode === node) {
      this.firstNode = newNode;
    }

    newNode.nextNode = node;

    if (node.previousNode !== undefined) {
      newNode.previousNode = node.previousNode;
      node.previousNode.nextNode = newNode;
    }

    node.previousNode = newNode;

    this.allValues = undefined;
    this.length += 1;

    return newNode;
  };

  /**
   * Makes the list iterable, enabling use with for...of loops, spread operator, Array.from(), etc.
   *
   * @returns An iterator that yields each item in the list from head to tail
   * @remarks Time complexity: O(1) per iteration, O(n) for complete iteration
   *
   * @example Iterator usage
   * ```typescript
   * const list = new DoubleLinkedList('a', 'b', 'c');
   *
   * // for...of loop
   * for (const item of list) {
   *   console.log(item); // 'a', 'b', 'c'
   * }
   *
   * // Spread operator
   * const array = [...list]; // ['a', 'b', 'c']
   *
   * // Array.from()
   * const array2 = Array.from(list); // ['a', 'b', 'c']
   * ```
   */
  public readonly [Symbol.iterator] = (): Iterator<ItemT> => {
    let current = this.firstNode;

    return {
      next(): IteratorResult<ItemT> {
        if (current === undefined) {
          return { done: true, value: undefined };
        }

        const value = current.value;
        current = current.nextNode;
        return { done: false, value };
      }
    };
  };

  /**
   * Executes a provided function once for each item in the list.
   * Similar to Array.prototype.forEach().
   *
   * @param callback - Function to execute for each item. Receives (value, index, list) as parameters.
   * @remarks Time complexity: O(n)
   *
   * @example
   * ```typescript
   * const list = new DoubleLinkedList('a', 'b', 'c');
   * list.forEach((value, index) => {
   *   console.log(`${index}: ${value}`); // "0: a", "1: b", "2: c"
   * });
   * ```
   */
  public readonly forEach = (callback: (value: ItemT, index: number, list: DoubleLinkedList<ItemT>) => void): void => {
    let index = 0;
    let cursor = this.firstNode;
    while (cursor !== undefined) {
      callback(cursor.value, index, this);
      cursor = cursor.nextNode;
      index += 1;
    }
  };

  /**
   * Creates a new DoubleLinkedList with the results of calling a provided function on every item.
   * Similar to Array.prototype.map().
   *
   * @typeParam U - The type of items in the returned list
   * @param callback - Function that produces an item of the new list. Receives (value, index, list) as parameters.
   * @returns A new DoubleLinkedList with the transformed items
   * @remarks Time complexity: O(n)
   *
   * @example
   * ```typescript
   * const numbers = new DoubleLinkedList(1, 2, 3);
   * const doubled = numbers.map(x => x * 2);
   * console.log([...doubled]); // [2, 4, 6]
   *
   * const strings = numbers.map(x => x.toString());
   * console.log([...strings]); // ['1', '2', '3']
   * ```
   */
  public readonly map = <U>(callback: (value: ItemT, index: number, list: DoubleLinkedList<ItemT>) => U): DoubleLinkedList<U> => {
    const result = new DoubleLinkedList<U>();
    let index = 0;
    let cursor = this.firstNode;
    while (cursor !== undefined) {
      result.append(callback(cursor.value, index, this));
      cursor = cursor.nextNode;
      index += 1;
    }
    return result;
  };

  /**
   * Returns the first item in the list that satisfies the provided testing function.
   * Similar to Array.prototype.find().
   *
   * @param predicate - Function to test each item. Receives (value, index, list) as parameters.
   * @returns The first item that matches the predicate, or `undefined` if no match is found
   * @remarks Time complexity: O(n) in worst case, O(k) where k is the position of the found item
   *
   * @example
   * ```typescript
   * const list = new DoubleLinkedList(1, 2, 3, 4, 5);
   * const found = list.find(x => x > 3);
   * console.log(found); // 4
   *
   * const notFound = list.find(x => x > 10);
   * console.log(notFound); // undefined
   * ```
   */
  public readonly find = (predicate: (value: ItemT, index: number, list: DoubleLinkedList<ItemT>) => boolean): ItemT | undefined => {
    let index = 0;
    let cursor = this.firstNode;
    while (cursor !== undefined) {
      if (predicate(cursor.value, index, this)) {
        return cursor.value;
      }
      cursor = cursor.nextNode;
      index += 1;
    }
    return undefined;
  };

  /**
   * Returns the first index at which a given item can be found in the list.
   * Similar to Array.prototype.indexOf().
   *
   * @param searchElement - The item to search for
   * @param fromIndex - The index to start the search from (default: 0)
   * @returns The index of the first occurrence of the item, or -1 if not found
   * @remarks Time complexity: O(n) in worst case, O(k) where k is the position of the found item
   *
   * @example
   * ```typescript
   * const list = new DoubleLinkedList('a', 'b', 'c', 'b');
   * console.log(list.indexOf('b'));    // 1 (first occurrence)
   * console.log(list.indexOf('b', 2)); // 3 (starting from index 2)
   * console.log(list.indexOf('z'));    // -1 (not found)
   * ```
   */
  public readonly indexOf = (searchElement: ItemT, fromIndex: number = 0): number => {
    let index = 0;
    let cursor = this.firstNode;

    // Skip to fromIndex
    while (cursor !== undefined && index < fromIndex) {
      cursor = cursor.nextNode;
      index += 1;
    }

    while (cursor !== undefined) {
      if (cursor.value === searchElement) {
        return index;
      }
      cursor = cursor.nextNode;
      index += 1;
    }
    return -1;
  };

  /**
   * Determines whether the list includes a certain item.
   * Similar to Array.prototype.includes().
   *
   * @param searchElement - The item to search for
   * @param fromIndex - The index to start the search from (default: 0)
   * @returns `true` if the item is found, `false` otherwise
   * @remarks Time complexity: O(n) in worst case, O(k) where k is the position of the found item
   *
   * @example
   * ```typescript
   * const list = new DoubleLinkedList(1, 2, 3);
   * console.log(list.includes(2));    // true
   * console.log(list.includes(4));    // false
   * console.log(list.includes(1, 1)); // false (starting from index 1)
   * ```
   */
  public readonly includes = (searchElement: ItemT, fromIndex: number = 0): boolean => {
    return this.indexOf(searchElement, fromIndex) !== -1;
  };

  /**
   * Adds an item to the end of the list (stack/array-like operation).
   * Alias for `append()` method.
   *
   * @param item - The item to add
   * @returns A readonly reference to the newly created node
   * @remarks Time complexity: O(1)
   *
   * @example Stack usage
   * ```typescript
   * const stack = new DoubleLinkedList<number>();
   * stack.push(1);
   * stack.push(2);
   * console.log(stack.pop()); // 2 (LIFO)
   * ```
   */
  public readonly push = (item: ItemT): Readonly<DoubleLinkedListNode<ItemT>> => {
    return this.append(item);
  };

  /**
   * Removes and returns the last item from the list (stack-like operation).
   *
   * @returns The last item, or `undefined` if the list is empty
   * @remarks Time complexity: O(1)
   *
   * @example Stack usage
   * ```typescript
   * const stack = new DoubleLinkedList(1, 2, 3);
   * console.log(stack.pop()); // 3
   * console.log(stack.pop()); // 2
   * console.log([...stack]);  // [1]
   * ```
   */
  public readonly pop = (): ItemT | undefined => {
    if (this.lastNode === undefined) {
      return undefined;
    }

    const value = this.lastNode.value;
    this.remove(this.lastNode);
    return value;
  };

  /**
   * Removes and returns the first item from the list (queue-like operation).
   *
   * @returns The first item, or `undefined` if the list is empty
   * @remarks Time complexity: O(1)
   *
   * @example Queue usage
   * ```typescript
   * const queue = new DoubleLinkedList(1, 2, 3);
   * queue.push(4); // Add to end
   * console.log(queue.shift()); // 1 (remove from start - FIFO)
   * console.log([...queue]);    // [2, 3, 4]
   * ```
   */
  public readonly shift = (): ItemT | undefined => {
    if (this.firstNode === undefined) {
      return undefined;
    }

    const value = this.firstNode.value;
    this.remove(this.firstNode);
    return value;
  };

  /**
   * Adds an item to the beginning of the list (array-like operation).
   * Alias for `prepend()` method.
   *
   * @param item - The item to add
   * @returns A readonly reference to the newly created node
   * @remarks Time complexity: O(1)
   *
   * @example
   * ```typescript
   * const list = new DoubleLinkedList(2, 3);
   * list.unshift(1);
   * console.log([...list]); // [1, 2, 3]
   * ```
   */
  public readonly unshift = (item: ItemT): Readonly<DoubleLinkedListNode<ItemT>> => {
    return this.prepend(item);
  };

  /**
   * Gets the item at the specified index (array-like access).
   * Supports negative indices to access from the end.
   *
   * @param index - The zero-based index of the item to retrieve (supports negative indices)
   * @returns The item at the specified index, or `undefined` if index is out of bounds
   * @remarks Time complexity: O(n) where n is the distance to the index
   *
   * @example Basic usage
   * ```typescript
   * const list = new DoubleLinkedList('a', 'b', 'c', 'd');
   * console.log(list.get(0));  // 'a' (first item)
   * console.log(list.get(2));  // 'c' (third item)
   * console.log(list.get(10)); // undefined (out of bounds)
   * ```
   *
   * @example Negative indices
   * ```typescript
   * const list = new DoubleLinkedList(1, 2, 3, 4);
   * console.log(list.get(-1)); // 4 (last item)
   * console.log(list.get(-2)); // 3 (second to last)
   * console.log(list.get(-10)); // undefined (out of bounds)
   * ```
   */
  public readonly get = (index: number): ItemT | undefined => {
    const node = this.getNodeAt(index);
    return node?.value;
  };

  /**
   * Gets the node at the specified index.
   * Supports negative indices to access from the end.
   *
   * @param index - The zero-based index of the node to retrieve (supports negative indices)
   * @returns The node at the specified index, or `undefined` if index is out of bounds
   * @remarks Time complexity: O(n) where n is the distance to the index
   *
   * @example
   * ```typescript
   * const list = new DoubleLinkedList('a', 'b', 'c');
   * const node = list.getNodeAt(1);
   * console.log(node?.value); // 'b'
   * ```
   */
  public readonly getNodeAt = (index: number): Readonly<DoubleLinkedListNode<ItemT>> | undefined => {
    const length = this.length;

    // Handle negative indices
    const actualIndex = index < 0 ? length + index : index;

    // Check bounds
    if (actualIndex < 0 || actualIndex >= length) {
      return undefined;
    }

    // Optimize by choosing shortest path (from head or tail)
    const fromHead = actualIndex;
    const fromTail = length - 1 - actualIndex;

    if (fromHead <= fromTail) {
      // Traverse from head
      let current = this.firstNode;
      for (let i = 0; i < actualIndex && current; i += 1) {
        current = current.nextNode;
      }
      return current;
    } else {
      // Traverse from tail
      let current = this.lastNode;
      for (let i = 0; i < fromTail && current; i += 1) {
        current = current.previousNode;
      }
      return current;
    }
  };

  /**
   * Changes the contents of the list by removing existing items and/or adding new items.
   * Similar to Array.prototype.splice() but with enhanced node-based operations.
   *
   * @param start - Zero-based index, DoubleLinkedListNode, or undefined to specify where to start changing the list.
   *                - number: Zero-based index (supports negative indices)
   *                - DoubleLinkedListNode: Start at the position of this node (O(1) lookup)
   *                - undefined: Start at the end of the list (equivalent to list.length)
   * @param deleteCount - Number of items to remove from the list (default: 0)
   * @param items - Items to add to the list, beginning from the start position
   * @returns A new DoubleLinkedList containing the deleted items
   * @remarks Time complexity: O(n) for index-based, O(1) for node-based start position
   *
   * @example Remove items by index
   * ```typescript
   * const list = new DoubleLinkedList('a', 'b', 'c', 'd');
   * const removed = list.splice(1, 2); // Remove 2 items starting at index 1
   * console.log([...list]); // ['a', 'd']
   * console.log([...removed]); // ['b', 'c']
   * ```
   *
   * @example Add items by node reference (O(1) performance)
   * ```typescript
   * const list = new DoubleLinkedList('a', 'd');
   * const nodeA = list.getHead();
   * if (nodeA) {
   *   list.splice(nodeA.nextNode, 0, 'b', 'c'); // Insert at node position
   *   console.log([...list]); // ['a', 'b', 'c', 'd']
   * }
   * ```
   *
   * @example Replace items using node reference
   * ```typescript
   * const list = new DoubleLinkedList(1, 2, 3, 4);
   * const secondNode = list.getHead()?.nextNode;
   * if (secondNode) {
   *   const removed = list.splice(secondNode, 2, 10, 20);
   *   console.log([...list]); // [1, 10, 20, 4]
   *   console.log([...removed]); // [2, 3]
   * }
   * ```
   *
   * @example Append to end using undefined
   * ```typescript
   * const list = new DoubleLinkedList('a', 'b');
   * list.splice(undefined, 0, 'c', 'd'); // Append to end
   * console.log([...list]); // ['a', 'b', 'c', 'd']
   * ```
   *
   * @example Negative start index
   * ```typescript
   * const list = new DoubleLinkedList('a', 'b', 'c', 'd');
   * list.splice(-2, 1, 'x'); // Remove 1 item from 2nd to last position, add 'x'
   * console.log([...list]); // ['a', 'b', 'x', 'd']
   * ```
   */
  public readonly splice = (
    start: number | DoubleLinkedListNode<ItemT> | undefined,
    deleteCount: number = 0,
    ...items: ItemT[]
  ): DoubleLinkedList<ItemT> => {
    // Prep phase: normalize all start types to startNode
    let startNode: DoubleLinkedListNode<ItemT> | undefined;

    if (start === undefined) {
      // undefined means append at end
      startNode = undefined;
    } else if (typeof start === 'number') {
      // Convert numeric index to startNode using optimized getNodeAt
      const length = this.length;
      const actualStart = start < 0 ? Math.max(0, length + start) : Math.min(start, length);
      startNode = actualStart >= length ? undefined : this.getNodeAt(actualStart);
    } else {
      // start is already a DoubleLinkedListNode
      if (start.list !== this) {
        // Node doesn't belong to this list, treat as no-op
        return new DoubleLinkedList<ItemT>();
      }
      startNode = start;
    }

    // Remove items - deleteCount is naturally bounded by available nodes
    const removed = new DoubleLinkedList<ItemT>();
    let nodeToRemove = startNode;
    const actualDeleteCount = Math.max(0, deleteCount);

    for (let i = 0; i < actualDeleteCount && nodeToRemove; i += 1) {
      const nextNode = nodeToRemove.nextNode;
      removed.append(nodeToRemove.value);
      this.remove(nodeToRemove);
      nodeToRemove = nextNode;
    }

    // Insert new items at the same position
    if (items.length > 0) {
      if (nodeToRemove) {
        // Insert before the node that follows the removed items
        let lastInserted: DoubleLinkedListNode<ItemT> | undefined;
        for (const item of items) {
          if (lastInserted) {
            lastInserted = this.insertAfterNode(lastInserted, item);
          } else {
            lastInserted = this.insertBeforeNode(nodeToRemove, item);
          }
        }
      } else {
        // No node follows, append at end
        for (const item of items) {
          this.append(item);
        }
      }
    }

    return removed;
  };
}

/**
 * A node in a DoubleLinkedList containing a value and references to adjacent nodes.
 *
 * @typeParam ItemT - The type of the value stored in this node
 *
 * @example Traversing nodes
 * ```typescript
 * const list = new DoubleLinkedList('a', 'b', 'c');
 * let node = list.getHead();
 * while (node) {
 *   console.log(node.value); // 'a', 'b', 'c'
 *   node = node.nextNode;
 * }
 * ```
 */
export class DoubleLinkedListNode<ItemT> {
  /**
   * Creates a new DoubleLinkedListNode.
   *
   * @param list - Reference to the list that owns this node
   * @param value - The value stored in this node
   * @param previousNode - Reference to the previous node in the list
   * @param nextNode - Reference to the next node in the list
   */
  constructor(
    /** Reference to the list that owns this node (undefined after removal) */
    public list: DoubleLinkedList<ItemT> | undefined,
    /** The immutable value stored in this node */
    public readonly value: ItemT,
    /** Reference to the previous node, or undefined if this is the first node */
    public previousNode?: DoubleLinkedListNode<ItemT>,
    /** Reference to the next node, or undefined if this is the last node */
    public nextNode?: DoubleLinkedListNode<ItemT>
  ) {}
}
