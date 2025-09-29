// Minimal JSX shim kept intentionally small. Do NOT declare the 'react' module here
// because that forces the module to be treated as `any` and breaks typed APIs
// such as React's useState<T>().
//
// If you need full React types, install them via: npm install -D @types/react @types/react-dom

declare namespace JSX {
  interface IntrinsicElements {
    [elemName: string]: any;
  }
}
