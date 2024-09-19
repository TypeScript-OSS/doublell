import { DoubleLinkedList } from '../index.js';

describe('DoubleLinkedList', () => {
  it('initializing with values should work', () => {
    const list = new DoubleLinkedList<number>(1, 2, 3);
    list.append(4);
    list.append(5);
    const node3 = list.append(6);
    expect(list.getLength()).toEqual(6);
    expect(list.getHead()?.value).toEqual(1);
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
    expect(node1.previousNode).toBeUndefined();
    expect(node2.previousNode).toBe(node1);
    expect(node3.previousNode).toBe(node2);
    expect(node1.nextNode).toBe(node2);
    expect(node2.nextNode).toBe(node3);
    expect(node3.nextNode).toBeUndefined();
  });

  it('prepending should work', () => {
    const list = new DoubleLinkedList<number>();
    const node3 = list.prepend(3);
    const node2 = list.prepend(2);
    const node1 = list.prepend(1);
    expect(list.getLength()).toEqual(3);
    expect(list.getHead()).toBe(node1);
    expect(list.getTail()).toBe(node3);
    expect(node1.previousNode).toBeUndefined();
    expect(node2.previousNode).toBe(node1);
    expect(node3.previousNode).toBe(node2);
    expect(node1.nextNode).toBe(node2);
    expect(node2.nextNode).toBe(node3);
    expect(node3.nextNode).toBeUndefined();
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
    expect(node1.previousNode).toBeUndefined();
    expect(node2.previousNode).toBe(node1);
    expect(node2_5?.previousNode).toBe(node2);
    expect(node3.previousNode).toBe(node2_5);
    expect(node1.nextNode).toBe(node2);
    expect(node2.nextNode).toBe(node2_5);
    expect(node2_5?.nextNode).toBe(node3);
    expect(node3.nextNode).toBeUndefined();

    const node1_5 = list.insertAfterNode(node1, 1.5);
    expect(list.getLength()).toEqual(5);
    expect(list.getHead()).toBe(node1);
    expect(list.getTail()).toBe(node3);
    expect(node1.previousNode).toBeUndefined();
    expect(node1_5?.previousNode).toBe(node1);
    expect(node2.previousNode).toBe(node1_5);
    expect(node1.nextNode).toBe(node1_5);
    expect(node1_5?.nextNode).toBe(node2);
    expect(node2.nextNode).toBe(node2_5);

    const node3_5 = list.insertAfterNode(node3, 3.5);
    expect(list.getLength()).toEqual(6);
    expect(list.getHead()).toBe(node1);
    expect(list.getTail()).toBe(node3_5);
    expect(node2_5?.previousNode).toBe(node2);
    expect(node3.previousNode).toBe(node2_5);
    expect(node3_5?.previousNode).toBe(node3);
    expect(node2_5?.nextNode).toBe(node3);
    expect(node3.nextNode).toBe(node3_5);
    expect(node3_5?.nextNode).toBeUndefined();
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
    expect(node1.previousNode).toBeUndefined();
    expect(node1_5?.previousNode).toBe(node1);
    expect(node2.previousNode).toBe(node1_5);
    expect(node3.previousNode).toBe(node2);
    expect(node1.nextNode).toBe(node1_5);
    expect(node1_5?.nextNode).toBe(node2);
    expect(node2.nextNode).toBe(node3);
    expect(node3.nextNode).toBeUndefined();

    const node0_5 = list.insertBeforeNode(node1, 0.5);
    expect(list.getLength()).toEqual(5);
    expect(list.getHead()).toBe(node0_5);
    expect(list.getTail()).toBe(node3);
    expect(node0_5?.previousNode).toBeUndefined();
    expect(node1.previousNode).toBe(node0_5);
    expect(node1_5?.previousNode).toBe(node1);
    expect(node2.previousNode).toBe(node1_5);
    expect(node0_5?.nextNode).toBe(node1);
    expect(node1.nextNode).toBe(node1_5);
    expect(node1_5?.nextNode).toBe(node2);
    expect(node2.nextNode).toBe(node3);

    const node2_5 = list.insertBeforeNode(node3, 2.5);
    expect(list.getLength()).toEqual(6);
    expect(list.getHead()).toBe(node0_5);
    expect(list.getTail()).toBe(node3);
    expect(node2.previousNode).toBe(node1_5);
    expect(node2_5?.previousNode).toBe(node2);
    expect(node3.previousNode).toBe(node2_5);
    expect(node2.nextNode).toBe(node2_5);
    expect(node2_5?.nextNode).toBe(node3);
    expect(node3.nextNode).toBeUndefined();
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
    expect(node1.previousNode).toBeUndefined();
    expect(node2.previousNode).toBeUndefined();
    expect(node3.previousNode).toBe(node2);
    expect(node1.nextNode).toBeUndefined();
    expect(node2.nextNode).toBe(node3);
    expect(node3.nextNode).toBeUndefined();
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
    expect(node1.previousNode).toBeUndefined();
    expect(node2.previousNode).toBe(node1);
    expect(node3.previousNode).toBeUndefined();
    expect(node1.nextNode).toBe(node2);
    expect(node2.nextNode).toBeUndefined();
    expect(node3.nextNode).toBeUndefined();
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
    expect(node1.previousNode).toBeUndefined();
    expect(node2.previousNode).toBeUndefined();
    expect(node3.previousNode).toBe(node1);
    expect(node1.nextNode).toBe(node3);
    expect(node2.nextNode).toBeUndefined();
    expect(node3.nextNode).toBeUndefined();
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
});
