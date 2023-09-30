# Contributing to Manifold

Welcome, and thank you for considering contributing to Manifold! This document outlines the process and best practices for contributing to this project.

## Table of Contents

- [Contributing to Manifold](#contributing-to-manifold)
  - [Table of Contents](#table-of-contents)
  - [Code of Conduct](#code-of-conduct)
  - [Getting Started](#getting-started)
    - [Fork and Clone](#fork-and-clone)
    - [Install Dependencies](#install-dependencies)
  - [Development Workflow](#development-workflow)
    - [Branching](#branching)
    - [Coding Style](#coding-style)
    - [Testing](#testing)
  - [Pull Requests](#pull-requests)
    - [Creating a Pull Request](#creating-a-pull-request)
    - [Review Process](#review-process)
  - [Issues](#issues)
    - [Creating an Issue](#creating-an-issue)

## Code of Conduct

By participating, you are expected to uphold our [Code of Conduct](CODE_OF_CONDUCT.md). Please report any unacceptable behavior.

## Getting Started

### Fork and Clone

1. Fork the repository on GitHub.
2. Clone your fork locally: `git clone https://github.com/azide0x37/manifold.git`

### Install Dependencies

Run `pnpm install` to install all necessary dependencies.

## Development Workflow

### Branching

Create a new branch for each feature or fix. Branch off from the `main` branch:

```bash
git checkout -b feature/your-feature-name
```

or

```bash
git checkout -b fix/your-fix-name
```

### Coding Style

- Follow TypeScript guidelines and existing coding style in the project.
- Make sure to run `npm run lint` before committing your changes to ensure your code is lint-free.

### Testing

- Write unit tests for your features or fixes.
- Run `npm test` to execute all unit tests and ensure that they pass.

## Pull Requests

### Creating a Pull Request

1. Push your changes to your fork: `git push origin feature/your-feature-name`.
2. Create a pull request from your fork via GitHub.

### Review Process

1. A core contributor will review your pull request and provide feedback.
2. If changes are required, you may need to update your pull request.

## Issues

### Creating an Issue

If you find a bug, or have a feature request, please first check if the issue already exists. If not, feel free to [create a new issue](https://github.com/azide0x37/manifold/issues).
