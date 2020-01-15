/** @module root */

export * from './file1';
export * from './file2';
export * from './dir1';
export * from './dir2';
import * as dir1 from './dir1';
export const reexport_dir1 = dir1;
