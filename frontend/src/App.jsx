import { useState } from "react";
import axios from "axios";

function App() {
  const [skills, setSkills] = useState("");
  const [career, setCareer] = useState(null);

  const handlePredict = async () => {
    try {
      const res = await axios.post("/api/predict-career/", {
        skills: skills.split(",").map(s => s.trim())
      });
      setCareer(res.data.predicted_career);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6">Elevare 🚀</h1>
      <input
        type="text"
        placeholder="Enter skills (comma separated)"
        value={skills}
        onChange={(e) => setSkills(e.target.value)}
        className="border rounded-lg p-2 w-80 mb-4"
      />
      <button
        onClick={handlePredict}
        className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md"
      >
        Predict Career
      </button>
      {career && (
        <div className="mt-6 p-4 bg-white rounded-xl shadow-md">
          <p className="text-lg font-medium">
            Suggested Career: <span className="text-blue-700">{career}</span>
          </p>
        </div>
      )}
    </div>
  );
}

export default App;
