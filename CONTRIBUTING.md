# Contributing to doublell

Thank you for your interest in contributing to doublell! 🎉 We welcome contributions from developers of all skill levels and backgrounds. This guide will help you get started and ensure your contributions align with the project's goals.

## 🚀 Quick Start for Contributors

1. **Fork the repository** on GitHub
2. **Clone your fork** locally: `git clone https://github.com/YOUR_USERNAME/doublell.git`
3. **Install dependencies**: `yarn install`
4. **Create a branch**: `git checkout -b feature/your-feature-name`
5. **Make your changes** and add tests
6. **Run the test suite**: `yarn test`
7. **Submit a pull request**

## 🎯 Project Vision

doublell aims to be the **most type-safe, performant, and developer-friendly** doubly linked list implementation for TypeScript and JavaScript. Our core principles:

- **Type Safety First**: Comprehensive TypeScript support with full generic typing
- **Performance**: O(1) operations where possible, minimal memory overhead
- **Developer Experience**: Familiar APIs, comprehensive documentation, great tooling support
- **Reliability**: High test coverage, robust error handling
- **AI-Friendly**: Rich type information and documentation for AI coding assistants

## 🛠️ Development Setup

### Prerequisites
- Node.js 14.14+ (we recommend using the latest LTS version)
- Yarn package manager
- TypeScript knowledge (for most contributions)

### Initial Setup
```bash
# Clone the repository
git clone https://github.com/TypeScript-OSS/doublell.git
cd doublell

# Install dependencies
yarn install

# Run tests to ensure everything works
yarn test

# Generate documentation
yarn generate:docs
```

### Development Commands
```bash
# Run tests
yarn test                           # Full test suite
yarn test:unit-tests               # Just unit tests
yarn test:check-circular-dependencies  # Check for circular deps

# Code quality
yarn lint                          # Run ESLint
yarn lint --fix                   # Fix linting issues

# Build
yarn build                         # Production build
yarn build:dev                    # Development build

# Documentation
yarn generate:docs                 # Generate TypeDoc documentation

# Cleanup
yarn clean                         # Remove build artifacts
```

## 🧪 Testing Guidelines

We maintain **high test coverage** (currently >97%) and expect all contributions to include appropriate tests.

### Test Requirements
- **Unit tests** for all new methods/functionality
- **Edge case coverage** (empty lists, single items, error conditions)
- **Type safety tests** ensuring TypeScript generics work correctly
- **Integration tests** for complex interactions

### Test Structure
```typescript
describe('YourFeature', () => {
  it('should handle the basic case', () => {
    const list = new DoubleLinkedList<number>(1, 2, 3);
    // Test basic functionality
    expect(list.yourMethod()).toBe(expectedResult);
  });

  it('should handle edge cases', () => {
    const emptyList = new DoubleLinkedList<number>();
    // Test edge cases
    expect(emptyList.yourMethod()).toBeUndefined();
  });

  it('should maintain type safety', () => {
    const stringList = new DoubleLinkedList<string>('a', 'b');
    const result = stringList.yourMethod();
    // TypeScript should infer correct types
    expect(typeof result).toBe('string');
  });
});
```

### Running Tests
```bash
# Run all tests
yarn test

# Run tests in watch mode during development
yarn test:unit-tests --watch

# Run tests with coverage
yarn test:unit-tests --coverage
```

## 📝 Code Style and Standards

We maintain consistent code quality through automated tooling:

### TypeScript Standards
- **Strict mode** enabled - no `any` types unless absolutely necessary
- **Full generic typing** - leverage TypeScript's type system
- **JSDoc comments** for all public APIs
- **Immutable interfaces** where appropriate (readonly properties)

### Code Formatting
- **ESLint** with Prettier integration
- **No warnings allowed** - the build fails on ESLint warnings
- **Consistent naming**: camelCase for methods, PascalCase for classes
- **Arrow functions** for class methods (enables proper `this` binding)

### Documentation Standards
```typescript
/**
 * Brief description of what the method does.
 * More detailed explanation if needed.
 * 
 * @param param1 - Description of the parameter
 * @param param2 - Description with type info
 * @returns Description of return value
 * @complexity O(1) or O(n) - performance characteristics
 * 
 * @example Basic usage
 * ```typescript
 * const list = new DoubleLinkedList(1, 2, 3);
 * const result = list.yourMethod(param1, param2);
 * console.log(result); // Expected output
 * ```
 * 
 * @example Edge case
 * ```typescript
 * const emptyList = new DoubleLinkedList<string>();
 * const result = emptyList.yourMethod();
 * console.log(result); // undefined
 * ```
 */
public readonly yourMethod = (param1: Type1, param2: Type2): ReturnType => {
  // Implementation
};
```

