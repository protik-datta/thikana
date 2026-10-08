const trim = (value) => String(Number(value.toFixed(2)))

export function formatPrice(amount, transactionType) {
  if (transactionType === 'rent') {
    if (amount >= 100000) return `৳${trim(amount / 100000)} Lakh / month`
    return `৳${amount.toLocaleString('en-IN')} / month`
  }
  if (amount >= 10000000) return `৳${trim(amount / 10000000)} Cr`
  return `৳${trim(amount / 100000)} Lakh`
}
