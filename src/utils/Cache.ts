import { InMemoryCache } from '@apollo/client'

export const cache = new InMemoryCache()

export const clear = () => {
  cache.reset();
};

