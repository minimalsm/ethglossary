// TODO: Add new dates to env vars and update fallback here
export const START_DATE = process.env.NEXT_PUBLIC_START_DATE || '2024-08-09'
export const END_DATE = process.env.NEXT_PUBLIC_END_DATE || '2024-08-18'

export const YEAR = new Date(START_DATE).getFullYear()
