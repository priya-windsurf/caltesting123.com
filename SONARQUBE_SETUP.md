# SonarQube CI Setup Instructions

This document provides step-by-step instructions for setting up SonarCloud integration with the Cal.com repository.

## Prerequisites

- GitHub repository access with admin permissions
- SonarCloud account (free for open source projects)

## Setup Steps

### 1. Create SonarCloud Account

1. Go to [SonarCloud.io](https://sonarcloud.io)
2. Sign in with your GitHub account
3. Grant necessary permissions to SonarCloud

### 2. Import Repository

1. In SonarCloud dashboard, click "+" → "Analyze new project"
2. Select your GitHub organization (`priya-windsurf`)
3. Choose the `cal.com` repository
4. Click "Set up"

### 3. Configure Project Settings

1. **Project Key**: `priya-windsurf_cal.com` (should be auto-generated)
2. **Organization**: `priya-windsurf`
3. **Main Branch**: `main`

### 4. Generate SONAR_TOKEN

1. Go to SonarCloud → My Account → Security
2. Generate a new token with a descriptive name (e.g., "Cal.com GitHub Actions")
3. Copy the token value (you won't be able to see it again)

### 5. Add GitHub Secret

1. Go to your GitHub repository → Settings → Secrets and variables → Actions
2. Click "New repository secret"
3. Name: `SONAR_TOKEN`
4. Value: Paste the token from step 4
5. Click "Add secret"

## Configuration Files

The following files have been configured for SonarQube integration:

### sonar-project.properties
- **Project identification**: Configured with correct project key and organization
- **Source directories**: `apps` and `packages` for monorepo structure
- **Test patterns**: Includes `.test.ts`, `.test.tsx`, `.spec.ts`, `.spec.tsx` files
- **Exclusions**: Build artifacts, node_modules, generated files, and test files
- **Coverage**: Configured to use LCOV reports from Vitest

### GitHub Actions Workflow
- **Job**: `sonarqube` added to `.github/workflows/pr.yml`
- **Dependencies**: Runs after `unit-test` job completes
- **Coverage**: Executes `yarn test --coverage --watchAll=false`
- **Analysis**: Uses official `SonarSource/sonarcloud-github-action`

## Workflow Behavior

The SonarQube analysis will:

1. **Trigger**: Run on every pull request that has files requiring all checks
2. **Dependencies**: Wait for lint, type-check, and unit tests to complete
3. **Coverage**: Generate code coverage reports using Vitest
4. **Analysis**: Upload results to SonarCloud for quality gate evaluation
5. **Results**: Display security vulnerabilities, code smells, and coverage metrics

## Quality Gates

SonarCloud will enforce quality gates for:

- **Security vulnerabilities**: No new security issues
- **Code coverage**: Maintain or improve coverage percentage
- **Maintainability**: Limit technical debt introduction
- **Reliability**: Prevent new bugs from being introduced

## Troubleshooting

### Missing SONAR_TOKEN
If you see authentication errors, ensure the `SONAR_TOKEN` secret is properly configured in GitHub repository settings.

### Coverage Issues
The workflow uses `@vitest/coverage-v8` for generating coverage reports. If coverage fails:
1. Ensure all dependencies are installed: `yarn install`
2. Run tests locally: `yarn test --coverage`
3. Check that `coverage/lcov.info` is generated

### Project Not Found
If SonarCloud can't find the project:
1. Verify the project key matches: `priya-windsurf_cal.com`
2. Ensure the repository is imported in SonarCloud
3. Check organization settings in SonarCloud

## Benefits

Once configured, SonarQube CI provides:

- **Automated security scanning** on every PR
- **Code quality metrics** and technical debt tracking
- **Coverage reporting** integrated with existing test suite
- **Quality gates** to prevent merging problematic code
- **Historical tracking** of code quality trends

## Support

For issues with SonarCloud setup:
- [SonarCloud Documentation](https://docs.sonarcloud.io/)
- [GitHub Actions Integration Guide](https://docs.sonarcloud.io/advanced-setup/ci-based-analysis/github-actions-for-sonarcloud/)
