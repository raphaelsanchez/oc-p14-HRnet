import { fetchEmployees } from '@/api/fetchEmployees'
import { EmployeeType } from '@/types/employeeType'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type EmployeesStoreActions = {
    initializeEmployees: () => Promise<void>
    addEmployee: (employee: EmployeeType) => void
}

type EmployeesStoreType = {
    employees: EmployeeType[]
} & EmployeesStoreActions

/**
 * Custom hook for managing the employees store.
 */
export const useEmployeesStore = create<EmployeesStoreType>()(
    persist(
        (set, get) => ({
            employees: [],

            /**
             * Initializes the employees if they haven't been fetched yet.
             */
            initializeEmployees: async () => {
                const currentEmployees = get().employees
                if (currentEmployees.length === 0) {
                    const employees = await fetchEmployees()
                    set({ employees })
                }
            },

            /**
             * Adds a new employee to the store.
             * @param employee - The employee to add.
             */
            addEmployee: (employee: EmployeeType) =>
                set((state) => ({
                    employees: [...state.employees, employee],
                })),
        }),
        { name: 'hrnet-employees-storage' },
    ),
)
