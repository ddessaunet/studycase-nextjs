/**
 * Asynchronously loads view component
 */

import { lazyLoad } from 'utils/loadable';

export const UserDetailsView = lazyLoad(
  () => import('./index'),
  module => module.UserDetailsView,
);
