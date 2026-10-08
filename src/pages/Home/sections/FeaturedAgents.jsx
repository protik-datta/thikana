import Container from '@/components/ui/Container'
import SectionHeader from '@/components/common/SectionHeader'
import { Stagger, StaggerItem } from '@/components/common/Reveal'
import AgentCard from '@/components/agent/AgentCard'
import { AGENTS } from '@/data/agents'

export default function FeaturedAgents() {
  return (
    <section aria-labelledby="agents-heading" className="pt-24 sm:pt-32">
      <Container>
        <SectionHeader
          headingId="agents-heading"
          title="Agents who know the area"
          description="Each agent lists only in the neighbourhoods where they work every day."
          linkTo="/agents"
          linkLabel="Meet all agents"
        />

        <Stagger as="ul" interval={0.07} className="mt-10 grid grid-cols-2 gap-x-4 gap-y-10 lg:grid-cols-4 lg:gap-x-8">
          {AGENTS.slice(0, 4).map((agent) => (
            <StaggerItem as="li" key={agent.id}>
              <AgentCard agent={agent} />
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </section>
  )
}
