# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a minimal TypeScript library providing a double linked list data structure for both browsers and Node.js. The library is published to npm as `doublell` and provides CommonJS, ES Module, and TypeScript declaration files.

## Development Commands

### Building
- `yarn build` - Full build process (TypeScript compilation + esbuild processing)
- `yarn build:dev` - Development build with local package setup

### Testing
- `yarn test` - Run all tests (circular dependency check + unit tests)
- `yarn test:unit-tests` - Run Jest unit tests with coverage
- `yarn test:check-circular-dependencies` - Check for circular dependencies using madge

### Linting and Quality
- `yarn lint` - Run ESLint on TypeScript source files (zero warnings policy)
- `yarn test:audit` - Run security audit (fails on moderate+ vulnerabilities)

### Documentation
- `yarn generate:docs` - Generate TypeDoc documentation in `docs/` directory

### Utilities
- `yarn clean` - Remove build artifacts (coverage, dev-build, docs, lib directories)

## Architecture

### Source Structure
- `src/DoubleLinkedList/index.ts` - Main implementation with `DoubleLinkedList` and `DoubleLinkedListNode` classes
- `src/exports.ts` - Re-exports all public APIs
- `src/DoubleLinkedList/__tests__/` - Jest unit tests

### Build Output
- `lib/cjs/` - CommonJS build output
- `lib/mjs/` - ES Module build output  
- `lib/*.d.ts` - TypeScript declaration files
- Multiple tsconfig files handle different build targets

### Key Implementation Details
- Generic `DoubleLinkedList<ItemT>` supporting any item type
- Nodes maintain bidirectional references with parent list validation
- Cached array conversion with lazy rebuilding on mutations
- Immutable node references returned to consumers
- Safe removal handling for nodes from wrong lists

### Build Process
Uses TypeScript compilation followed by esbuild for dual CommonJS/ES Module output. The `build.mjs` script handles the esbuild transformation phase.

### Package Configuration
Supports modern Node.js package exports with proper `types`, `import`, and `require` field mappings for optimal compatibility.