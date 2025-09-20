import { EnvelopeIcon } from "@heroicons/react/24/outline";
import { Github, Twitter, FolderKanban, Linkedin } from "lucide-react";

export const TeamSection = () => {
  return (
    <section  className="relative flex flex-col items-center justify-center gap-4 px-4 p-8">
      <h1 className="text-3xl md:text-5xl font-bold">Our Team</h1>
      <p className="text-xl">
        We’re a dynamic group of individuals who are passionate about what we do
        and dedicated to delivering the best results for our clients.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 justify-evenly">
        <div className="flex flex-col">
          <img
            src="/ishika.png"
            alt="Ishika Pal Pic"
            className="w-sm rounded-lg shadow-md hover:shadow-blue-300"
          />
          <div className="flex gap-4 justify-around items-center">
            <div>
              <h1 className="text-xl font-bold mt-4">Ishika Pal</h1>
              <h3 className="text-md font-semibold">Developer</h3>
            </div>
            <div className="flex  gap-2">
              <a
                title="Github"
                href="https://github.com/Ishikaapal"
                target="blank"
                className=" bg-gray-100 border-2 rounded-xl p-2 hover:bg-black hover:text-white transition-all duration-200"
              >
                <Github className="h-8 w-8" />
              </a>
              <a
                title="Github"
                href="https://www.linkedin.com/in/ishikaapal/"
                target="blank"
                className=" bg-gray-100 border-2 rounded-xl p-2 hover:bg-blue-600 hover:text-white transition-all duration-200"
              >
                <Linkedin className="h-8 w-8" />
              </a>

              <a
                title="Email"
                href="mailto:ishh.tech@gmail.com"
                target="blank"
                className=" bg-gray-100 border-2 rounded-xl p-2 hover:bg-black hover:text-white transition-all duration-200"
              >
                <EnvelopeIcon className="h-8 w-8" />
              </a>
            </div>
          </div>
        </div>
        <div className="flex flex-col">
          <img
            src="/pankaj.png"
            alt="Ishika Pal Pic"
            className="w-sm rounded-lg shadow-md hover:shadow-blue-300"
          />
          <div className="flex gap-4 justify-around items-center">
            <div>
              <h1 className="text-xl font-bold mt-4">Pankaj</h1>
              <h3 className="text-md font-semibold">Developer</h3>
            </div>
            <div className="flex  gap-2">
              <a
                title="Portfolio"
                href="https://github.com/jasppankaj"
                target="blank"
                className=" bg-gray-100 border-2 rounded-xl p-2 hover:bg-black hover:text-white transition-all duration-200"
              >
                <Github className="h-8 w-8" />
              </a>
              <a
                title="Github"
                href="https://www.linkedin.com/in/jasppankaj/"
                target="blank"
                className=" bg-gray-100 border-2 rounded-xl p-2 hover:bg-blue-600 hover:text-white transition-all duration-200"
              >
                <Linkedin className="h-8 w-8" />
              </a>

              <a
                title="Email"
                href="mailto:jasp.pankaj@gmail.com"
                target="blank"
                className=" bg-gray-100 border-2 rounded-xl p-2 hover:bg-black hover:text-white transition-all duration-200"
              >
                <EnvelopeIcon className="h-8 w-8" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
