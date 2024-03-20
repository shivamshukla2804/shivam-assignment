import { Iroute } from './interface';

export const REVIEW: Iroute = {
  path: 'review',
  get fullUrl(): string {
    return `/${this.path}`;
  },
};
