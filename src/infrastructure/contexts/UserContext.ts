import { IUser } from '@entities/userEntities';
import { createContext } from 'react';

export const UserContext = createContext<IUser | null>(null);
