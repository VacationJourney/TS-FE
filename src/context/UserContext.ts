import { createContext } from 'react';
type ContextProps = {
  userId: string
}
export const UserContext = createContext<Partial<ContextProps>>({});