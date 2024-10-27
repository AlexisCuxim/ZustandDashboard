import { StateCreator, create } from "zustand";
import { devtools, persist } from "zustand/middleware";
// import { customSessionStorage } from "../storages/session.storage";
import { firebaseStorage } from "../storages/firebase.storage";

interface PersonState {
  firstName: string;
  lastName: string;
}

interface Actions {
  setFirstName: (value: string) => void;
  setLastName: (value: string) => void;
}

const storeApi: StateCreator<PersonState & Actions, [["zustand/devtools", never]]> = (set) => ({
  firstName: '',
  lastName: '',
  setFirstName: (value: string) => set(({ firstName: value }), false, 'setFirstName'),
  setLastName: (value: string) => set(({ lastName: value }), false, 'setLastName'),
});

// Persist funciona como middleware y recibe dos argumentos el primero
// es el objeto Store y un objeto con el nombre que se guardara en el 
// localStorage
export const usePersonStore = create<PersonState & Actions>()(
  devtools(
    persist(
      storeApi,
      {
        name: 'personStorage',
        // storage: customSessionStorage,
        storage: firebaseStorage,
      }
    )
  )
);