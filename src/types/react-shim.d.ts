// Minimal declaration shims to reduce editor errors in this workspace.
// This is intentionally minimal — for full typing please install @types/react in the project.

declare module 'react';
declare module 'react/jsx-runtime';

declare namespace JSX {
  interface IntrinsicElements {
    [elemName: string]: any;
  }
}
