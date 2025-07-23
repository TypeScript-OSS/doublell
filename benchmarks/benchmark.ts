/**
 * Performance benchmarking script for doublell vs other linked list implementations
 *
 * This script compares doublell against:
 * - Native JavaScript Arrays
 * - linked-list (by wooorm) - most popular npm package
 * - dbly-linked-list - another popular npm package
 * - simple-double-linked-list - TypeScript-based package
 *
 * Run with: yarn benchmark
 */

import type { Node as DblyNode } from 'dbly-linked-list';
import LinkedListDbly from 'dbly-linked-list';
import type { DoubleLinkedListNode } from 'doublell';
import { DoubleLinkedList, getNextNode } from 'doublell';
import { Item as LinkedListItem, List as LinkedListWooorm } from 'linked-list';
import { performance } from 'perf_hooks';
import { List as SimpleDoubleLinkedList } from 'simple-double-linked-list';
import type { ListIterator } from 'simple-double-linked-list/dist/src/listIterator';

// Test data sizes
const SMALL_SIZE = 500;
const MEDIUM_SIZE = 5000;
const LARGE_SIZE = 50000;

// Number of iterations for averaging results
const ITERATIONS = 10;

type BenchmarkMethod = <L, MiddleT>(benchmarks: Benchmarks<any, any>, list: L, middle: MiddleT, data: string[]) => any;
type BenchmarkResults = Record<string, number | string>;

/**
 * Measures execution time of a function
 */
function measureTime<T>(setup: () => T, fn: (prep: T) => void, iterations: number = ITERATIONS): number {
  const times: number[] = [];

  for (let i = 0; i < iterations; i++) {
    const prep = setup();
    const start = performance.now();
    fn(prep);
    const end = performance.now();
    times.push(end - start);
  }

  // Return average time, excluding the first run (warmup)
  const validTimes = times.slice(1);
  return validTimes.length > 0 ? validTimes.reduce((a, b) => a + b) / validTimes.length : times[0];
}

/**
 * Formats time in appropriate units
 */
function formatTime(ms: number): string {
  if (ms < 1) return `${(ms * 1000).toFixed(2)}μs`;
  if (ms < 1000) return `${ms.toFixed(2)}ms`;
  return `${(ms / 1000).toFixed(2)}s`;
}

/**
 * Create test data
 */
function createTestData(size: number): string[] {
  return Array.from({ length: size }, (_, i) => `item-${i}`);
}

interface Benchmarks<PrepT, MiddleT> {
  createAndPopulate(data: string[]): any;
  insertAtBeginning(data: string[]): any;
  insertAtEnd(data: string[]): any;
  traverse(list: PrepT): number;
  findItem(list: PrepT, searchItem: string): string | undefined;
  removeFromEnd(list: PrepT): void;
  removeFromBeginning(list: PrepT): void;
  convertToArray(list: PrepT): readonly string[];
  map(list: PrepT): any;
  indexAccess(list: PrepT): string[];
  insertInMiddle(list: PrepT, middle: MiddleT, data: string[]): void;
  removeFromMiddle(list: PrepT, middle: MiddleT): void;
}

/**
 * Benchmarks for doublell
 */
class DoublellBenchmarks implements Benchmarks<DoubleLinkedList<string>, DoubleLinkedListNode<string>> {
  createAndPopulate(data: string[]): DoubleLinkedList<string> {
    const list = new DoubleLinkedList<string>();
    for (const item of data) {
      list.append(item);
    }
    return list;
  }

  insertAtBeginning(data: string[]): DoubleLinkedList<string> {
    const list = new DoubleLinkedList<string>();
    for (const item of data) {
      list.prepend(item);
    }
    return list;
  }

  insertAtEnd(data: string[]): DoubleLinkedList<string> {
    const list = new DoubleLinkedList<string>();
    for (const item of data) {
      list.append(item);
    }
    return list;
  }

