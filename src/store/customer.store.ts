import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Customer } from "../types/customer";
import { Role } from "../types/role";

type UserState = {
  customer: Customer | null;
  setCustomer: (customer: Customer | null) => void;
  resetState: () => void;
};

const initialState = {
  customer: null,
  role: null,
};

const useCustomerStore = create<UserState>()(
  persist(
    (set) => ({
      ...initialState,
      setCustomer: (customer) => set({ customer: customer }),
      resetState: () => set(initialState),
    }),
    {
      name: 'auth-storage',
    },
  ),
);

export default useCustomerStore;