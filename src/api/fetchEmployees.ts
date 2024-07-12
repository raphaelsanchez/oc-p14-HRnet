import { EmployeeType } from '@/types/employeeType'

/**
 * Fetches the list of employees from the server.
 *
 * @returns A promise that resolves to an array of EmployeeType objects.
 * @throws An error if the employees fail to load.
 */
// TODO: Change the implementation to fetch employees from the real api.
export const fetchEmployees = async (): Promise<EmployeeType[]> => {
    try {
        const employees: EmployeeType[] = await import(
            '@/__mocks__/employees.json'
        ).then((module) => module.default)
        return employees
    } catch (error) {
        console.error('Error loading employees:', error)
        throw new Error('Failed to load employees')
    }
}
