import {
  ArrowTrendingUpIcon,
  CalendarDaysIcon,
  HandRaisedIcon,
} from "@heroicons/react/24/outline";
import { Mail } from "lucide-react";
import { useState } from "react";
import { toast } from "react-toastify";

export const NewsletterSection = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault(); // prevent page reload
    setIsSubmitting(true);

    try {
      const response = await fetch("https://formspree.io/f/xovkweow", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setTimeout(() => {
          toast.success("Subscribed To Newsletter");
          setIsSubmitting(false);
          setEmail("");
        }, 2000);
      } else {
        toast.error("❌ Something went wrong!");
        setIsSubmitting(false);
      }
    } catch (error) {
      toast.error("❌ Error: " + error.message);
      setIsSubmitting(false);
    }
  };

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
              <form onSubmit={handleSubmit} className="flex max-w-md gap-x-4">
                <label htmlFor="email" className="sr-only">
                  Email address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="Enter your email.."
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-auto rounded-md border border-blue-500 bg-white px-3.5 py-2 text-base text-black outline-none placeholder:text-gray-500 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 sm:text-sm"
                />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex items-center gap-2 rounded-md bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                >
                  {isSubmitting ? "Subscribing..." : "Subscribe"}{" "}
                  <Mail className="h-5 w-5" />
                </button>
              </form>
            </div>
          </div>

          {/* Feature cards */}
          <dl className="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-3 lg:pt-2">
            <div className="flex flex-col items-start shadow-lg hover:shadow-blue-300 rounded-lg p-2">
              <CalendarDaysIcon aria-hidden="true" className="h-6 w-6 text-blue-800" />
              <dt className="mt-4 text-base font-semibold text-blue-800">
                Career Insight
              </dt>
              <dd className="mt-2 text-base/7">
                Get weekly tips, market trends, and career growth hacks to help
                you choose the right path.
              </dd>
            </div>

            <div className="flex flex-col items-start shadow-lg hover:shadow-blue-300 rounded-lg p-2">
              <ArrowTrendingUpIcon aria-hidden="true" className="h-6 w-6 text-blue-800" />
              <dt className="mt-4 text-base font-semibold text-blue-800">
                Skill Boosts
              </dt>
              <dd className="mt-2 text-base/7">
                Receive curated learning resources and roadmap suggestions
                tailored to in-demand skills.
              </dd>
            </div>

            <div className="flex flex-col items-start shadow-lg hover:shadow-blue-300 rounded-lg p-2">
              <HandRaisedIcon aria-hidden="true" className="h-6 w-6 text-blue-800" />
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
    </section>
  );
};