## 🔄 Types of Contributions Welcome

### 🐛 Bug Fixes
- Fix incorrect behavior or edge cases
- Improve error handling
- Performance optimizations
- Memory leak fixes

### ✨ New Features
Before adding new features, please:
1. **Open an issue** to discuss the feature
2. Ensure it aligns with the project vision
3. Consider the **API surface area** - we prefer focused, well-designed APIs
4. Provide **comprehensive tests** and **documentation**

**Examples of welcome features:**
- Additional Array-like methods (`filter`, `reduce`, `some`, `every`)
- Performance optimizations
- Better error messages
- Utility methods that maintain the core design principles

### 📚 Documentation Improvements
- Fix typos or unclear explanations
- Add more examples
- Improve JSDoc comments
- Update README with new use cases
- Add tutorials or guides

### 🧪 Testing Improvements
- Add edge case tests
- Improve test coverage
- Add performance benchmarks
- Integration tests

## 📋 Pull Request Process

### Before Submitting
1. **Test locally**: `yarn test` passes
2. **Lint your code**: `yarn lint` passes with no warnings
3. **Update documentation** if you changed APIs
4. **Add tests** for new functionality
5. **Update CHANGELOG.md** if adding features or fixing bugs

### Pull Request Template
When submitting a PR, please include:

```markdown
## Description
Brief description of what this PR does.

## Type of Change
- [ ] Bug fix (non-breaking change)
- [ ] New feature (non-breaking change)
- [ ] Breaking change (fix or feature that would cause existing functionality to change)
- [ ] Documentation update

## Testing
- [ ] I have added tests that prove my fix is effective or that my feature works
- [ ] New and existing unit tests pass locally with my changes
- [ ] I have tested edge cases

## Checklist
- [ ] My code follows the style guidelines of this project
- [ ] I have performed a self-review of my own code
- [ ] I have commented my code, particularly in hard-to-understand areas
- [ ] I have made corresponding changes to the documentation
- [ ] My changes generate no new warnings
```

### Review Process
1. **Automated checks** must pass (tests, lint, type checking)
2. **Code review** by maintainers
3. **Feedback incorporation** if needed
4. **Final approval** and merge

## 🤝 Community Guidelines

### Communication
- **Be respectful** and inclusive
- **Ask questions** if you're unsure about anything
- **Share knowledge** and help other contributors
- **Provide constructive feedback** in reviews

### Getting Help
- **GitHub Issues** for bugs and feature requests
- **Discussions** for questions and ideas
- **Code reviews** for implementation feedback

### Recognition
Contributors will be:
- **Listed in release notes** for significant contributions
- **Credited in the README** for major features
- **Thanked publicly** in project communications

## 🚨 Issue Reporting

### Bug Reports
Please include:
- **TypeScript/Node.js version**
- **Minimal reproduction case**
- **Expected vs. actual behavior**
- **Error messages** if any

```markdown
## Bug Report

**Environment:**
- doublell version: 1.1.6
- TypeScript version: 5.8.3
- Node.js version: 18.0.0

**Description:**
Brief description of the bug.

**Reproduction:**
```typescript
// Minimal code that reproduces the issue
const list = new DoubleLinkedList(1, 2, 3);
// ... steps to reproduce
```

**Expected Behavior:**
What should happen.

**Actual Behavior:**
What actually happens.
```

### Feature Requests
Please include:
- **Use case** - why is this needed?
- **Proposed API** - how should it work?
- **Alternatives considered** - what other solutions did you think about?
- **Breaking changes** - would this break existing code?

## 📊 Performance Considerations

When contributing performance improvements:
- **Benchmark your changes** - provide before/after metrics
- **Consider memory usage** - not just execution speed
- **Test with large datasets** - ensure scalability
- **Document complexity** - update @complexity annotations

## 🔐 Security

If you discover security vulnerabilities:
- **DO NOT** create a public issue
- **Email the maintainers** privately
- **Provide details** about the vulnerability
- **Allow time** for a fix before public disclosure

## 📄 License

By contributing to doublell, you agree that your contributions will be licensed under the MIT License.

---

## 🙏 Thank You!

Every contribution makes doublell better for the entire TypeScript/JavaScript community. Whether you're fixing a typo, adding a feature, or helping other contributors, your effort is appreciated!

**Happy coding!** 🚀

---

*For questions about contributing, feel free to open an issue or start a discussion. The maintainers are here to help!*