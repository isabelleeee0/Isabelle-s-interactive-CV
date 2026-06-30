# React-Specific Coding Standards

## 1. Component Design
- Prefer functional components with hooks.
- Keep components small and focused on one responsibility.
- Use default exports only when there is one main component per file.
- Name components with PascalCase, e.g. `UserCard`.
- Use `index.js` only for re-exporting; keep components in separate files.

## 2. JSX Style
- Keep JSX clean and readable.
- Use self-closing tags for empty elements: `<input />`, `<img />`.
- Wrap multi-line JSX in parentheses.
- Use `className` instead of `class`.
- Avoid inline styles when possible; prefer CSS modules, styled components, or utility classes.

## 3. Props and State
- Destructure props at the top of the component.
  - Example: `function Profile({ name, avatarUrl }) { ... }`
- Keep state minimal and derive values when possible.
- Prefer `useState` for local state and `useReducer` for complex state logic.
- Do not mutate props or state directly.
- Use clear naming patterns: `isOpen`, `hasError`, `count`, `setCount`.

## 4. Hooks
- Always call hooks at the top level and never inside loops or conditionals.
- Provide dependencies for `useEffect`, `useMemo`, and `useCallback`.
- Use `useMemo` and `useCallback` only when necessary to avoid unnecessary renders.
- Use custom hooks to encapsulate reusable logic.
- Keep effects focused: one effect should do one thing.

## 5. Files and Folder Structure
- Group related files by feature when possible.
- Use `components/`, `hooks/`, `pages/`, `services/`, and `styles/` folders.
- Keep file names consistent: `ComponentName.jsx`, `useFetch.js`, `apiClient.js`.

## 6. Styling
- Prefer scoped or modular CSS: CSS modules, styled-components, or Emotion.
- Use semantic class names rather than component-specific implementation details.
- Keep style files alongside components when styles are component-specific.
- Keep global styles minimal.

## 7. Accessibility
- Use semantic HTML elements: `<button>`, `<section>`, `<header>`, `<main>`.
- Add accessible labels when needed: `aria-label`, `aria-labelledby`, `aria-describedby`.
- Ensure focus order and keyboard navigation are correct.
- Avoid using `tabIndex="-1"` unless necessary.

## 8. Error Handling
- Handle asynchronous errors gracefully in components.
- Provide fallback UI for loading and error states.
- Avoid showing raw error messages directly to users.

## 9. Performance
- Avoid unnecessary re-renders with stable props and memoization.
- Use `React.memo` for pure components that render the same output.
- Lazy load routes and large components using `React.lazy` and `Suspense`.
- Avoid heavy computations inside render; use `useMemo` when appropriate.

## 10. Testing
- Write unit tests for components and hooks.
- Favor testing behavior over implementation details.
- Use tools like React Testing Library and Jest.
- Test state changes, event handling, and conditional rendering.

## 11. Type Safety
- If using TypeScript, define explicit prop types with interfaces or types.
- Name prop type definitions clearly: `interface UserCardProps { ... }`.
- Prefer `React.FC` only when needed, otherwise define the function type explicitly.

## 12. Documentation and Comments
- Document complex logic with concise comments.
- Prefer readable code over excessive comments.
- Add JSDoc or TypeScript docs for custom hooks and utility functions when helpful.

## 13. General Best Practices
- Keep code DRY: avoid duplicate logic across components.
- Favor composition over inheritance.
- Keep business logic separate from UI rendering.
- Use ESLint and Prettier to enforce consistent formatting.
