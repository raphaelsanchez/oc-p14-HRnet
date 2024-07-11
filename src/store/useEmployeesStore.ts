import { EmployeeType } from '@/types/employeeType.ts'
import { create } from 'zustand'

type EmployeesStoreType = {
    employees: EmployeeType[]
    fetchEmployees: () => Promise<void>
    addEmployee: (employee: EmployeeType) => void
}

export const useEmployeesStore = create<EmployeesStoreType>()((set, get) => ({
    employees: [],
    fetchEmployees: async () => {
        const currentEmployees = get().employees

        // If there are no employees in the store, load them from the mock file
        // TODO: Load employees from the API
        if (currentEmployees.length === 0) {
            try {
                // Load the employees from the mock file
                const employees: EmployeeType[] = await import(
                    '../__mocks__/employees.json'
                ).then((module) => module.default)

                // Set the employees in the store
                set({ employees })
            } catch (error) {
                console.error('Error loading employees:', error)
            }
        }
    },
    addEmployee: (employee: EmployeeType) =>
        set((state) => ({ employees: [...state.employees, employee] })),
}))
