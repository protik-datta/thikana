import { AGENTS } from '@/data/agents'

const BY_ID = new Map(AGENTS.map((agent) => [agent.id, agent]))
const BY_SLUG = new Map(AGENTS.map((agent) => [agent.slug, agent]))

export const getAgentById = (id) => BY_ID.get(id)
export const getAgentBySlug = (slug) => BY_SLUG.get(slug)
