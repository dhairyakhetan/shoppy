const inr = new Intl.NumberFormat('en-IN', { maximumFractionDigits: 0 })

/** ₹1,100 */
export const price = (n: number) => `₹${inr.format(n)}`

/** "1 item", "3 items" */
export const plural = (n: number, one: string, many = one + 's') => `${n} ${n === 1 ? one : many}`
