import { ArrowPathIcon, ArrowUpRightIcon, ChartPieIcon, ClipboardDocumentCheckIcon, CloudArrowUpIcon, FingerPrintIcon, HeartIcon, LockClosedIcon, PuzzlePieceIcon ,} from '@heroicons/react/24/outline'

const features = [
  {
    name: 'Skill Gap Finder',
    description:
      'See what’s missing at a glance! Instantly identify the skills you need to bridge the gap between today and your dream career.',
    icon: ChartPieIcon,
  },
  {
    name: 'Smart Learnig Roadmap',
    description:
      'Stop searching endlessly. Get a clear, personalized roadmap with curated courses, projects, and resources—all in one place.',
    icon: ClipboardDocumentCheckIcon,
  },
  {
    name: 'AI Mentor at Your Side',
    description:
      'Your personal AI-powered guide that learns from you and delivers smarter, more accurate career and skill insights every step of the way.',
    icon: HeartIcon,
  },
  {
    name: 'Intractive Progress Tracker',
    description:
      'Stay motivated with a visual dashboard that tracks your learning milestones, completed skills, and growth toward your career goals.',
    icon: ArrowUpRightIcon,
  },
]

export const FeatureSection = () =>{
    return(
      <section className="relative min-h-screen flex flex-col items-center justify-center gap-4 px-4 p-8">
        <div className="mx-auto text-center">
          
          <p className="mt-2 text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl lg:text-balance">
            Path Finder , Find Your Future. 
          </p>
          <p className="mt-6 text-lg/8 text-gray-700">
            Unlock your true potential with tailored career suggestions based on your passions, 
            skills, and goals. Say goodbye to confusion and hello to clarity.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
            {features.map((feature) => (
              <div key={feature.name} className="relative pl-16">
                <dt className="text-base/7 font-semibold text-gray-900">
                  <div className="absolute top-0 left-0 flex size-10 items-center justify-center rounded-lg bg-indigo-600">
                    <feature.icon aria-hidden="true" className="size-6 text-white" />
                  </div>
                  {feature.name}
                </dt>
                <dd className="mt-2 text-base/7 text-gray-600">{feature.description}</dd>
              </div>
            ))}
          </dl>
        </div>


    </section>
    )
}