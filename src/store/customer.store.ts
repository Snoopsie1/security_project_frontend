import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Customer } from "../types/customer";
import { Role } from "../types/role";

type UserState = {
  customer: Customer | null;
  role: Role | null;
  setCustomer: (customer: Customer | null) => void;
  setRole: (role: Role | null) => void;
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
      setRole: (role) => set({ role: role }),
      resetState: () => set(initialState),
    }),
    {
      name: 'auth-storage',
    },
  ),
);

export default useCustomerStore;