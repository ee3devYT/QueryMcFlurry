# Contributing to QueryMcFlurry

First off, thank you for considering contributing to QueryMcFlurry! It's people like you that make QueryMcFlurry such a great tool.

## Expected Behavior

We expect all contributors to treat each other with respect and to maintain a friendly, collaborative environment. Please be considerate of others, remain open to constructive feedback, and focus on what is best for the community and the project.

## How Can I Contribute?

### Reporting Bugs

This section guides you through submitting a bug report for QueryMcFlurry. Following these guidelines helps maintainers and the community understand your report, reproduce the behavior, and find related reports.

- Use a clear and descriptive title for the issue to identify the problem.
- Describe the exact steps which reproduce the problem in as many details as possible.
- Provide specific examples to demonstrate the steps.

### Suggesting Enhancements

This section guides you through submitting an enhancement suggestion for QueryMcFlurry, including completely new features and minor improvements to existing functionality.

- Use a clear and descriptive title for the issue to identify the suggestion.
- Provide a step-by-step description of the suggested enhancement in as many details as possible.
- Provide specific examples to demonstrate the steps.

### Your First Code Contribution

Unsure where to begin contributing to QueryMcFlurry? You can start by looking through these `beginner` and `help-wanted` issues:

- [Beginner issues](https://github.com/yourusername/QueryMcFlurry/labels/beginner) - issues which should only require a few lines of code, and a test or two.
- [Help wanted issues](https://github.com/yourusername/QueryMcFlurry/labels/help%20wanted) - issues which should be a bit more involved than `beginner` issues.

### Pull Requests

The process described here has several goals:

- Maintain QueryMcFlurry's quality
- Fix problems that are important to users
- Engage the community in working toward the best possible QueryMcFlurry
- Enable a sustainable system for QueryMcFlurry's maintainers to review contributions

Please follow these steps to have your contribution considered by the maintainers:

1. Follow all instructions in [the template](PULL_REQUEST_TEMPLATE.md)
2. Follow the [styleguides](#styleguides)
3. After you submit your pull request, verify that all [status checks](https://help.github.com/articles/about-status-checks/) are passing

## Styleguides

### Git Commit Messages

- Use the present tense ("Add feature" not "Added feature")
- Use the imperative mood ("Move cursor to..." not "Moves cursor to...")
- Limit the first line to 72 characters or less
- Reference issues and pull requests liberally after the first line

### TypeScript Styleguide

We prioritize type safety and clean code in our TypeScript codebase. Here are some key points to follow:

- Use Zod for runtime type checking and validation
- Leverage TypeScript's type system to catch errors at compile-time
- Use 2 spaces for indentation
- Prefer `const` over `let` when possible
- Use camelCase for variable and function names
- Use PascalCase for class names and type aliases
- Use UPPERCASE for constants

Example of using Zod for type-safe schemas:

```typescript
import { z } from 'zod';

const UserSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1).max(100),
  email: z.string().email(),
  age: z.number().int().positive().optional(),
});

type User = z.infer<typeof UserSchema>;

function processUser(user: User) {
  // Your code here
}
```

### Documentation Styleguide

- Use [Markdown](https://daringfireball.net/projects/markdown/) for documentation.
- Reference functions, classes, and modules in backticks: `functionName()`
- Provide clear and concise comments for complex logic
- Use JSDoc comments for functions and classes to describe parameters, return types, and thrown exceptions

## Additional Notes

### Issue and Pull Request Labels

This section lists the labels we use to help us track and manage issues and pull requests.

- `bug` - Issues for bugs in the code
- `enhancement` - Issues for new features or improvements
- `documentation` - Issues related to documentation
- `good first issue` - Good for newcomers

## Questions?

Don't hesitate to contact the project maintainers if you have any questions or concerns.

Thank you for contributing to QueryMcFlurry!
