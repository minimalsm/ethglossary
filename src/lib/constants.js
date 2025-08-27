export const START_DATE = process.env.NEXT_PUBLIC_START_DATE || '2025-08-25'
export const END_DATE = process.env.NEXT_PUBLIC_END_DATE || '2025-08-31'

export const YEAR = new Date(START_DATE).getFullYear()
