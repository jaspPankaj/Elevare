import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import api from "../api";

export default function CareerForm() {
  const [career, setCareer] = useState("");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!career) {
      toast.error("Please enter a career name");
      return;
    }
    setLoading(true);
    setData(null);

    try {
      const response = await api.post(
        "career/",
        { career },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setData(response.data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch career details");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-white to-pink-100 flex items-center justify-center px-4">
      <div className="w-full max-w-4xl">
        <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-10 mt-24">
          🚀 Career <span className="text-indigo-600">Details Finder</span>
        </h1>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="flex gap-3 justify-center mb-10"
        >
          <input
            type="text"
            value={career}
            onChange={(e) => setCareer(e.target.value)}
            placeholder="Enter a career (e.g., Data Scientist)"
            className="flex-1 border border-gray-300 rounded-2xl px-5 py-3 shadow-sm focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 outline-none text-gray-700"
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-indigo-600 text-white px-6 py-3 rounded-2xl shadow-md hover:bg-indigo-700 transition disabled:opacity-50"
          >
            {loading ? "Loading..." : "Get Roadmap"}
          </button>
        </form>

        {/* Results */}
        {data && (
          <div className="space-y-8">
            {/* Skills */}
            <div className="bg-white/70 backdrop-blur-lg shadow-lg rounded-2xl p-6 hover:shadow-xl transition">
              <h2 className="text-2xl font-bold text-indigo-700 mb-3 flex items-center gap-2">
                🛠️ Required Skills
              </h2>
              <ul className="list-disc list-inside space-y-1 text-gray-700">
                {data.required_skills.map((skill, idx) => (
                  <li key={idx}>{skill}</li>
                ))}
              </ul>
            </div>

            {/* Free Courses */}
            <div className="bg-white/70 backdrop-blur-lg shadow-lg rounded-2xl p-6 hover:shadow-xl transition">
              <h2 className="text-2xl font-bold text-indigo-700 mb-3 flex items-center gap-2">
                📚 Free Courses
              </h2>
              <ul className="space-y-4">
                {data.free_courses.map((course, idx) => (
                  <li
                    key={idx}
                    className="p-4 rounded-xl border border-gray-200 bg-gradient-to-r from-indigo-50 to-pink-50 hover:shadow-md transition"
                  >
                    <p className="font-semibold text-gray-800">
                      {course.title}{" "}
                      <span className="text-sm text-gray-500">
                        ({course.platform})
                      </span>
                    </p>
                    <a
                      href={course.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-indigo-600 hover:text-indigo-800 text-sm underline"
                    >
                      Visit Course →
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Roadmap */}
            <div className="bg-white/70 backdrop-blur-lg shadow-lg rounded-2xl p-6 hover:shadow-xl transition">
              <h2 className="text-2xl font-bold text-indigo-700 mb-4 flex items-center gap-2">
                🛤️ Roadmap
              </h2>
              <div className="grid md:grid-cols-3 gap-6">
                {/* Short Term */}
                <div className="p-4 border rounded-xl bg-indigo-50">
                  <h3 className="font-semibold text-indigo-800 mb-2">
                    Short Term
                  </h3>
                  <ul className="list-disc list-inside text-gray-700 space-y-1">
                    {data.roadmap.short_term.map((step, idx) => (
                      <li key={idx}>{step}</li>
                    ))}
                  </ul>
                </div>

                {/* Medium Term */}
                <div className="p-4 border rounded-xl bg-pink-50">
                  <h3 className="font-semibold text-pink-800 mb-2">
                    Medium Term
                  </h3>
                  <ul className="list-disc list-inside text-gray-700 space-y-1">
                    {data.roadmap.medium_term.map((step, idx) => (
                      <li key={idx}>{step}</li>
                    ))}
                  </ul>
                </div>

                {/* Long Term */}
                <div className="p-4 border rounded-xl bg-green-50">
                  <h3 className="font-semibold text-green-800 mb-2">
                    Long Term
                  </h3>
                  <ul className="list-disc list-inside text-gray-700 space-y-1">
                    {data.roadmap.long_term.map((step, idx) => (
                      <li key={idx}>{step}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      
    </div>
  );
}
