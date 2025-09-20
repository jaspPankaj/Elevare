import { useEffect, useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import api from "../api";

// Reusable Accordion Item
function AccordionItem({ title, timestamp, children }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border border-gray-200 rounded-lg shadow mb-4 bg-white">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex justify-between items-center px-4 py-3 text-left text-lg font-semibold text-indigo-600"
      >
        <span>{title}</span>
        <ChevronDownIcon
          className={`h-5 w-5 text-gray-500 transform transition-transform duration-300 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {open && (
        <div className="px-4 pb-4 text-gray-700 border-t border-gray-100">
          {/* Timestamp */}
          <p className="text-sm text-gray-500 mt-2 mb-4">{timestamp}</p>
          {children}
        </div>
      )}
    </div>
  );
}

export default function History() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    api
      .get("/history/")
      .then((res) => setHistory(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="max-w-5xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center mt-24">
        Your Career Prediction History
      </h1>

      {history.length === 0 ? (
        <p className="text-gray-600 text-center">No history yet.</p>
      ) : (
        history.map((item) => (
          <div key={item.id}>
            {item.prediction?.career_paths?.map((path, idx) => (
              <AccordionItem
                key={idx}
                title={path.title}
                timestamp={new Date(item.created_at).toLocaleString()}
              >
                {/* Description */}
                <p className="mb-3">{path.description}</p>

                {/* Required Skills */}
                <div className="mb-3">
                  <h3 className="font-medium text-gray-800">Required Skills:</h3>
                  <ul className="list-disc list-inside text-gray-600">
                    {path.required_skills.map((skill, i) => (
                      <li key={i}>{skill}</li>
                    ))}
                  </ul>
                </div>

                {/* Roadmap */}
                <div>
                  <h3 className="font-medium text-gray-800 mb-2">Roadmap:</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <h4 className="text-sm font-semibold text-indigo-500">
                        Short Term
                      </h4>
                      <ul className="list-disc list-inside text-gray-600 text-sm">
                        {path.roadmap.short_term.map((step, i) => (
                          <li key={i}>{step}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-indigo-500">
                        Medium Term
                      </h4>
                      <ul className="list-disc list-inside text-gray-600 text-sm">
                        {path.roadmap.medium_term.map((step, i) => (
                          <li key={i}>{step}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-indigo-500">
                        Long Term
                      </h4>
                      <ul className="list-disc list-inside text-gray-600 text-sm">
                        {path.roadmap.long_term.map((step, i) => (
                          <li key={i}>{step}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </AccordionItem>
            ))}
          </div>
        ))
      )}
    </div>
  );
}