  traverse(list: DoubleLinkedList<string>): number {
    let count = 0;
    for (const _item of list) {
      count++;
    }
    return count;
  }

  findItem(list: DoubleLinkedList<string>, searchItem: string): string | undefined {
    return list.find((item) => item === searchItem);
  }

  removeFromEnd(list: DoubleLinkedList<string>): void {
    const originalSize = list.getLength();
    for (let i = 0; i < Math.min(100, originalSize); i++) {
      list.pop();
    }
  }

  removeFromBeginning(list: DoubleLinkedList<string>): void {
    const originalSize = list.getLength();
    for (let i = 0; i < Math.min(100, originalSize); i++) {
      list.shift();
    }
  }

  convertToArray(list: DoubleLinkedList<string>): readonly string[] {
    return list.toArray();
  }

  map(list: DoubleLinkedList<string>): DoubleLinkedList<string> {
    return list.map((item) => `mapped-${item}`);
  }

  indexAccess(list: DoubleLinkedList<string>): string[] {
    const results: string[] = [];
    for (let i = 0; i < 100; i++) {
      results.push(list.get(i)!);
    }
    return results;
  }

  insertInMiddle(list: DoubleLinkedList<string>, middle: DoubleLinkedListNode<string>, data: string[]): void {
    for (let i = 0; i < 100; i++) {
      list.insertAfterNode(middle, `middle-${data[i]}`);
    }
  }

  removeFromMiddle(list: DoubleLinkedList<string>, middle: DoubleLinkedListNode<string>): void {
    for (let i = 0; i < 100; i++) {
      const nextNode = getNextNode(middle);

      list.remove(middle);

      if (nextNode === undefined) {
        break;
      }

      middle = nextNode;
    }
  }
}

/**
 * Benchmarks for JavaScript Arrays
 */
class ArrayBenchmarks implements Benchmarks<string[], number> {
  createAndPopulate(data: string[]): string[] {
    return [...data];
  }

  insertAtBeginning(data: string[]): string[] {
    const arr: string[] = [];
    for (const item of data) {
      arr.unshift(item);
    }
    return arr;
  }

  insertAtEnd(data: string[]): string[] {
    const arr: string[] = [];
    for (const item of data) {
      arr.push(item);
    }
    return arr;
  }

  traverse(arr: string[]): number {
    let count = 0;
    for (const _item of arr) {
      count++;
    }
    return count;
  }

  findItem(arr: string[], searchItem: string): string | undefined {
    return arr.find((item) => item === searchItem);
  }

  removeFromEnd(arr: string[]): void {
    for (let i = 0; i < Math.min(100, arr.length); i++) {
      arr.pop();
    }
  }

  removeFromBeginning(arr: string[]): void {
    for (let i = 0; i < Math.min(100, arr.length); i++) {
      arr.shift();
    }
  }

  convertToArray(arr: string[]): string[] {
    return [...arr];
  }

  map(arr: string[]): string[] {
    return arr.map((item) => `mapped-${item}`);
  }

  indexAccess(arr: string[]): string[] {
    const results: string[] = [];
    for (let i = 0; i < 100; i++) {
      results.push(arr[i]);
    }
    return results;
  }

  insertInMiddle(arr: string[], middle: number, data: string[]): void {
    for (let i = 0; i < 100; i++) {
      arr.splice(middle, 0, `middle-${data[i]}`);
    }
  }

  removeFromMiddle(arr: string[], middle: number): void {
    for (let i = 0; i < 100; i++) {
      arr.splice(middle, 1);

      if (middle >= arr.length) {
        break;
      }
    }
  }
}

class LinkedListWooormItem extends LinkedListItem {
  constructor(public readonly value: string) {
    super();
  }
}

/**
 * Benchmarks for linked-list (wooorm)
 */
