#!/usr/bin/env tsx

/**
 * Analysis of doublell's traversal performance vs other methods
 */

import { performance } from 'perf_hooks';
import { DoubleLinkedList } from 'doublell';

const TEST_SIZE = 10000;
const ITERATIONS = 100;

function measureTime(fn: () => void, iterations: number = 1): number {
  const times: number[] = [];
  
  for (let i = 0; i < iterations; i++) {
    const start = performance.now();
    fn();
    const end = performance.now();
    times.push(end - start);
  }
  
  // Return average time, excluding first run (warmup)
  const validTimes = times.slice(1);
  return validTimes.length > 0 ? validTimes.reduce((a, b) => a + b) / validTimes.length : times[0];
}

function formatTime(ms: number): string {
  if (ms < 1) return `${(ms * 1000).toFixed(2)}μs`;
  if (ms < 1000) return `${ms.toFixed(2)}ms`;
  return `${(ms / 1000).toFixed(2)}s`;
}

// Create test data
const testData = Array.from({ length: TEST_SIZE }, (_, i) => `item-${i}`);
const list = new DoubleLinkedList(...testData);
const array = [...testData];

console.log(`🔍 Traversal Performance Analysis (${TEST_SIZE.toLocaleString()} items, ${ITERATIONS} iterations)\n`);

// Test 1: Iterator Protocol (for...of)
const iteratorTime = measureTime(() => {
  let count = 0;
  for (const item of list) {
    count++;
  }
  return count;
}, ITERATIONS);

// Test 2: forEach method
const forEachTime = measureTime(() => {
  let count = 0;
  list.forEach(() => {
    count++;
  });
  return count;
}, ITERATIONS);

// Test 3: Manual node traversal
const manualTime = measureTime(() => {
  let count = 0;
  let current = list.getHead();
  while (current !== undefined) {
    count++;
    current = current[3]; // Next node
  }
  return count;
}, ITERATIONS);

// Test 4: Array for comparison
const arrayTime = measureTime(() => {
  let count = 0;
  for (const item of array) {
    count++;
  }
  return count;
}, ITERATIONS);

// Test 5: Array forEach for comparison  
const arrayForEachTime = measureTime(() => {
  let count = 0;
  array.forEach(() => {
    count++;
  });
  return count;
}, ITERATIONS);

console.log('📊 Traversal Methods Comparison');
console.log('─'.repeat(50));
console.log(`🥇 Array for...of:           ${formatTime(arrayTime)}`);
console.log(`🥈 Array forEach:            ${formatTime(arrayForEachTime)} (${(arrayForEachTime/arrayTime).toFixed(1)}x slower)`);
console.log(`🥉 Manual node traversal:    ${formatTime(manualTime)} (${(manualTime/arrayTime).toFixed(1)}x slower)`);
console.log(`   doublell forEach:         ${formatTime(forEachTime)} (${(forEachTime/arrayTime).toFixed(1)}x slower)`);
console.log(`   doublell for...of:        ${formatTime(iteratorTime)} (${(iteratorTime/arrayTime).toFixed(1)}x slower)`);

console.log('\n💡 Analysis:');
console.log('• Iterator protocol overhead: function call per iteration');
console.log('• forEach method overhead: callback function invocation');  
console.log('• Manual traversal: direct tuple access, minimal overhead');
console.log('• Arrays: highly optimized native iteration');

console.log('\n🔬 Overhead Breakdown:');
const iteratorOverhead = iteratorTime - manualTime;
const forEachOverhead = forEachTime - manualTime;

console.log(`• Iterator protocol overhead: ${formatTime(iteratorOverhead)} (${((iteratorOverhead/iteratorTime)*100).toFixed(1)}% of total time)`);
console.log(`• forEach method overhead: ${formatTime(forEachOverhead)} (${((forEachOverhead/forEachTime)*100).toFixed(1)}% of total time)`);

console.log('\n⚡ Performance Recommendations:');
if (iteratorTime < forEachTime) {
  console.log('• Use for...of loops for best doublell traversal performance');
} else {
  console.log('• Use forEach method for best doublell traversal performance');
}

const efficiency = (manualTime / arrayTime) * 100;
console.log(`• doublell's raw traversal efficiency: ${efficiency.toFixed(1)}% of Array performance`);

if (efficiency < 50) {
  console.log('• Consider optimizations: tuple access patterns, memory layout');
} else if (efficiency < 80) {
  console.log('• Performance is reasonable for a linked list structure');  
} else {
  console.log('• Excellent performance for a linked list!');
}