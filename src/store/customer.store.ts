import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Customer } from "../types/customer";

type CustomerState = {
  customer: Customer | null;
  setCustomer: (customer: Customer | null) => void;
  resetState: () => void;
};

const initialState = {
  customer: null,
  role: null,
};

const useCustomerStore = create<CustomerState>()(
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