class LinkedListWooormBenchmarks implements Benchmarks<LinkedListWooorm, LinkedListWooormItem> {
  createAndPopulate(data: string[]): LinkedListWooorm {
    const items = data.map((value) => {
      return new LinkedListWooormItem(value);
    });
    return new LinkedListWooorm(...items);
  }

  insertAtBeginning(data: string[]): LinkedListWooorm {
    const list = new LinkedListWooorm();
    for (const value of data) {
      list.prepend(new LinkedListWooormItem(value));
    }
    return list;
  }

  insertAtEnd(data: string[]): LinkedListWooorm {
    const list = new LinkedListWooorm();
    for (const value of data) {
      list.append(new LinkedListWooormItem(value));
    }
    return list;
  }

  traverse(list: LinkedListWooorm): number {
    let count = 0;
    for (const _item of list) {
      count++;
    }
    return count;
  }

  findItem(list: LinkedListWooorm, searchItem: string): string | undefined {
    let current = list.head as LinkedListWooormItem | null;
    let count = 0;
    while (current && count < list.size) {
      if (current.value === searchItem) {
        return current.value;
      }
      current = current.next as LinkedListWooormItem | null;
      count++;
    }
    return undefined;
  }

  removeFromEnd(list: LinkedListWooorm): void {
    for (let i = 0; i < 100 && list.tail; i++) {
      list.tail.detach();
    }
  }

  removeFromBeginning(list: LinkedListWooorm): void {
    for (let i = 0; i < 100 && list.head; i++) {
      list.head.detach();
    }
  }

  convertToArray(list: LinkedListWooorm): string[] {
    return (list.toArray() as LinkedListWooormItem[]).map((item) => item.value as string);
  }

  map(list: LinkedListWooorm): LinkedListWooorm {
    const result = new LinkedListWooorm();
    let current = list.head as LinkedListWooormItem | null;
    while (current !== null) {
      result.append(new LinkedListWooormItem(`mapped-${current.value}`));
      current = current.next as LinkedListWooormItem | null;
    }
    return result;
  }

  indexAccess(list: LinkedListWooorm): string[] {
    const results: string[] = [];
    let index = 0;
    while (index < 100) {
      let current = list.head as LinkedListWooormItem | null;

      let offset = 0;
      while (offset < index) {
        current = current!.next as LinkedListWooormItem | null;
        offset++;
      }

      results.push(current!.value);
      index++;
    }
    return results;
  }

  insertInMiddle(_list: LinkedListWooorm, middle: LinkedListWooormItem, data: string[]): void {
    for (let i = 0; i < 100; i++) {
      middle.append(new LinkedListWooormItem(`middle-${data[i]}`));
    }
  }

  removeFromMiddle(_list: LinkedListWooorm, middle: LinkedListWooormItem): void {
    for (let i = 0; i < 100; i++) {
      const next = middle.next;

      middle.detach();

      if (next === null) {
        break;
      }

      middle = next as LinkedListWooormItem;
    }
  }
}

/**
 * Benchmarks for dbly-linked-list
 */
class DblyLinkedListBenchmarks implements Benchmarks<LinkedListDbly, DblyNode> {
  createAndPopulate(data: string[]): LinkedListDbly {
    const list = new LinkedListDbly();
    for (const item of data) {
      list.insert(item);
    }
    return list;
  }

  insertAtBeginning(data: string[]): LinkedListDbly {
    const list = new LinkedListDbly();
    for (const item of data) {
      list.insertFirst(item);
    }
    return list;
  }

  insertAtEnd(data: string[]): LinkedListDbly {
    const list = new LinkedListDbly();
    for (const item of data) {
      list.insert(item);
    }
    return list;
  }

  traverse(list: LinkedListDbly): number {
    let count = 0;
    list.forEach(() => {
      count++;
    });
    return count;
  }

  findItem(list: LinkedListDbly, searchItem: string): string | undefined {
    return list.contains(searchItem) ? searchItem : undefined;
  }

