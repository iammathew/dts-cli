import { RollupOptions } from 'rollup';

interface SharedOpts {
  // JS target
  target: 'node' | 'browser';
  // Path to tsconfig file
  tsconfig?: string;
  // Is error extraction running?
  extractErrors?: boolean;
}

export type ModuleFormat = 'cjs' | 'umd' | 'esm' | 'system';

export interface BuildOpts extends SharedOpts {
  name?: string;
  entry?: string | string[];
  format: 'cjs,esm';
  target: 'browser';
  noClean?: boolean;
  rollupTypes?: boolean;
}

export interface WatchOpts extends BuildOpts {
  verbose?: boolean;
  // callback hooks
  onFirstSuccess?: string;
  onSuccess?: string;
  onFailure?: string;
}

export interface NormalizedOpts
  extends Omit<WatchOpts, 'name' | 'input' | 'format'> {
  name: string | string[];
  input: string[];
  format: [ModuleFormat, ...ModuleFormat[]];
  output: {
    file: string[];
  };
}

export type DtsOptionsInput = { [entryAlias: string]: string };

export interface DtsOptions extends SharedOpts {
  // Name of package
  name: string;
  // path to file
  input: string | DtsOptionsInput;
  // Environment
  env: 'development' | 'production';
  // Module format
  format: ModuleFormat;
  // Is minifying?
  minify?: boolean;
  // Is this the very first rollup config (and thus should one-off metadata be extracted)?
  writeMeta?: boolean;
  // Only transpile, do not type check (makes compilation faster)
  transpileOnly?: boolean;
  // Is rolling up types?
  rollupTypes?: boolean;
}

export interface PackageJson {
  name: string;
  source?: string;
  jest?: any;
  eslint?: any;
  dependencies?: { [packageName: string]: string };
  devDependencies?: { [packageName: string]: string };
  engines?: {
    node?: string;
  };
  types?: string;
  typings?: string;
}

export interface DtsConfig {
  rollup?: (config: RollupOptions, options: DtsOptions) => RollupOptions;
}

export interface NormalizedDtsConfig extends DtsConfig {
  rollup: (config: RollupOptions, options: DtsOptions) => RollupOptions;
}
