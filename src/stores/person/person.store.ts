import { StateCreator, create } from "zustand";
import { persist } from "zustand/middleware";

interface PersonState {
  firstName: string;
  lastName: string;
}
  
interface Actions {
  setFirstName: (value: string) => void;
  setLastName: (value: string) => void;
}

const storeApi: StateCreator<PersonState & Actions> = (set) => ({
  firstName: '',
  lastName: '',
  setFirstName: (value: string) => set((store) => ({ firstName: value })),
  setLastName: (value: string) => set((store) => ({ lastName: value })),
});

// Persist funciona como middleware y recibe dos argumentos el primero
// es el objeto Store y un objeto con el nombre que se guardara en el 
// localStorage
export const usePersonStore = create<PersonState & Actions>()(
  persist(
    storeApi,
    {
      name: 'personStorage'
    }
  )
);