  removeFromEnd(list: LinkedListDbly): void {
    for (let i = 0; i < Math.min(100, list.getSize()); i++) {
      if (!list.isEmpty()) {
        list.remove();
      }
    }
  }

  removeFromBeginning(list: LinkedListDbly): void {
    for (let i = 0; i < Math.min(100, list.getSize()); i++) {
      if (!list.isEmpty()) {
        list.removeFirst();
      }
    }
  }

  convertToArray(list: LinkedListDbly): string[] {
    return list.toArray().map((node) => node.valueOf() as string);
  }

  map(list: LinkedListDbly): LinkedListDbly {
    const newList = new LinkedListDbly();
    let cursor = list.getHeadNode();
    while (cursor !== null) {
      newList.insert(`mapped-${cursor.data.valueOf() as string}`);
      cursor = cursor.next;
    }
    return newList;
  }

  indexAccess(list: LinkedListDbly): string[] {
    const results: string[] = [];
    for (let i = 0; i < 100; i++) {
      results.push(list.findAt(i).data.valueOf() as string);
    }
    return results;
  }

  insertInMiddle(list: LinkedListDbly, middle: DblyNode, data: string[]): void {
    for (let i = 0; i < 100; i++) {
      list.insertAfter(middle, `middle-${data[i]}`);
    }
  }

  removeFromMiddle(list: LinkedListDbly, middle: DblyNode): void {
    for (let i = 0; i < 100; i++) {
      const next = middle.next;

      list.removeNode(middle);

      if (next === null) {
        break;
      }

      middle = next;
    }
  }
}

/**
 * Benchmarks for simple-double-linked-list
 */
class SimpleDoubleLinkedListBenchmarks implements Benchmarks<SimpleDoubleLinkedList<string>, ListIterator<string>> {
  createAndPopulate(data: string[]): SimpleDoubleLinkedList<string> {
    const list = new SimpleDoubleLinkedList<string>();
    for (const item of data) {
      list.AddBack(item);
    }
    return list;
  }

  insertAtBeginning(data: string[]): SimpleDoubleLinkedList<string> {
    const list = new SimpleDoubleLinkedList<string>();
    for (const item of data) {
      list.AddFront(item);
    }
    return list;
  }

  insertAtEnd(data: string[]): SimpleDoubleLinkedList<string> {
    const list = new SimpleDoubleLinkedList<string>();
    for (const item of data) {
      list.AddBack(item);
    }
    return list;
  }

  traverse(list: SimpleDoubleLinkedList<string>): number {
    let count = 0;
    const iter = list.Begin();
    while (!iter.IsAtEnd()) {
      count++;
      iter.Next();
    }
    return count;
  }

  findItem(list: SimpleDoubleLinkedList<string>, searchItem: string): string | undefined {
    const foundIterator = list.Find(searchItem);
    return foundIterator.Value();
  }

  removeFromEnd(list: SimpleDoubleLinkedList<string>): void {
    list.Remove(list.End());
  }

  removeFromBeginning(list: SimpleDoubleLinkedList<string>): void {
    list.Remove(list.Begin());
  }

  convertToArray(list: SimpleDoubleLinkedList<string>): string[] {
    const results = new Array<string>(list.Size());
    const iterator = list.Begin();
    let index = 0;
    while (!iterator.IsAtEnd()) {
      results[index] = iterator.Value();
      iterator.Next();
      index += 1;
    }
    return results;
  }

  map(list: SimpleDoubleLinkedList<string>): SimpleDoubleLinkedList<string> {
    const newList = new SimpleDoubleLinkedList<string>();
    const iterator = list.Begin();
    while (!iterator.IsAtEnd()) {
      newList.AddBack(`mapped-${iterator.Value()}`);
      iterator.Next();
    }
    return newList;
  }

