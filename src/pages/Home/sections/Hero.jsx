import { motion } from 'framer-motion'
import Container from '@/components/ui/Container'
import Img from '@/components/ui/Img'
import HeroSearch from '@/components/search/HeroSearch'
import { IMAGES, photo } from '@/data/images'
import { DURATION, EASE, reveal, stagger } from '@/lib/motion'

const imageEnter = {
  hidden: { opacity: 0, scale: 1.04 },
  visible: { opacity: 1, scale: 1, transition: { duration: 1, ease: EASE } },
}

export default function Hero() {
  return (
    <section aria-labelledby="hero-heading" className="pt-3 sm:pt-5">
      <Container>
        <motion.div variants={stagger(0.12, 0.1)} initial="hidden" animate="visible">
          <div className="relative min-h-[28rem] overflow-hidden rounded-surface bg-canvas sm:h-[32rem] lg:h-[36rem]">
            <motion.div variants={imageEnter} className="absolute inset-0">
              <Img
                eager
                src={photo(IMAGES.hero, 2000)}
                alt="Contemporary house with timber cladding and a lit entrance at dusk"
                className="size-full"
              />
            </motion.div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/25 to-black/5" aria-hidden="true" />

            <div className="relative flex h-full min-h-[28rem] flex-col justify-end px-5 pt-16 pb-24 text-paper sm:px-10 sm:pb-28 lg:px-14 lg:pb-32">
              <motion.h1 variants={reveal} id="hero-heading" className="max-w-2xl text-[2.125rem] font-semibold leading-[1.08] tracking-[-0.025em] sm:text-page lg:text-[3.75rem] lg:leading-[1.05]">
                Homes in Dhaka, checked before they are listed
              </motion.h1>
              <motion.p variants={reveal} className="mt-4 max-w-lg text-body text-paper/85 sm:text-lead">
                Apartments, houses and land from agents we have met in person, with ownership papers reviewed by our team.
              </motion.p>
            </div>
          </div>

          <motion.div
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { duration: DURATION.slow, ease: EASE } },
            }}
            className="relative z-10 -mt-16 px-2 sm:-mt-20 sm:px-8 lg:-mt-24 lg:px-14"
          >
            <HeroSearch />
          </motion.div>
        </motion.div>
      </Container>
    </section>
  )
}
