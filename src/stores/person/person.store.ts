import { StateCreator, create } from "zustand";
import { StateStorage, createJSONStorage, persist } from "zustand/middleware";

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

const sessionStorage: StateStorage = {
  getItem: function (name: string): string | Promise<string | null> | null {
    console.log('getItem', name);
    return null;
  },
  setItem: function (name: string, value: string): unknown {
    console.log('setItem', { name, value });
    return null;
  },
  removeItem: function (name: string): unknown {
    console.log('removeItem', name);
    return null;
  }
}

// Persist funciona como middleware y recibe dos argumentos el primero
// es el objeto Store y un objeto con el nombre que se guardara en el 
// localStorage
export const usePersonStore = create<PersonState & Actions>()(
  persist(
    storeApi,
    {
      name: 'personStorage',
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);