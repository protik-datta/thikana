import { useState, useMemo } from 'react'
import { Calculator, Info } from 'lucide-react'
import Container from '@/components/ui/Container'
import Button from '@/components/ui/Button'
import { Reveal } from '@/components/common/Reveal'
import { usePageMeta } from '@/hooks/usePageMeta'
import { formatPrice } from '@/utils/formatPrice'

function formatBDT(amount) {
  if (amount >= 10000000) return `৳${(amount / 10000000).toFixed(2)} Cr`
  if (amount >= 100000) return `৳${(amount / 100000).toFixed(2)} Lakh`
  return `৳${Math.round(amount).toLocaleString('en-IN')}`
}

function NumberInput({ label, value, onChange, prefix, suffix, min, max, step, hint }) {
  return (
    <div>
      <label className="block text-label text-muted">{label}</label>
      {hint && <p className="mt-0.5 text-[0.8125rem] text-muted">{hint}</p>}
      <div className="relative mt-1.5 flex items-center">
        {prefix && <span className="absolute left-3.5 text-[0.9375rem] text-muted">{prefix}</span>}
        <input
          type="number"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          min={min}
          max={max}
          step={step}
          className={`h-11 w-full rounded-control border border-line-strong bg-paper text-[0.9375rem] transition-colors hover:border-ink focus-visible:border-brand focus-visible:outline-none ${prefix ? 'pl-8 pr-3.5' : suffix ? 'pl-3.5 pr-12' : 'px-3.5'}`}
        />
        {suffix && <span className="absolute right-3.5 text-[0.9375rem] text-muted">{suffix}</span>}
      </div>
    </div>
  )
}

function ResultCard({ label, value, accent }) {
  return (
    <div className={`rounded-surface border p-5 ${accent ? 'border-brand bg-brand text-paper' : 'border-line'}`}>
      <p className={`text-label ${accent ? 'text-paper/70' : 'text-muted'}`}>{label}</p>
      <p className={`mt-2 text-[1.625rem] font-semibold tracking-tight ${accent ? 'text-paper' : 'text-ink'}`}>{value}</p>
    </div>
  )
}

export default function MortgageCalculator() {
  usePageMeta({
    title: 'Mortgage calculator',
    description: 'Estimate your monthly payment, total interest and total cost for a home loan in Bangladesh.',
  })

  const [propertyPrice, setPropertyPrice] = useState(15000000)
  const [downPayment, setDownPayment] = useState(3000000)
  const [interestRate, setInterestRate] = useState(9)
  const [loanYears, setLoanYears] = useState(20)

  const results = useMemo(() => {
    const loanAmount = Math.max(0, propertyPrice - downPayment)
    const monthlyRate = interestRate / 100 / 12
    const totalMonths = loanYears * 12
    const monthly = monthlyRate === 0
      ? loanAmount / totalMonths
      : (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) / (Math.pow(1 + monthlyRate, totalMonths) - 1)
    const totalPayment = monthly * totalMonths
    const totalInterest = totalPayment - loanAmount

    return { loanAmount, monthly: isFinite(monthly) ? monthly : 0, totalPayment, totalInterest }
  }, [propertyPrice, downPayment, interestRate, loanYears])

  const downPct = propertyPrice > 0 ? Math.round((downPayment / propertyPrice) * 100) : 0

  return (
    <Container className="py-8 sm:py-12">
      <Reveal>
        <div className="flex items-center gap-3">
          <Calculator className="size-7 text-brand" aria-hidden="true" />
          <h1 className="text-page">Mortgage calculator</h1>
        </div>
        <p className="mt-2 max-w-xl text-body text-muted">
          Estimate your monthly repayment based on the property price, down payment, interest rate and loan term.
        </p>
      </Reveal>

      <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_400px] lg:gap-14">
        {/* Inputs */}
        <div>
          <div className="rounded-surface border border-line p-6 sm:p-8">
            <h2 className="text-[1.125rem] font-semibold">Loan details</h2>
            <div className="mt-6 space-y-5">
              <NumberInput
                label="Property price"
                value={propertyPrice}
                onChange={(v) => setPropertyPrice(Number(v))}
                prefix="৳"
                min={0}
                step={100000}
                hint={formatBDT(propertyPrice)}
              />
              <NumberInput
                label={`Down payment (${downPct}%)`}
                value={downPayment}
                onChange={(v) => setDownPayment(Number(v))}
                prefix="৳"
                min={0}
                max={propertyPrice}
                step={100000}
                hint={`Loan amount: ${formatBDT(results.loanAmount)}`}
              />
              <NumberInput
                label="Annual interest rate"
                value={interestRate}
                onChange={(v) => setInterestRate(Number(v))}
                suffix="%"
                min={0}
                max={30}
                step={0.1}
                hint="Typical Bangladesh home loan rates: 8–12%"
              />
              <NumberInput
                label="Loan term"
                value={loanYears}
                onChange={(v) => setLoanYears(Number(v))}
                suffix="years"
                min={1}
                max={30}
                step={1}
              />
            </div>

            <div className="mt-6 flex gap-3">
              {[10, 15, 20, 25].map((y) => (
                <button
                  key={y}
                  type="button"
                  onClick={() => setLoanYears(y)}
                  className={`flex-1 rounded-control border py-2 text-[0.875rem] font-medium transition-colors ${loanYears === y ? 'border-ink bg-ink text-paper' : 'border-line-strong hover:border-ink'}`}
                >
                  {y}yr
                </button>
              ))}
            </div>
          </div>

          <div className="mt-4 rounded-surface border border-line-strong/50 bg-canvas p-4">
            <p className="flex items-start gap-2 text-meta text-muted">
              <Info className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
              These figures are estimates only. Actual rates and payments depend on the lender, your credit profile and any fees. Consult a qualified financial adviser before making a commitment.
            </p>
          </div>
        </div>

        {/* Results */}
        <div>
          <div className="lg:sticky lg:top-24 space-y-4">
            <ResultCard label="Monthly payment" value={formatBDT(results.monthly)} accent />
            <div className="grid grid-cols-2 gap-4">
              <ResultCard label="Total payment" value={formatBDT(results.totalPayment)} />
              <ResultCard label="Total interest" value={formatBDT(results.totalInterest)} />
            </div>
            <div className="rounded-surface border border-line p-5">
              <h3 className="text-[0.9375rem] font-semibold">Summary</h3>
              <dl className="mt-4 space-y-2.5 text-meta">
                <div className="flex justify-between">
                  <dt className="text-muted">Loan amount</dt>
                  <dd className="font-medium">{formatBDT(results.loanAmount)}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted">Down payment</dt>
                  <dd className="font-medium">{formatBDT(downPayment)} ({downPct}%)</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted">Interest rate</dt>
                  <dd className="font-medium">{interestRate}% per annum</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted">Loan term</dt>
                  <dd className="font-medium">{loanYears} years ({loanYears * 12} months)</dd>
                </div>
                <div className="flex justify-between border-t border-line pt-2.5">
                  <dt className="font-semibold">Monthly payment</dt>
                  <dd className="font-semibold text-brand">{formatBDT(results.monthly)}</dd>
                </div>
              </dl>
            </div>
            <Button to="/properties?transaction=sale" variant="secondary" className="w-full">
              Browse properties for sale
            </Button>
          </div>
        </div>
      </div>
    </Container>
  )
}