  indexAccess(list: SimpleDoubleLinkedList<string>): string[] {
    const results: string[] = [];
    let index = 0;
    while (index < 100) {
      const iterator = list.Begin();

      let offset = 0;
      while (offset < index) {
        iterator.Next();
        offset++;
      }

      results.push(iterator.Value());
      index++;
    }
    return results;
  }

  insertInMiddle(list: SimpleDoubleLinkedList<string>, middle: ListIterator<string>, data: string[]): void {
    for (let i = 0; i < 100; i++) {
      list.InsertAfter(`middle-${data[i]}`, middle);
    }
  }

  removeFromMiddle(list: SimpleDoubleLinkedList<string>, middle: ListIterator<string>): void {
    for (let i = 0; i < 100; i++) {
      list.Remove(middle);

      middle.Next();

      if (middle.IsAtEnd()) {
        break;
      }
    }
  }
}

/**
 * Run a specific benchmark for all implementations
 */
function runBenchmark(name: string, size: number, testData: string[], benchmarkMethod: BenchmarkMethod): BenchmarkResults {
  console.log(`\n📊 ${name} (${size.toLocaleString()} items)`);
  console.log('─'.repeat(60));

  const results: BenchmarkResults = {};

  const doublellBenchmarks = new DoublellBenchmarks();
  const arrayBenchmarks = new ArrayBenchmarks();
  const linkedListWooormBenchmarks = new LinkedListWooormBenchmarks();
  const dblyLinkedListBenchmarks = new DblyLinkedListBenchmarks();
  const simpleDoubleLinkedListBenchmarks = new SimpleDoubleLinkedListBenchmarks();

  // doublell
  try {
    const time = measureTime(
      () => {
        const list = doublellBenchmarks.createAndPopulate(testData);
        const middle = list.getNodeAt(Math.floor(list.getLength() / 2));
        return { list, middle };
      },
      ({ list, middle }) => {
        benchmarkMethod(doublellBenchmarks, list, middle, testData);
      }
    );
    results.doublell = time;
  } catch (error) {
    results.doublell = `Error: ${(error as Error).message}`;
  }

  // JavaScript Array
  try {
    const time = measureTime(
      () => {
        const list = arrayBenchmarks.createAndPopulate(testData);
        const middle = Math.floor(list.length / 2);
        return { list, middle };
      },
      ({ list, middle }) => {
        benchmarkMethod(arrayBenchmarks, list, middle, testData);
      }
    );
    results.array = time;
  } catch (error) {
    results.array = `Error: ${(error as Error).message}`;
  }

  // linked-list (wooorm) - limit large datasets to prevent stack overflow
  try {
    const time = measureTime(
      () => {
        const list = linkedListWooormBenchmarks.createAndPopulate(testData);

        let middle = list.head;
        const middleIndex = Math.floor(list.size / 2);
        for (let i = 0; i < middleIndex; i += 1) {
          middle = middle?.next ?? null;
        }

        return { list, middle };
      },
      ({ list, middle }) => {
        benchmarkMethod(linkedListWooormBenchmarks, list, middle, testData);
      }
    );
    results['linked-list'] = time;
  } catch (error) {
    results['linked-list'] = `Error: ${(error as Error).message}`;
  }

  // dbly-linked-list
  try {
    const time = measureTime(
      () => {
        const list = dblyLinkedListBenchmarks.createAndPopulate(testData);
        const middle = list.findAt(Math.floor(list.size / 2));
        return { list, middle };
      },
      ({ list, middle }) => {
        benchmarkMethod(dblyLinkedListBenchmarks, list, middle, testData);
      }
    );
    results['dbly-linked-list'] = time;
  } catch (error) {
    results['dbly-linked-list'] = `Error: ${(error as Error).message}`;
  }

  // simple-double-linked-list
  try {
    const time = measureTime(
      () => {
        const list = simpleDoubleLinkedListBenchmarks.createAndPopulate(testData);

        const middle = list.Begin();
        const middleIndex = Math.floor(list.Size() / 2);
        for (let i = 0; i < middleIndex; i += 1) {
          middle.Next();
        }

        return { list, middle };
      },
      ({ list, middle }) => {
        benchmarkMethod(simpleDoubleLinkedListBenchmarks, list, middle, testData);
      }
    );
    results['simple-double-linked-list'] = time;
  } catch (error) {
    results['simple-double-linked-list'] = `Error: ${(error as Error).message}`;
  }

  // Sort results by time (fastest first)
  const sortedResults = Object.entries(results)
    .filter(([_, result]) => typeof result === 'number')
    .sort(([, a], [, b]) => (a as number) - (b as number));

  // Handle special results (with notes)
  const specialResults = Object.entries(results).filter(([_, result]) => typeof result === 'string' && result.includes('tested with'));

  // Display results
  sortedResults.forEach(([implementation, time], index) => {
    const emoji = index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : '   ';
    const multiplier = index === 0 ? '' : ` (${((time as number) / (sortedResults[0][1] as number)).toFixed(1)}x slower)`;
    console.log(`${emoji} ${implementation.padEnd(25)} ${formatTime(time as number).padStart(10)}${multiplier}`);
  });

  // Show special results (with notes)
  specialResults.forEach(([implementation, result]) => {
    console.log(`⚠️  ${implementation.padEnd(25)} ${result}`);
  });

  // Show errors
  Object.entries(results)
    .filter(([_, result]) => typeof result === 'string' && !result.includes('tested with'))
    .forEach(([implementation, error]) => {
      console.log(`❌  ${implementation.padEnd(25)} ${error}`);
    });

  return results;
}

