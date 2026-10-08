import { useState, useMemo } from 'react'
import { Search } from 'lucide-react'
import Container from '@/components/ui/Container'
import AgentCard from '@/components/agent/AgentCard'
import { Stagger, StaggerItem, Reveal } from '@/components/common/Reveal'
import EmptyState from '@/components/common/EmptyState'
import { usePageMeta } from '@/hooks/usePageMeta'
import { AGENTS } from '@/data/agents'

const AGENCIES = ['All agencies', ...new Set(AGENTS.map((a) => a.agency))]
const SPECIALTIES = ['All specialties', 'Luxury apartments', 'Family apartments', 'Office space', 'Land verification', 'Furnished rentals', 'New developments']

export default function Agents() {
  usePageMeta({
    title: 'Our agents',
    description: 'Meet the verified agents who list and manage property with us across Dhaka and Chattogram.',
  })

  const [query, setQuery] = useState('')
  const [agency, setAgency] = useState('')
  const [specialty, setSpecialty] = useState('')

  const results = useMemo(() => {
    const q = query.toLowerCase().trim()
    return AGENTS.filter((agent) => {
      if (q && ![agent.name, agent.location, agent.role, agent.agency, ...agent.specialties].join(' ').toLowerCase().includes(q)) return false
      if (agency && agent.agency !== agency) return false
      if (specialty && !agent.specialties.some((s) => s.toLowerCase().includes(specialty.toLowerCase()))) return false
      return true
    })
  }, [query, agency, specialty])

  return (
    <Container className="py-8 sm:py-12">
      <Reveal>
        <h1 className="text-page">Our agents</h1>
        <p className="mt-2 max-w-xl text-body text-muted">
          Every agent on Thikana Estates is known by name. They verify each listing before it goes live.
        </p>
      </Reveal>

      {/* Filters */}
      <div className="mt-8 flex flex-wrap gap-3">
        <div className="relative flex-1 min-w-[200px] max-w-xs">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted" aria-hidden="true" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by name or location"
            className="h-11 w-full rounded-control border border-line-strong bg-paper pl-10 pr-3.5 text-[0.9375rem] transition-colors placeholder:text-muted hover:border-ink focus-visible:border-brand focus-visible:outline-none"
          />
        </div>
        <select
          value={agency}
          onChange={(e) => setAgency(e.target.value === 'All agencies' ? '' : e.target.value)}
          className="h-11 rounded-control border border-line-strong bg-paper px-3.5 text-[0.9375rem] transition-colors hover:border-ink focus-visible:border-brand focus-visible:outline-none"
        >
          {AGENCIES.map((a) => <option key={a} value={a === 'All agencies' ? '' : a}>{a}</option>)}
        </select>
        <select
          value={specialty}
          onChange={(e) => setSpecialty(e.target.value === 'All specialties' ? '' : e.target.value)}
          className="h-11 rounded-control border border-line-strong bg-paper px-3.5 text-[0.9375rem] transition-colors hover:border-ink focus-visible:border-brand focus-visible:outline-none"
        >
          {SPECIALTIES.map((s) => <option key={s} value={s === 'All specialties' ? '' : s}>{s}</option>)}
        </select>
      </div>

      <p role="status" className="mt-6 text-meta text-muted">
        <span className="font-semibold text-ink">{results.length}</span> {results.length === 1 ? 'agent' : 'agents'}
      </p>

      {results.length === 0 ? (
        <EmptyState
          title="No agents found"
          message="Try adjusting your search or filters."
          actions={[{ label: 'Clear search', onClick: () => { setQuery(''); setAgency(''); setSpecialty('') }, variant: 'secondary' }]}
        />
      ) : (
        <Stagger interval={0.06} className="mt-8 grid gap-x-8 gap-y-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {results.map((agent) => (
            <StaggerItem key={agent.id}>
              <AgentCard agent={agent} />
            </StaggerItem>
          ))}
        </Stagger>
      )}
    </Container>
  )
}
