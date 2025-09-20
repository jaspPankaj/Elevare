import {
  ArrowTrendingUpIcon,
  CalendarDaysIcon,
  HandRaisedIcon,
} from "@heroicons/react/24/outline";

export const NewsletterSection = () => {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center gap-4 px-4 p-8 text-black">
      <div className="px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-2 ">
          <div className="space-y-4 ">
            <h2 className="text-4xl font-semibold tracking-tight text-blue-600">
              Subscribe to Career Updates
            </h2>
            <p className="text-lg">
              Stay ahead with the latest insights on careers, skills, and
              learning trends. Get updates delivered straight to your inbox.
            </p>
            <div className="flex max-w-md gap-x-4">
              <form
                action="https://formspree.io/f/xovngybn"
                method="POST"
                className="flex max-w-md gap-x-4"
              >
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  required
                  placeholder="Enter your email"
                  autoComplete="email"
                  className="flex-auto rounded-md border border-blue-500 bg-white px-3.5 py-2 text-base text-black outline-none placeholder:text-gray-500 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 sm:text-sm"
                />
                <button
                  type="submit"
                  className="flex-none rounded-md bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
          <dl className="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-3 lg:pt-2">
            <div className="flex flex-col items-start shadow-lg hover:shadow-blue-300 rounded-lg p-2">
              <div className="rounded-md bg-white/5 p-2 ring-1 ring-white/10">
                <CalendarDaysIcon
                  aria-hidden="true"
                  className="size-6 text-blue-800"
                />
              </div>
              <dt className="mt-4 text-base font-semibold text-blue-800">
                Career Insight
              </dt>
              <dd className="mt-2 text-base/7">
                Get weekly tips, market trends, and career growth hacks to help
                you choose the right path.
              </dd>
            </div>
            <div className="flex flex-col items-start shadow-lg hover:shadow-blue-300 rounded-lg p-2">
              <div className="rounded-md bg-white/5 p-2 ring-1 ring-white/10">
                <ArrowTrendingUpIcon
                  aria-hidden="true"
                  className="size-6 text-blue-800"
                />
              </div>
              <dt className="mt-4 text-base font-semibold text-blue-800">
                Skill Boosts
              </dt>
              <dd className="mt-2 text-base/7">
                Receive curated learning resources and roadmap suggestions
                tailored to in-demand skills.
              </dd>
            </div>
            <div className="flex flex-col items-start shadow-lg hover:shadow-blue-300 rounded-lg p-2">
              <div className="rounded-md bg-white/5 p-2 ring-1 ring-white/10">
                <HandRaisedIcon
                  aria-hidden="true"
                  className="size-6 text-blue-800"
                />
              </div>
              <dt className="mt-4 text-base font-semibold text-blue-800">
                No Spam, Only Values
              </dt>
              <dd className="mt-2 text-base/7">
                We respect your inbox. Only useful and career-focused content—no
                clutter, no noise.
              </dd>
            </div>
          </dl>
        </div>
      </div>
      <div
        aria-hidden="true"
        className="absolute top-0 left-1/2 -z-10 -translate-x-1/2 blur-3xl xl:-top-6"
      >
        <div
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
          className="aspect-1155/678 w-288.75 bg-linear-to-tr from-[#ff80b5] to-[#9089fc] opacity-30"
        />
      </div>
    </section>
  );
};
