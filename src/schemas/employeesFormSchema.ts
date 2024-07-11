import { z } from 'zod'

// Set the age limit
const ageLimit = 16

// Calculate the date `ageLimit` years ago
const today = new Date()
const eighteenYearsAgo = new Date(
    today.getFullYear() - ageLimit,
    today.getMonth(),
    today.getDate(),
)

/**
 * Defines the schema for the employee form.
 */
export const employeesFormSchema = z.object({
    firstName: z
        .string()
        .nonempty('First name is required.')
        .min(2, { message: 'The first name must be at least 2 characters' })
        .max(50)
        .regex(/^[A-ÿ]{2,}[A-ÿ\-\s]*$/, {
            message: 'The first name must contain only letters',
        }),

    lastName: z
        .string()
        .nonempty('Last name is required.')
        .min(2, { message: 'The last name must be at least 2 characters' })
        .max(50)
        .regex(/^[A-ÿ]{2,}[A-ÿ\-\s]*$/, {
            message: 'The first name must contain only letters',
        }),

    dateOfBirth: z
        .date({
            required_error: 'A date of birth is required.',
        })
        .max(eighteenYearsAgo, {
            message: `You must have at least ${ageLimit} years old`,
        }),

    street: z.string().nonempty('Street is required.'),

    city: z.string().nonempty('City is required.'),

    state: z.string().nonempty('State is required.'),

    zipCode: z
        .string()
        .nonempty('ZIP Code is required.')
        .regex(/^\d{5}(-\d{4})?$/, 'Invalid ZIP Code'),

    department: z.string().nonempty('Department is required.'),

    startDate: z.date({
        required_error: 'A starting date is required.',
    }),
})
