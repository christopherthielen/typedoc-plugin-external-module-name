/**
 * the preferred documentation for the root module
 * @preferred
 */
import './file1';
import './file2';
import './dir1';
import './dir2';
import './dir3/nest';
import * as dir1 from './dir1';
export const reexport_dir1 = dir1;