/**
 * Main benchmarking function
 */
async function runBenchmarks(): Promise<void> {
  console.log('🚀 doublell Performance Benchmarks');
  console.log('=====================================\n');

  console.log('Comparing doublell against:');
  console.log('• Native JavaScript Arrays');
  console.log('• linked-list (by wooorm) - most popular npm package');
  console.log('• dbly-linked-list - popular JavaScript implementation');
  console.log('• simple-double-linked-list - TypeScript implementation');

  const sizes = [
    { name: 'Small', size: SMALL_SIZE },
    { name: 'Medium', size: MEDIUM_SIZE },
    { name: 'Large', size: LARGE_SIZE }
  ] as const;

  const allResults: Record<string, Record<string, BenchmarkResults>> = {};

  for (const { name, size } of sizes) {
    console.log(`\n🔄 Testing with ${name} dataset (${size.toLocaleString()} items)...`);
    console.log('='.repeat(60));

    const testData = createTestData(size);
    const sizeResults: Record<string, BenchmarkResults> = {};

    // Insertion at beginning
    sizeResults.insertBeginning = runBenchmark(`Insert at Beginning`, size, testData, (benchmarks, _list, _middle, data) => {
      benchmarks.insertAtBeginning(data);
    });

    // Insert in middle (100 items)
    sizeResults.insertMiddle = runBenchmark('Insert 100 items in Middle', size, testData, (benchmarks, list, middle, data) => {
      benchmarks.insertInMiddle(list, middle, data);
    });

    // Insertion at end
    sizeResults.insertEnd = runBenchmark(`Insert at End`, size, testData, (benchmarks, _list, _middle, data) => {
      benchmarks.insertAtEnd(data);
    });

    // Remove from beginning
    sizeResults.removeBeginning = runBenchmark('Remove 100 items from Beginning', size, testData, (benchmarks, list, _middle, _data) => {
      benchmarks.removeFromBeginning(list);
    });

    // Remove from middle (100 items)
    sizeResults.removeMiddle = runBenchmark('Remove 100 items from Middle', size, testData, (benchmarks, list, middle, _data) => {
      benchmarks.removeFromMiddle(list, middle);
    });

    // Remove from end
    sizeResults.removeEnd = runBenchmark('Remove 100 items from End', size, testData, (benchmarks, list, _middle, _data) => {
      benchmarks.removeFromEnd(list);
    });

    // Index access (first 100 items)
    sizeResults.indexAccess = runBenchmark('Index Access first 100 items', size, testData, (benchmarks, list, _middle, _data) => {
      benchmarks.indexAccess(list);
    });

    // Find item (search for middle item)
    const searchItem = testData[Math.floor(size / 2)];
    sizeResults.find = runBenchmark('Find Item (middle)', size, testData, (benchmarks, list, _middle, _data) => {
      benchmarks.findItem(list, searchItem);
    });

    // Traversal
    sizeResults.traverse = runBenchmark('Full Traversal', size, testData, (benchmarks, list, _middle, _data) => {
      benchmarks.traverse(list);
    });

    // Map operation
    sizeResults.map = runBenchmark('Map Operation', size, testData, (benchmarks, list, _middle, _data) => {
      benchmarks.map(list);
    });

    // Convert to array
    sizeResults.toArray = runBenchmark('Convert to Array', size, testData, (benchmarks, list, _middle, _data) => {
      benchmarks.convertToArray(list);
    });

    allResults[name] = sizeResults;
  }

  // Generate summary table
  console.log('\n\n📋 Summary Table');
  console.log('===========================\n');

  console.log('| Operation | doublell | Array | linked-list | dbly-linked-list | simple-double-linked-list |');
  console.log('|-----------|----------|-------|-------------|------------------|---------------------------|');

  const operations = [
    { key: 'insertBeginning', name: `Insert ${MEDIUM_SIZE} Items at Beginning` },
    { key: 'insertMiddle', name: `Insert ${MEDIUM_SIZE} Items in Middle` },
    { key: 'insertEnd', name: `Insert ${MEDIUM_SIZE} Items at End` },
    { key: 'removeBeginning', name: `Remove 100 Items from Beginning of ${MEDIUM_SIZE} Item List` },
    { key: 'removeMiddle', name: `Remove 100 Items from Middle of ${MEDIUM_SIZE} Item List` },
    { key: 'removeEnd', name: `Remove 100 Items from End of ${MEDIUM_SIZE} Item List` },
    { key: 'indexAccess', name: `Index Access First 100 Items of ${MEDIUM_SIZE} Item List` },
    { key: 'find', name: `Find Item in ${MEDIUM_SIZE} Item List` },
    { key: 'traverse', name: `Full Traversal of ${MEDIUM_SIZE} Item List` },
    { key: 'map', name: `Full Map Operation on ${MEDIUM_SIZE} Item List` },
    { key: 'toArray', name: `Convert ${MEDIUM_SIZE} Item List to Array` }
  ] as const;

  // Use Medium size results for the summary
  const mediumResults = allResults.Medium;

  operations.forEach(({ key, name }) => {
    const results = mediumResults[key];

    const implementations = ['doublell', 'array', 'linked-list', 'dbly-linked-list', 'simple-double-linked-list'] as const;

    // Get valid times and sort to determine rankings
    const validResults = implementations
      .map((impl) => ({ impl, time: results[impl] }))
      .filter(({ time }) => typeof time === 'number')
      .sort((a, b) => (a.time as number) - (b.time as number));

    // Create ranking map
    const rankings = new Map<string, number>();
    validResults.forEach(({ impl }, index) => {
      rankings.set(impl, index);
    });

    const times = implementations.map((impl) => {
      const time = results[impl];
      if (typeof time === 'number') {
        const ranking = rankings.get(impl);
        let medal = '';
        if (ranking === 0) medal = '🥇 ';
        else if (ranking === 1) medal = '🥈 ';
        else if (ranking === 2) medal = '🥉 ';
        return medal + formatTime(time);
      }
      return 'N/A';
    });

    console.log(`| ${name} | ${times.join(' | ')} |`);
  });
}

// Run the benchmarks
runBenchmarks().catch(console.error);
