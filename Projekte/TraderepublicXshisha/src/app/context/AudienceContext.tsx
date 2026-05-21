import { createContext, useContext } from 'react';

export type AudienceId = 1 | 2 | 3;

export interface AudienceContextType {
  audience: AudienceId;
  setAudience: (id: AudienceId) => void;
}

export const AudienceContext = createContext<AudienceContextType>({
  audience: 1,
  setAudience: () => {},
});

export const useAudience = () => useContext(AudienceContext);
