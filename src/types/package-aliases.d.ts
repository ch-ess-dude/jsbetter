
// Treat imports that include an inline version suffix (e.g. "lucide-react@0.487.0"
// or "@radix-ui/react-accordion@1.2.3") as `any` so TypeScript can resolve those
// alias-style imports used in the codebase. Vite config maps those alias names to
// the real packages at build time, but TypeScript needs module declarations.

// Unscoped packages with version suffix: lucide-react@0.487.0
declare module '*@*' {
  const whatever: any;
  export = whatever;
}

// Scoped packages with version suffix: @radix-ui/react-accordion@1.2.3
declare module '@*/*@*' {
  const whatever: any;
  export = whatever;
}

// Fallback additional patterns (defensive)
declare module '*@*/*' {
  const whatever: any;
  export = whatever;
}

declare module '@*/*@*/*' {
  const whatever: any;
  export = whatever;
}

