import { useState } from "react";
import api from "../api";
import {
  courses,
  specializations,
  skills,
  certifications,
  interests,
} from "../data/inputData";
import { useAuth } from "../components/AuthContext";
import { AuroraBackground } from "../components/ui/aurora-background";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function Dashboard() {
  const { user, isAuthenticated } = useAuth();
  if (!isAuthenticated) {
    return <p className="text-center mt-10">You must log in to view this page.</p>;
  }
  const navigate = useNavigate();

  const [form, setForm] = useState({
    ug_course: "",
    ug_specialization: "",
    skills: [],
    interests: [],
    ug_cgpa: "",
    certifications: [],
    experience_years: "",
  });

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  // Autocomplete states
  const [query, setQuery] = useState("");
  const [filteredCourses, setFilteredCourses] = useState(courses);
  const [skillQuery, setSkillQuery] = useState("");
  const [filteredSkills, setFilteredSkills] = useState([]);
  const [interestQuery, setInterestQuery] = useState("");
  const [filteredInterests, setFilteredInterests] = useState([]);
  const [certQuery, setCertQuery] = useState("");
  const [filteredCerts, setFilteredCerts] = useState([]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleCourseChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    setForm({ ...form, ug_course: value, ug_specialization: "" });
    setFilteredCourses(
      courses.filter((course) =>
        course.toLowerCase().includes(value.toLowerCase())
      )
    );
  };

  const handleSelectCourse = (course) => {
    setForm({ ...form, ug_course: course, ug_specialization: "" });
    setQuery(course);
    setFilteredCourses([]);
  };

  const handleSelectOrAdd = (field, value, list) => {
    if (!form[field].includes(value)) {
      setForm({ ...form, [field]: [...form[field], value] });
      if (!list.includes(value)) list.push(value);
    }
    if (field === "skills") setSkillQuery("");
    if (field === "interests") setInterestQuery("");
    if (field === "certifications") setCertQuery("");
  };

  const handleRemoveItem = (field, value) => {
    setForm({ ...form, [field]: form[field].filter((i) => i !== value) });
  };

  const handleSkillChange = (e) => {
    const value = e.target.value;
    setSkillQuery(value);
    setFilteredSkills(
      skills.filter(
        (s) =>
          s.toLowerCase().includes(value.toLowerCase()) &&
          !form.skills.includes(s)
      )
    );
  };

  const handleInterestChange = (e) => {
    const value = e.target.value;
    setInterestQuery(value);
    setFilteredInterests(
      interests.filter(
        (i) =>
          i.toLowerCase().includes(value.toLowerCase()) &&
          !form.interests.includes(i)
      )
    );
  };

  const handleCertChange = (e) => {
    const value = e.target.value;
    setCertQuery(value);
    setFilteredCerts(
      certifications.filter(
        (c) =>
          c.toLowerCase().includes(value.toLowerCase()) &&
          !form.certifications.includes(c)
      )
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);
    try {
      const res = await api.post("predict/", form);
      setResult(res.data);
      setForm({
  ug_course: "",
  ug_specialization: "",
  skills: [],
  interests: [],
  ug_cgpa: "",
  certifications: [],
  experience_years: "",
});

      window.location.hash = "#predictCareer";
      toast.success("Prediction completed!");

      
    } catch (err) {
      toast.error(err.response?.data?.error || "Something went wrong!");
    }
    setLoading(false);
  };

  const specializationOptions = specializations[form.ug_course] || ["Other"];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-white to-pink-100 relative overflow-x-hidden">
      

      <div className="px-4 py-16 grid grid-cols-1 gap-6 mt-8">
        <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-8 shadow-2xl">
          <h1 className="text-3xl font-bold text-indigo-700 mb-6 text-center">
            Fill Form to Predict Career
          </h1>
          <form className="space-y-5" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="relative">
                <label className="block font-medium mb-1">Courses</label>
                <input
                  type="text"
                  value={query}
                  onChange={handleCourseChange}
                  placeholder="Search Courses..."
                  className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                />
                {filteredCourses.length > 0 && query && (
                  <ul className="absolute z-10 w-full bg-white border rounded shadow max-h-40 overflow-y-auto mt-1">
                    {filteredCourses.map((course, idx) => (
                      <li
                        key={idx}
                        className="px-3 py-2 cursor-pointer hover:bg-indigo-100"
                        onClick={() => handleSelectCourse(course)}
                      >
                        {course}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <div>
                <label className="block font-medium mb-1"> Course Specialization</label>
                <select
                  name="ug_specialization"
                  value={form.ug_specialization}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  disabled={!form.ug_course}
                  required
                >
                  <option value="">Select specialization</option>
                  {specializationOptions.map((spec, idx) => (
                    <option key={idx} value={spec}>
                      {spec}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <MultiSelectField
                label="Skills"
                items={form.skills}
                query={skillQuery}
                filteredItems={filteredSkills}
                onChange={handleSkillChange}
                onSelect={(val) => handleSelectOrAdd("skills", val, skills)}
                onRemove={(val) => handleRemoveItem("skills", val)}
              />
              <MultiSelectField
                label="Interests"
                items={form.interests}
                query={interestQuery}
                filteredItems={filteredInterests}
                onChange={handleInterestChange}
                onSelect={(val) => handleSelectOrAdd("interests", val, interests)}
                onRemove={(val) => handleRemoveItem("interests", val)}
              />
            </div>

            <MultiSelectField
              label="Certifications"
              items={form.certifications}
              query={certQuery}
              filteredItems={filteredCerts}
              onChange={handleCertChange}
              onSelect={(val) => handleSelectOrAdd("certifications", val, certifications)}
              onRemove={(val) => handleRemoveItem("certifications", val)}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block font-medium mb-1">UG CGPA</label>
                <input
                  type="number"
                  min="0"
                  max="10"
                  name="ug_cgpa"
                  value={form.ug_cgpa}
                  onChange={handleChange}
                  placeholder="e.g. 8.5"
                  className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>
              <div>
                <label className="block font-medium mb-1">Experience (years)</label>
                <input
                  type="number"
                  min="0"
                  name="experience_years"
                  value={form.experience_years}
                  onChange={handleChange}
                  placeholder="e.g. 2"
                  className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition disabled:opacity-60"
              disabled={loading}
            >
              {loading ? "Predicting..." : "Predict Career"}
            </button>
          </form>
        </div>

        <div id="predictCareer">
          {!result ? (
            <div className="text-center text-gray-700 mt-4">Fill the form for results.</div>
          ) : (
            <div className="bg-white/70 backdrop-blur-lg p-6 rounded-2xl shadow-xl mt-4 space-y-6">
              <h2 className="text-2xl font-bold text-indigo-700 text-center mb-4">
                🎯 Predicted Career Paths
              </h2>
              <div className="grid grid-cols-1 gap-4">
                {result.career_paths.map((path, i) => (
                  <div
                    key={i}
                    className="border border-gray-200 rounded-xl p-5 shadow-md hover:shadow-xl transition duration-300 bg-white"
                  >
                    <h3 className="text-xl font-semibold text-indigo-600 mb-2">
                      {path.title}
                    </h3>
                    <p className="text-gray-700 mb-3">{path.description}</p>

                    <div className="mb-4">
                      <p className="font-medium text-gray-800 mb-1">Required Skills:</p>
                      <div className="flex flex-wrap gap-2">
                        {path.required_skills.map((s, idx) => (
                          <span
                            key={idx}
                            className="px-3 py-1 bg-indigo-100 text-indigo-700 text-sm rounded-full shadow-sm"
                          >
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="border-t border-gray-200 pt-3">
                      <p className="font-medium text-gray-800 mb-2">Roadmap:</p>
                      <ul className="space-y-1 text-gray-600 text-sm">
                        <li>
                          <span className="font-semibold text-indigo-600">Short-term:</span>{" "}
                          {path.roadmap.short_term.join(", ")}
                        </li>
                        <li>
                          <span className="font-semibold text-indigo-600">Medium-term:</span>{" "}
                          {path.roadmap.medium_term.join(", ")}
                        </li>
                        <li>
                          <span className="font-semibold text-indigo-600">Long-term:</span>{" "}
                          {path.roadmap.long_term.join(", ")}
                        </li>
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// MultiSelectField Component
function MultiSelectField({ label, items, query, filteredItems, onChange, onSelect, onRemove }) {
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && query.trim() !== "") {
      e.preventDefault();
      onSelect(query.trim());
    }
  };

  return (
    <div className="relative">
      <label className="block font-medium mb-1">{label}</label>

      <input
        type="text"
        value={query}
        onChange={onChange}
        onKeyDown={handleKeyDown}
        placeholder={`Type or select ${label.toLowerCase()}...`}
        className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 mb-1"
      />

      <div className="flex flex-wrap gap-2 mb-1">
        {items.map((item, idx) => (
          <span
            key={idx}
            className="bg-indigo-100 text-indigo-700 px-2 py-1 rounded-full flex items-center gap-1"
          >
            {item}
            <button
              type="button"
              onClick={() => onRemove(item)}
              className="font-bold text-indigo-700"
            >
              ×
            </button>
          </span>
        ))}
      </div>

      {filteredItems.length > 0 && query && (
        <ul className="absolute z-10 w-full bg-white border rounded shadow max-h-40 overflow-y-auto mt-1">
          {filteredItems.map((item, idx) => (
            <li
              key={idx}
              className="px-3 py-2 cursor-pointer hover:bg-indigo-100"
              onClick={() => onSelect(item)}
            >
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
