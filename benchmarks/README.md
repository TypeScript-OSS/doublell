# doublell Benchmarks

This directory contains the performance benchmarking suite for doublell.

## Structure

The benchmarks are organized as a separate package to:
- Use the production build of doublell (rather than source files)
- Isolate benchmark dependencies from the main package
- Provide a clean testing environment

## Running Benchmarks

From the main doublell directory:
```bash
yarn benchmark
```

Or directly from this directory:
```bash
cd benchmarks
yarn benchmark
```

## Dependencies

The benchmark suite compares doublell against:
- Native JavaScript Arrays
- `linked-list` (by wooorm) - most popular npm package
- `dbly-linked-list` - popular JavaScript implementation  
- `simple-double-linked-list` - TypeScript implementation

## Results

The benchmark tests various operations across different data sizes (1K, 10K, 100K items) and reports:
- Execution times
- Performance rankings
- Relative performance multipliers

Operations tested:
- Insert at beginning/end/middle
- Remove from beginning/end/middle
- Full traversal
- Find operations
- Index access
- Map operations
- Array conversion