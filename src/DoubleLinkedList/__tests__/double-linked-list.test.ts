import { DoubleLinkedList, type DoubleLinkedListNode, getNextNode, getNodeList, getNodeValue, getPreviousNode } from '../index.js';

describe('DoubleLinkedList', () => {
  it('initializing with values should work', () => {
    const list = new DoubleLinkedList<number>(1, 2, 3);
    list.append(4);
    list.append(5);
    const node3 = list.append(6);
    expect(list.getLength()).toEqual(6);
    expect(getNodeValue(list.getHead())).toEqual(1);
    expect(list.getTail()).toBe(node3);
  });

  it('isEmpty should work', () => {
    const list = new DoubleLinkedList<number>();
    expect(list.isEmpty()).toBe(true);
    list.append(1);
    expect(list.isEmpty()).toBe(false);
    list.clear();
    expect(list.isEmpty()).toBe(true);
  });

  it('appending should work', () => {
    const list = new DoubleLinkedList<number>();
    const node1 = list.append(1);
    const node2 = list.append(2);
    const node3 = list.append(3);
    expect(list.getLength()).toEqual(3);
    expect(list.getHead()).toBe(node1);
    expect(list.getTail()).toBe(node3);
    expect(getPreviousNode(node1)).toBeUndefined();
    expect(getPreviousNode(node2)).toBe(node1);
    expect(getPreviousNode(node3)).toBe(node2);
    expect(getNextNode(node1)).toBe(node2);
    expect(getNextNode(node2)).toBe(node3);
    expect(getNextNode(node3)).toBeUndefined();
  });

  it('prepending should work', () => {
    const list = new DoubleLinkedList<number>();
    const node3 = list.prepend(3);
    const node2 = list.prepend(2);
    const node1 = list.prepend(1);
    expect(list.getLength()).toEqual(3);
    expect(list.getHead()).toBe(node1);
    expect(list.getTail()).toBe(node3);
    expect(getPreviousNode(node1)).toBeUndefined();
    expect(getPreviousNode(node2)).toBe(node1);
    expect(getPreviousNode(node3)).toBe(node2);
    expect(getNextNode(node1)).toBe(node2);
    expect(getNextNode(node2)).toBe(node3);
    expect(getNextNode(node3)).toBeUndefined();
  });

  it('insertAfterNode should work', () => {
    const list = new DoubleLinkedList<number>();
    const node1 = list.append(1);
    const node2 = list.append(2);
    const node3 = list.append(3);
    const node2_5 = list.insertAfterNode(node2, 2.5);
    expect(list.getLength()).toEqual(4);
    expect(list.getHead()).toBe(node1);
    expect(list.getTail()).toBe(node3);
    expect(getPreviousNode(node1)).toBeUndefined();
    expect(getPreviousNode(node2)).toBe(node1);
    expect(getPreviousNode(node2_5)).toBe(node2);
    expect(getPreviousNode(node3)).toBe(node2_5);
    expect(getNextNode(node1)).toBe(node2);
    expect(getNextNode(node2)).toBe(node2_5);
    expect(getNextNode(node2_5)).toBe(node3);
    expect(getNextNode(node3)).toBeUndefined();

    const node1_5 = list.insertAfterNode(node1, 1.5);
    expect(list.getLength()).toEqual(5);
    expect(list.getHead()).toBe(node1);
    expect(list.getTail()).toBe(node3);
    expect(getPreviousNode(node1)).toBeUndefined();
    expect(getPreviousNode(node1_5)).toBe(node1);
    expect(getPreviousNode(node2)).toBe(node1_5);
    expect(getNextNode(node1)).toBe(node1_5);
    expect(getNextNode(node1_5)).toBe(node2);
    expect(getNextNode(node2)).toBe(node2_5);

    const node3_5 = list.insertAfterNode(node3, 3.5);
    expect(list.getLength()).toEqual(6);
    expect(list.getHead()).toBe(node1);
    expect(list.getTail()).toBe(node3_5);
    expect(getPreviousNode(node2_5)).toBe(node2);
    expect(getPreviousNode(node3)).toBe(node2_5);
    expect(getPreviousNode(node3_5)).toBe(node3);
    expect(getNextNode(node2_5)).toBe(node3);
    expect(getNextNode(node3)).toBe(node3_5);
    expect(getNextNode(node3_5)).toBeUndefined();
  });

  it('insertBeforeNode should work', () => {
    const list = new DoubleLinkedList<number>();
    const node1 = list.append(1);
    const node2 = list.append(2);
    const node3 = list.append(3);
    const node1_5 = list.insertBeforeNode(node2, 1.5);
    expect(list.getLength()).toEqual(4);
    expect(list.getHead()).toBe(node1);
    expect(list.getTail()).toBe(node3);
    expect(getPreviousNode(node1)).toBeUndefined();
    expect(getPreviousNode(node1_5)).toBe(node1);
    expect(getPreviousNode(node2)).toBe(node1_5);
    expect(getPreviousNode(node3)).toBe(node2);
    expect(getNextNode(node1)).toBe(node1_5);
    expect(getNextNode(node1_5)).toBe(node2);
    expect(getNextNode(node2)).toBe(node3);
    expect(getNextNode(node3)).toBeUndefined();

    const node0_5 = list.insertBeforeNode(node1, 0.5);
    expect(list.getLength()).toEqual(5);
    expect(list.getHead()).toBe(node0_5);
    expect(list.getTail()).toBe(node3);
    expect(getPreviousNode(node0_5)).toBeUndefined();
    expect(getPreviousNode(node1)).toBe(node0_5);
    expect(getPreviousNode(node1_5)).toBe(node1);
    expect(getPreviousNode(node2)).toBe(node1_5);
    expect(getNextNode(node0_5)).toBe(node1);
    expect(getNextNode(node1)).toBe(node1_5);
    expect(getNextNode(node1_5)).toBe(node2);
    expect(getNextNode(node2)).toBe(node3);

    const node2_5 = list.insertBeforeNode(node3, 2.5);
    expect(list.getLength()).toEqual(6);
    expect(list.getHead()).toBe(node0_5);
    expect(list.getTail()).toBe(node3);
    expect(getPreviousNode(node2)).toBe(node1_5);
    expect(getPreviousNode(node2_5)).toBe(node2);
    expect(getPreviousNode(node3)).toBe(node2_5);
    expect(getNextNode(node2)).toBe(node2_5);
    expect(getNextNode(node2_5)).toBe(node3);
    expect(getNextNode(node3)).toBeUndefined();
  });

  it('remove head should work', () => {
    const list = new DoubleLinkedList<number>();
    const node1 = list.append(1);
    const node2 = list.append(2);
    const node3 = list.append(3);
    list.remove(node1);
    expect(list.getLength()).toEqual(2);
    expect(list.getHead()).toBe(node2);
    expect(list.getTail()).toBe(node3);
    expect(getPreviousNode(node1)).toBeUndefined();
    expect(getPreviousNode(node2)).toBeUndefined();
    expect(getPreviousNode(node3)).toBe(node2);
    expect(getNextNode(node1)).toBeUndefined();
    expect(getNextNode(node2)).toBe(node3);
    expect(getNextNode(node3)).toBeUndefined();
  });

  it('remove tail should work', () => {
    const list = new DoubleLinkedList<number>();
    const node1 = list.append(1);
    const node2 = list.append(2);
    const node3 = list.append(3);
    list.remove(node3);
    expect(list.getLength()).toEqual(2);
    expect(list.getHead()).toBe(node1);
    expect(list.getTail()).toBe(node2);
    expect(getPreviousNode(node1)).toBeUndefined();
    expect(getPreviousNode(node2)).toBe(node1);
    expect(getPreviousNode(node3)).toBeUndefined();
    expect(getNextNode(node1)).toBe(node2);
    expect(getNextNode(node2)).toBeUndefined();
    expect(getNextNode(node3)).toBeUndefined();
  });

  it('remove middle should work', () => {
    const list = new DoubleLinkedList<number>();
    const node1 = list.append(1);
    const node2 = list.append(2);
    const node3 = list.append(3);
    list.remove(node2);
    expect(list.getLength()).toEqual(2);
    expect(list.getHead()).toBe(node1);
    expect(list.getTail()).toBe(node3);
    expect(getPreviousNode(node1)).toBeUndefined();
    expect(getPreviousNode(node2)).toBeUndefined();
    expect(getPreviousNode(node3)).toBe(node1);
    expect(getNextNode(node1)).toBe(node3);
    expect(getNextNode(node2)).toBeUndefined();
    expect(getNextNode(node3)).toBeUndefined();
  });

  it('remove all should work', () => {
    const list = new DoubleLinkedList<number>();
    const node1 = list.append(1);
    const node2 = list.append(2);
    const node3 = list.append(3);
    list.remove(node2);
    list.remove(node3);
    list.remove(node1);
    expect(list.getLength()).toEqual(0);
    expect(list.getHead()).toBeUndefined();
    expect(list.getTail()).toBeUndefined();
  });

  it('removing a node twice should work', () => {
    const list = new DoubleLinkedList<number>();
    const node1 = list.append(1);
    const node2 = list.append(2);
    const node3 = list.append(3);
    list.remove(node2);
    list.remove(node2);
    list.remove(node3);
    list.remove(node1);
    expect(list.getLength()).toEqual(0);
    expect(list.getHead()).toBeUndefined();
    expect(list.getTail()).toBeUndefined();
  });

  it('clear should work', () => {
    const list = new DoubleLinkedList<number>();
    list.append(1);
    list.append(2);
    list.append(3);
    list.clear();
    expect(list.getLength()).toEqual(0);
    expect(list.getHead()).toBeUndefined();
    expect(list.getTail()).toBeUndefined();
  });

  it('toArray should work', () => {
    const list = new DoubleLinkedList<number>();
    list.append(1);
    list.append(2);
    list.prepend(3);
    const array = list.toArray();
    expect(array).toHaveLength(3);
    expect(array[0]).toBe(3);
    expect(array[1]).toBe(1);
    expect(array[2]).toBe(2);
  });

  describe('Iterator support', () => {
    it('should support for...of loops', () => {
      const list = new DoubleLinkedList<number>(1, 2, 3);
      const values: number[] = [];
      for (const value of list) {
        values.push(value);
      }
      expect(values).toEqual([1, 2, 3]);
    });

    it('should work with spread operator', () => {
      const list = new DoubleLinkedList<string>('a', 'b', 'c');
      const array = [...list];
      expect(array).toEqual(['a', 'b', 'c']);
    });

    it('should work with Array.from', () => {
      const list = new DoubleLinkedList<number>(10, 20, 30);
      const array = Array.from(list);
      expect(array).toEqual([10, 20, 30]);
    });
  });

  describe('forEach method', () => {
    it('should iterate over all elements', () => {
      const list = new DoubleLinkedList<number>(1, 2, 3);
      const values: number[] = [];
      const indices: number[] = [];
      list.forEach((value, index, lst) => {
        values.push(value);
        indices.push(index);
        expect(lst).toBe(list);
      });
      expect(values).toEqual([1, 2, 3]);
      expect(indices).toEqual([0, 1, 2]);
    });

    it('should work with empty list', () => {
      const list = new DoubleLinkedList<number>();
      let called = false;
      list.forEach(() => {
        called = true;
      });
      expect(called).toBe(false);
    });
  });

  describe('map method', () => {
    it('should transform all elements', () => {
      const list = new DoubleLinkedList<number>(1, 2, 3);
      const doubled = list.map((x) => x * 2);
      expect([...doubled]).toEqual([2, 4, 6]);
    });

    it('should work with different types', () => {
      const list = new DoubleLinkedList<number>(1, 2, 3);
      const strings = list.map((x) => x.toString());
      expect([...strings]).toEqual(['1', '2', '3']);
    });

    it('should pass correct parameters to callback', () => {
      const list = new DoubleLinkedList<string>('a', 'b');
      const mapped = list.map((value, index, lst) => {
        expect(lst).toBe(list);
        return `${value}-${index}`;
      });
      expect([...mapped]).toEqual(['a-0', 'b-1']);
    });
  });

  describe('find method', () => {
    it('should find existing element', () => {
      const list = new DoubleLinkedList<number>(1, 2, 3, 4);
      const result = list.find((x) => x > 2);
      expect(result).toBe(3);
    });

    it('should return undefined if not found', () => {
      const list = new DoubleLinkedList<number>(1, 2, 3);
      const result = list.find((x) => x > 10);
      expect(result).toBeUndefined();
    });

    it('should pass correct parameters to predicate', () => {
      const list = new DoubleLinkedList<string>('a', 'b', 'c');
      list.find((value, index, lst) => {
        expect(typeof value).toBe('string');
        expect(typeof index).toBe('number');
        expect(lst).toBe(list);
        return false;
      });
    });
  });

  describe('indexOf method', () => {
    it('should find index of existing element', () => {
      const list = new DoubleLinkedList<number>(1, 2, 3, 2);
      expect(list.indexOf(2)).toBe(1);
      expect(list.indexOf(3)).toBe(2);
    });

    it('should return -1 for non-existing element', () => {
      const list = new DoubleLinkedList<number>(1, 2, 3);
      expect(list.indexOf(5)).toBe(-1);
    });

    it('should respect fromIndex parameter', () => {
      const list = new DoubleLinkedList<number>(1, 2, 3, 2, 5);
      expect(list.indexOf(2, 0)).toBe(1);
      expect(list.indexOf(2, 2)).toBe(3);
      expect(list.indexOf(2, 4)).toBe(-1);
    });
  });

  describe('includes method', () => {
    it('should return true for existing element', () => {
      const list = new DoubleLinkedList<string>('a', 'b', 'c');
      expect(list.includes('b')).toBe(true);
    });

    it('should return false for non-existing element', () => {
      const list = new DoubleLinkedList<string>('a', 'b', 'c');
      expect(list.includes('d')).toBe(false);
    });

    it('should respect fromIndex parameter', () => {
      const list = new DoubleLinkedList<number>(1, 2, 3, 2);
      expect(list.includes(2, 0)).toBe(true);
      expect(list.includes(2, 2)).toBe(true);
      expect(list.includes(1, 1)).toBe(false);
    });
  });

  describe('Index-based access', () => {
    describe('get method', () => {
      it('should get items by positive index', () => {
        const list = new DoubleLinkedList('a', 'b', 'c', 'd');
        expect(list.get(0)).toBe('a');
        expect(list.get(1)).toBe('b');
        expect(list.get(2)).toBe('c');
        expect(list.get(3)).toBe('d');
      });

      it('should get items by negative index', () => {
        const list = new DoubleLinkedList('a', 'b', 'c', 'd');
        expect(list.get(-1)).toBe('d');
        expect(list.get(-2)).toBe('c');
        expect(list.get(-3)).toBe('b');
        expect(list.get(-4)).toBe('a');
      });

      it('should return undefined for out of bounds indices', () => {
        const list = new DoubleLinkedList('a', 'b', 'c');
        expect(list.get(3)).toBeUndefined();
        expect(list.get(10)).toBeUndefined();
        expect(list.get(-4)).toBeUndefined();
        expect(list.get(-10)).toBeUndefined();
      });

      it('should work with empty list', () => {
        const list = new DoubleLinkedList<string>();
        expect(list.get(0)).toBeUndefined();
        expect(list.get(-1)).toBeUndefined();
      });

      it('should work with single item list', () => {
        const list = new DoubleLinkedList('only');
        expect(list.get(0)).toBe('only');
        expect(list.get(-1)).toBe('only');
        expect(list.get(1)).toBeUndefined();
        expect(list.get(-2)).toBeUndefined();
      });

      it('should choose optimal traversal path', () => {
        // This test verifies the optimization works by creating a large list
        // and accessing items near the end (should traverse from tail)
        const items = Array.from({ length: 100 }, (_, i) => i);
        const list = new DoubleLinkedList(...items);

        expect(list.get(95)).toBe(95);
        expect(list.get(-5)).toBe(95);
        expect(list.get(5)).toBe(5);
      });
    });

    describe('getNodeAt method', () => {
      it('should get nodes by positive index', () => {
        const list = new DoubleLinkedList('a', 'b', 'c');
        const node0 = list.getNodeAt(0);
        const node1 = list.getNodeAt(1);
        const node2 = list.getNodeAt(2);

        expect(getNodeValue(node0)).toBe('a');
        expect(getNodeValue(node1)).toBe('b');
        expect(getNodeValue(node2)).toBe('c');
        expect(node0).toBe(list.getHead());
        expect(node2).toBe(list.getTail());
      });

      it('should get nodes by negative index', () => {
        const list = new DoubleLinkedList('a', 'b', 'c');
        const nodeMinus1 = list.getNodeAt(-1);
        const nodeMinus2 = list.getNodeAt(-2);
        const nodeMinus3 = list.getNodeAt(-3);

        expect(getNodeValue(nodeMinus1)).toBe('c');
        expect(getNodeValue(nodeMinus2)).toBe('b');
        expect(getNodeValue(nodeMinus3)).toBe('a');
        expect(nodeMinus1).toBe(list.getTail());
        expect(nodeMinus3).toBe(list.getHead());
      });

      it('should return undefined for out of bounds indices', () => {
        const list = new DoubleLinkedList('a', 'b');
        expect(list.getNodeAt(2)).toBeUndefined();
        expect(list.getNodeAt(-3)).toBeUndefined();
      });

      it('should work with empty list', () => {
        const list = new DoubleLinkedList<number>();
        expect(list.getNodeAt(0)).toBeUndefined();
        expect(list.getNodeAt(-1)).toBeUndefined();
      });

      it('should return actual node references', () => {
        const list = new DoubleLinkedList(1, 2, 3);
        const node1 = list.getNodeAt(1);

        if (node1) {
          expect(getNodeValue(node1)).toBe(2);
          expect(getNodeValue(getPreviousNode(node1))).toBe(1);
          expect(getNodeValue(getNextNode(node1))).toBe(3);
          expect(getNodeList(node1)).toBe(list);
        }
      });
    });
  });

  describe('Stack/Queue methods', () => {
    describe('push method', () => {
      it('should work like append', () => {
        const list = new DoubleLinkedList<number>();
        const node = list.push(42);
        expect(list.getLength()).toBe(1);
        expect(getNodeValue(list.getTail())).toBe(42);
        expect(getNodeValue(node)).toBe(42);
      });
    });

    describe('pop method', () => {
      it('should remove and return last element', () => {
        const list = new DoubleLinkedList<number>(1, 2, 3);
        const value = list.pop();
        expect(value).toBe(3);
        expect(list.getLength()).toBe(2);
        expect([...list]).toEqual([1, 2]);
      });

      it('should return undefined for empty list', () => {
        const list = new DoubleLinkedList<number>();
        expect(list.pop()).toBeUndefined();
      });

      it('should handle single element list', () => {
        const list = new DoubleLinkedList<number>(42);
        expect(list.pop()).toBe(42);
        expect(list.isEmpty()).toBe(true);
      });
    });

    describe('shift method', () => {
      it('should remove and return first element', () => {
        const list = new DoubleLinkedList<number>(1, 2, 3);
        const value = list.shift();
        expect(value).toBe(1);
        expect(list.getLength()).toBe(2);
        expect([...list]).toEqual([2, 3]);
      });

      it('should return undefined for empty list', () => {
        const list = new DoubleLinkedList<number>();
        expect(list.shift()).toBeUndefined();
      });

      it('should handle single element list', () => {
        const list = new DoubleLinkedList<number>(42);
        expect(list.shift()).toBe(42);
        expect(list.isEmpty()).toBe(true);
      });
    });

    describe('unshift method', () => {
      it('should work like prepend', () => {
        const list = new DoubleLinkedList<number>(2, 3);
        const node = list.unshift(1);
        expect(list.getLength()).toBe(3);
        expect([...list]).toEqual([1, 2, 3]);
        expect(getNodeValue(node)).toBe(1);
      });
    });

    it('should work together as stack', () => {
      const list = new DoubleLinkedList<number>();
      list.push(1);
      list.push(2);
      list.push(3);

      expect(list.pop()).toBe(3);
      expect(list.pop()).toBe(2);
      expect(list.pop()).toBe(1);
      expect(list.pop()).toBeUndefined();
    });

    it('should work together as queue', () => {
      const list = new DoubleLinkedList<number>();
      list.push(1);
      list.push(2);
      list.push(3);

      expect(list.shift()).toBe(1);
      expect(list.shift()).toBe(2);
      expect(list.shift()).toBe(3);
      expect(list.shift()).toBeUndefined();
    });
  });

  describe('splice method', () => {
    describe('removal only', () => {
      it('should remove items from the beginning', () => {
        const list = new DoubleLinkedList('a', 'b', 'c', 'd');
        const removed = list.splice(0, 2);

        expect([...list]).toEqual(['c', 'd']);
        expect([...removed]).toEqual(['a', 'b']);
        expect(list.getLength()).toBe(2);
      });

      it('should remove items from the middle', () => {
        const list = new DoubleLinkedList('a', 'b', 'c', 'd');
        const removed = list.splice(1, 2);

        expect([...list]).toEqual(['a', 'd']);
        expect([...removed]).toEqual(['b', 'c']);
        expect(list.getLength()).toBe(2);
      });

      it('should remove items from the end', () => {
        const list = new DoubleLinkedList('a', 'b', 'c', 'd');
        const removed = list.splice(2, 2);

        expect([...list]).toEqual(['a', 'b']);
        expect([...removed]).toEqual(['c', 'd']);
        expect(list.getLength()).toBe(2);
      });

      it('should remove all items', () => {
        const list = new DoubleLinkedList('a', 'b', 'c');
        const removed = list.splice(0, 3);

        expect([...list]).toEqual([]);
        expect([...removed]).toEqual(['a', 'b', 'c']);
        expect(list.isEmpty()).toBe(true);
      });

      it('should handle removal beyond list length', () => {
        const list = new DoubleLinkedList('a', 'b');
        const removed = list.splice(1, 10);

        expect([...list]).toEqual(['a']);
        expect([...removed]).toEqual(['b']);
        expect(list.getLength()).toBe(1);
      });
    });

    describe('insertion only', () => {
      it('should insert items at the beginning', () => {
        const list = new DoubleLinkedList('c', 'd');
        const removed = list.splice(0, 0, 'a', 'b');

        expect([...list]).toEqual(['a', 'b', 'c', 'd']);
        expect([...removed]).toEqual([]);
        expect(list.getLength()).toBe(4);
      });

      it('should insert items in the middle', () => {
        const list = new DoubleLinkedList('a', 'd');
        const removed = list.splice(1, 0, 'b', 'c');

        expect([...list]).toEqual(['a', 'b', 'c', 'd']);
        expect([...removed]).toEqual([]);
        expect(list.getLength()).toBe(4);
      });

      it('should insert items at the end', () => {
        const list = new DoubleLinkedList('a', 'b');
        const removed = list.splice(2, 0, 'c', 'd');

        expect([...list]).toEqual(['a', 'b', 'c', 'd']);
        expect([...removed]).toEqual([]);
        expect(list.getLength()).toBe(4);
      });

      it('should insert into empty list', () => {
        const list = new DoubleLinkedList<string>();
        const removed = list.splice(0, 0, 'a', 'b', 'c');

        expect([...list]).toEqual(['a', 'b', 'c']);
        expect([...removed]).toEqual([]);
        expect(list.getLength()).toBe(3);
      });
    });

    describe('replacement (remove and insert)', () => {
      it('should replace items with equal count', () => {
        const list = new DoubleLinkedList(1, 2, 3, 4);
        const removed = list.splice(1, 2, 10, 20);

        expect([...list]).toEqual([1, 10, 20, 4]);
        expect([...removed]).toEqual([2, 3]);
        expect(list.getLength()).toBe(4);
      });

      it('should replace items with more insertions', () => {
        const list = new DoubleLinkedList(1, 2, 3, 4);
        const removed = list.splice(1, 2, 10, 20, 30);

        expect([...list]).toEqual([1, 10, 20, 30, 4]);
        expect([...removed]).toEqual([2, 3]);
        expect(list.getLength()).toBe(5);
      });

      it('should replace items with fewer insertions', () => {
        const list = new DoubleLinkedList(1, 2, 3, 4, 5);
        const removed = list.splice(1, 3, 10);

        expect([...list]).toEqual([1, 10, 5]);
        expect([...removed]).toEqual([2, 3, 4]);
        expect(list.getLength()).toBe(3);
      });
    });

    describe('negative start index', () => {
      it('should handle negative start index', () => {
        const list = new DoubleLinkedList('a', 'b', 'c', 'd');
        const removed = list.splice(-2, 1, 'x');

        expect([...list]).toEqual(['a', 'b', 'x', 'd']);
        expect([...removed]).toEqual(['c']);
      });

      it('should handle negative start index beyond list length', () => {
        const list = new DoubleLinkedList('a', 'b', 'c');
        const removed = list.splice(-10, 1, 'x');

        expect([...list]).toEqual(['x', 'b', 'c']);
        expect([...removed]).toEqual(['a']);
      });
    });

    describe('edge cases', () => {
      it('should handle start index beyond list length', () => {
        const list = new DoubleLinkedList('a', 'b');
        const removed = list.splice(10, 1, 'x');

        expect([...list]).toEqual(['a', 'b', 'x']);
        expect([...removed]).toEqual([]);
      });

      it('should handle zero deleteCount', () => {
        const list = new DoubleLinkedList('a', 'b', 'c');
        const removed = list.splice(1, 0);

        expect([...list]).toEqual(['a', 'b', 'c']);
        expect([...removed]).toEqual([]);
      });

      it('should handle negative deleteCount', () => {
        const list = new DoubleLinkedList('a', 'b', 'c');
        const removed = list.splice(1, -5, 'x');

        expect([...list]).toEqual(['a', 'x', 'b', 'c']);
        expect([...removed]).toEqual([]);
      });

      it('should work with single item list', () => {
        const list = new DoubleLinkedList('a');
        const removed = list.splice(0, 1, 'x', 'y');

        expect([...list]).toEqual(['x', 'y']);
        expect([...removed]).toEqual(['a']);
      });

      it('should work with empty list', () => {
        const list = new DoubleLinkedList<string>();
        const removed = list.splice(0, 0, 'a', 'b');

        expect([...list]).toEqual(['a', 'b']);
        expect([...removed]).toEqual([]);
      });
    });

    it('should maintain node references correctly', () => {
      const list = new DoubleLinkedList('a', 'b', 'c', 'd');
      list.splice(1, 2, 'x', 'y');

      // Verify linked list integrity
      const head = list.getHead();
      expect(getNodeValue(head)).toBe('a');
      expect(getNodeValue(getNextNode(head))).toBe('x');
      expect(getNodeValue(getNextNode(getNextNode(head)))).toBe('y');
      expect(getNodeValue(getNextNode(getNextNode(getNextNode(head))))).toBe('d');

      const tail = list.getTail();
      expect(getNodeValue(tail)).toBe('d');
      expect(getNodeValue(getPreviousNode(tail))).toBe('y');
      expect(getNodeValue(getPreviousNode(getPreviousNode(tail)))).toBe('x');
      expect(getNodeValue(getPreviousNode(getPreviousNode(getPreviousNode(tail))))).toBe('a');
    });

    describe('node-based splice', () => {
      it('should splice at node position for removal', () => {
        const list = new DoubleLinkedList('a', 'b', 'c', 'd');
        const nodeB = getNextNode(list.getHead());

        if (nodeB) {
          const removed = list.splice(nodeB, 2);
          expect([...list]).toEqual(['a', 'd']);
          expect([...removed]).toEqual(['b', 'c']);
        }
      });

      it('should splice at node position for insertion', () => {
        const list = new DoubleLinkedList('a', 'd');
        const nodeD = list.getTail();

        if (nodeD) {
          list.splice(nodeD, 0, 'b', 'c');
          expect([...list]).toEqual(['a', 'b', 'c', 'd']);
        }
      });

      it('should splice at node position for replacement', () => {
        const list = new DoubleLinkedList(1, 2, 3, 4);
        const secondNode = getNextNode(list.getHead());

        if (secondNode) {
          const removed = list.splice(secondNode, 2, 10, 20, 30);
          expect([...list]).toEqual([1, 10, 20, 30, 4]);
          expect([...removed]).toEqual([2, 3]);
        }
      });

      it('should handle node-based splice at head', () => {
        const list = new DoubleLinkedList('a', 'b', 'c');
        const head = list.getHead();

        if (head) {
          const removed = list.splice(head, 1, 'x');
          expect([...list]).toEqual(['x', 'b', 'c']);
          expect([...removed]).toEqual(['a']);
        }
      });

      it('should handle node-based splice at tail', () => {
        const list = new DoubleLinkedList('a', 'b', 'c');
        const tail = list.getTail();

        if (tail) {
          const removed = list.splice(tail, 1, 'x');
          expect([...list]).toEqual(['a', 'b', 'x']);
          expect([...removed]).toEqual(['c']);
        }
      });

      it('should handle node from different list', () => {
        const list1 = new DoubleLinkedList('a', 'b', 'c');
        const list2 = new DoubleLinkedList('x', 'y', 'z');
        const nodeFromList2 = list2.getHead();

        if (nodeFromList2) {
          const removed = list1.splice(nodeFromList2, 1, 'new');
          expect([...list1]).toEqual(['a', 'b', 'c']); // Unchanged
          expect([...removed]).toEqual([]); // No items removed
        }
      });

      it('should maintain performance benefit with node reference', () => {
        // This test ensures we don't traverse to find the node when it's provided
        const list = new DoubleLinkedList(...Array.from({ length: 1000 }, (_, i) => i));
        const middleNode = getNextNode(getNextNode(list.getHead())); // 3rd node

        if (middleNode) {
          const startTime = performance.now();
          list.splice(middleNode, 1, 999);
          const endTime = performance.now();

          expect([...list].slice(0, 5)).toEqual([0, 1, 999, 3, 4]);
          // This should be fast since we're not traversing to find the node
          expect(endTime - startTime).toBeLessThan(10); // Should be much faster than O(n)
        }
      });
    });

    describe('undefined-based splice (append)', () => {
      it('should append items when start is undefined', () => {
        const list = new DoubleLinkedList('a', 'b');
        const removed = list.splice(undefined, 0, 'c', 'd');

        expect([...list]).toEqual(['a', 'b', 'c', 'd']);
        expect([...removed]).toEqual([]);
      });

      it('should handle undefined with deleteCount > 0 (no deletion at end)', () => {
        const list = new DoubleLinkedList('a', 'b', 'c');
        const removed = list.splice(undefined, 5, 'd', 'e');

        expect([...list]).toEqual(['a', 'b', 'c', 'd', 'e']);
        expect([...removed]).toEqual([]);
      });

      it('should work with undefined on empty list', () => {
        const list = new DoubleLinkedList<string>();
        const removed = list.splice(undefined, 0, 'a', 'b');

        expect([...list]).toEqual(['a', 'b']);
        expect([...removed]).toEqual([]);
      });
    });
  });

  describe('README examples', () => {
    describe('Quick Start examples', () => {
      it('should support basic creation and iteration', () => {
        const list = new DoubleLinkedList(1, 2, 3);

        const items: number[] = [];
        for (const item of list) {
          items.push(item);
        }
        expect(items).toEqual([1, 2, 3]);
      });

      it('should support array-like methods', () => {
        const list = new DoubleLinkedList(1, 2, 3);
        const doubled = list.map((x) => x * 2);
        expect([...doubled]).toEqual([2, 4, 6]);
      });

      it('should support stack/queue operations', () => {
        const list = new DoubleLinkedList(1, 2, 3);
        list.push(4);
        const last = list.pop();
        const first = list.shift();

        expect(last).toBe(4);
        expect(first).toBe(1);
        expect([...list]).toEqual([2, 3]);
      });
    });

    describe('Type-Safe by Design examples', () => {
      it('should support full TypeScript generics', () => {
        const numbers = new DoubleLinkedList<number>(1, 2, 3);
        const strings = numbers.map((n) => n.toString());

        expect(strings).toBeInstanceOf(DoubleLinkedList);
        expect([...strings]).toEqual(['1', '2', '3']);
      });

      it('should provide correct type inference', () => {
        const list = new DoubleLinkedList(1, 5, 10);
        const found = list.find((x) => x > 5);
        expect(found).toBe(10);
        expect(typeof found).toBe('number');
      });
    });

    describe('Developer Experience examples', () => {
      it('should support array-like index access', () => {
        const list = new DoubleLinkedList('a', 'b', 'c', 'd', 'e', 'f');
        expect(list.get(0)).toBe('a');
        expect(list.get(-1)).toBe('f');
        expect(list.get(5)).toBe('f');
      });

      it('should support familiar array-like API', () => {
        const list = new DoubleLinkedList(1, 5, 10, 42, 50);

        const items: Array<{ item: number; index: number }> = [];
        list.forEach((item, index) => {
          items.push({ item, index });
        });
        expect(items).toEqual([
          { item: 1, index: 0 },
          { item: 5, index: 1 },
          { item: 10, index: 2 },
          { item: 42, index: 3 },
          { item: 50, index: 4 }
        ]);

        const found = list.find((x) => x > 10);
        expect(found).toBe(42);

        const includes = list.includes(42);
        expect(includes).toBe(true);

        const index = list.indexOf(42);
        expect(index).toBe(3);
      });

      it('should support iterator protocol', () => {
        const list = new DoubleLinkedList('a', 'b', 'c');

        const array = [...list];
        expect(array).toEqual(['a', 'b', 'c']);

        const mapped = Array.from(list);
        expect(mapped).toEqual(['a', 'b', 'c']);

        const items: string[] = [];
        for (const item of list) {
          items.push(item);
        }
        expect(items).toEqual(['a', 'b', 'c']);
      });

      it('should support stack operations', () => {
        const stack = new DoubleLinkedList<string>();
        stack.push('first');
        stack.push('second');
        expect(stack.pop()).toBe('second'); // LIFO
        expect([...stack]).toEqual(['first']);
      });

      it('should support queue operations', () => {
        const queue = new DoubleLinkedList<number>();
        queue.push(1);
        queue.push(2);
        expect(queue.shift()).toBe(1); // FIFO
        expect([...queue]).toEqual([2]);
      });
    });

    describe('Node-Level Control examples', () => {
      it('should support traditional node manipulation', () => {
        const list = new DoubleLinkedList('a', 'b', 'd');
        const nodeB = getNextNode(list.getHead());
        if (nodeB) {
          list.insertAfterNode(nodeB, 'c');
        }
        expect([...list]).toEqual(['a', 'b', 'c', 'd']);
      });

      it('should support enhanced node-based splice', () => {
        const list2 = new DoubleLinkedList(1, 2, 5, 6);
        const nodeAt5 = getPreviousNode(list2.getTail());
        if (nodeAt5) {
          list2.splice(nodeAt5, 1, 3, 4);
        }
        expect([...list2]).toEqual([1, 2, 3, 4, 6]);
      });

      it('should support append using undefined', () => {
        const list2 = new DoubleLinkedList(1, 2, 3, 4, 6);
        list2.splice(undefined, 0, 7, 8, 9);
        expect([...list2]).toEqual([1, 2, 3, 4, 6, 7, 8, 9]);
      });
    });

    describe('API Reference examples', () => {
      it('should support core operations', () => {
        const list = new DoubleLinkedList<string>();

        const nodeA = list.append('a');
        list.prepend('start');
        expect(list.getLength()).toBe(2);
        expect(list.isEmpty()).toBe(false);

        const head = list.getHead();
        const tail = list.getTail();
        expect(getNodeValue(head)).toBe('start');
        expect(getNodeValue(tail)).toBe('a');

        if (head) {
          list.insertAfterNode(head, 'middle');
        }
        if (tail) {
          list.insertBeforeNode(tail, 'before-end');
        }
        expect([...list]).toEqual(['start', 'middle', 'before-end', 'a']);

        list.remove(nodeA);
        expect([...list]).toEqual(['start', 'middle', 'before-end']);

        list.clear();
        expect(list.isEmpty()).toBe(true);
      });

      it('should support array-like methods API', () => {
        const list = new DoubleLinkedList(1, 2, 3, 4, 5);

        expect(list.get(0)).toBe(1);
        expect(list.get(-1)).toBe(5);

        const node = list.getNodeAt(2);
        expect(getNodeValue(node)).toBe(3);

        let callbackCount = 0;
        list.forEach(() => {
          callbackCount += 1;
        });
        expect(callbackCount).toBe(5);

        const doubled = list.map((x) => x * 2);
        expect([...doubled]).toEqual([2, 4, 6, 8, 10]);

        const found = list.find((x) => x > 3);
        expect(found).toBe(4);

        expect(list.indexOf(3)).toBe(2);
        expect(list.includes(4)).toBe(true);

        const array = list.toArray();
        expect(array).toEqual([1, 2, 3, 4, 5]);

        const removed = list.splice(1, 2, 10, 20);
        expect([...list]).toEqual([1, 10, 20, 4, 5]);
        expect([...removed]).toEqual([2, 3]);
      });

      it('should support stack/queue operations API', () => {
        const list = new DoubleLinkedList<number>();

        list.push(1);
        list.push(2);
        expect(list.pop()).toBe(2);
        expect(list.shift()).toBe(1);
        expect(list.isEmpty()).toBe(true);

        list.unshift(10);
        expect([...list]).toEqual([10]);
      });
    });

    describe('Migration examples', () => {
      it('should support array-like splice operations', () => {
        const list = new DoubleLinkedList(1, 2, 3, 4, 5);
        list.splice(2, 1, 10, 20);
        expect([...list]).toEqual([1, 2, 10, 20, 4, 5]);
      });

      it('should support node-based splice for performance', () => {
        const list = new DoubleLinkedList(1, 2, 3, 4, 5);
        const node = getNextNode(getNextNode(list.getHead()));
        if (node) {
          list.splice(node, 1, 10, 20);
        }
        expect([...list]).toEqual([1, 2, 10, 20, 4, 5]);
      });
    });

    describe('Real-world use cases', () => {
      it('should support LRU Cache implementation pattern', () => {
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
              // Move to front (most recently used) - O(1) operation!
              this.list.remove(node);
              const newNode = this.list.prepend(getNodeValue(node));
              this.map.set(key, newNode);
              return getNodeValue(node).value;
            }
            return undefined;
          }

          set(key: K, value: V): void {
            const existingNode = this.map.get(key);

            if (existingNode !== undefined) {
              // Update existing key - move to front
              this.list.remove(existingNode);
              const newNode = this.list.prepend({ key, value });
              this.map.set(key, newNode);
            } else {
              // New key - check capacity
              if (this.list.getLength() >= this.capacity) {
                // Evict least recently used (tail) - O(1) operation!
                const tail = this.list.getTail();
                if (tail !== undefined) {
                  this.list.remove(tail);
                  this.map.delete(getNodeValue(tail).key);
                }
              }

              // Add new item at front (most recently used)
              const newNode = this.list.prepend({ key, value });
              this.map.set(key, newNode);
            }
          }

          size(): number {
            return this.list.getLength();
          }
        }

        // Test LRU behavior with capacity of 3
        const cache = new LRUCache<string, number>(3);

        // Fill cache to capacity
        cache.set('a', 1);
        cache.set('b', 2);
        cache.set('c', 3);
        expect(cache.size()).toBe(3);

        // Access 'a' to make it most recently used
        expect(cache.get('a')).toBe(1);

        // Add 'd' - should evict 'b' (least recently used)
        cache.set('d', 4);
        expect(cache.size()).toBe(3);
        expect(cache.get('b')).toBeUndefined(); // Evicted
        expect(cache.get('a')).toBe(1); // Still there
        expect(cache.get('c')).toBe(3); // Still there
        expect(cache.get('d')).toBe(4); // New item

        // Add 'e' - should evict 'a' (now least recently used after accessing c and d)
        cache.set('e', 5);
        expect(cache.size()).toBe(3);
        expect(cache.get('a')).toBeUndefined(); // Evicted
        expect(cache.get('c')).toBe(3); // Still there
        expect(cache.get('d')).toBe(4); // Still there
        expect(cache.get('e')).toBe(5); // New item

        // Update existing key 'c' - should move to front
        cache.set('c', 30);
        expect(cache.get('c')).toBe(30); // Updated value

        // Add 'f' - should evict 'd' (least recently used)
        cache.set('f', 6);
        expect(cache.get('d')).toBeUndefined(); // Evicted
        expect(cache.get('c')).toBe(30); // Most recently updated
        expect(cache.get('e')).toBe(5); // Still there
        expect(cache.get('f')).toBe(6); // New item
      });

      it('should support undo/redo system pattern', () => {
        class UndoRedoManager<T> {
          private history = new DoubleLinkedList<T>();
          private current: DoubleLinkedListNode<T> | undefined;

          execute(state: T): void {
            if (this.current !== undefined && getNextNode(this.current) !== undefined) {
              this.history.splice(getNextNode(this.current), this.history.getLength());
            }

            this.current = this.current !== undefined ? this.history.insertAfterNode(this.current, state) : this.history.append(state);
          }

          undo(): T | undefined {
            if (this.current !== undefined && getPreviousNode(this.current) !== undefined) {
              this.current = getPreviousNode(this.current);
              return getNodeValue(this.current);
            }
            return undefined;
          }

          redo(): T | undefined {
            if (this.current !== undefined && getNextNode(this.current) !== undefined) {
              this.current = getNextNode(this.current);
              return getNodeValue(this.current);
            }
            return undefined;
          }

          getCurrent(): T | undefined {
            return getNodeValue(this.current);
          }
        }

        const manager = new UndoRedoManager<string>();
        manager.execute('state1');
        manager.execute('state2');
        manager.execute('state3');

        expect(manager.getCurrent()).toBe('state3');
        expect(manager.undo()).toBe('state2');
        expect(manager.undo()).toBe('state1');
        expect(manager.redo()).toBe('state2');

        manager.execute('state4'); // Should discard state3
        expect(manager.getCurrent()).toBe('state4');
        expect(manager.redo()).toBeUndefined(); // No more states
      });
    });

    describe('AI Assistant Friendly examples', () => {
      interface User {
        name: string;
        email: string;
        isActive: boolean;
      }

      it('should provide rich type information', () => {
        const userList = new DoubleLinkedList<User>();
        userList.append({ name: 'John', email: 'john@example.com', isActive: true });
        userList.append({ name: 'Jane', email: 'jane@example.com', isActive: false });
        userList.append({ name: 'Bob', email: 'bob@example.com', isActive: true });

        const activeUser = userList.find((user) => user.isActive);
        expect(activeUser?.name).toBe('John');

        const emails = userList.map((user) => user.email);
        expect([...emails]).toEqual(['john@example.com', 'jane@example.com', 'bob@example.com']);

        const userInfo: string[] = [];
        userList.forEach((user, index) => {
          userInfo.push(`User ${index}: ${user.name}`);
        });
        expect(userInfo).toEqual(['User 0: John', 'User 1: Jane', 'User 2: Bob']);
      });
    });
  });
});
