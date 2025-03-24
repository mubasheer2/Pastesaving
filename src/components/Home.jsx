import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { addToPaste, updateToPaste } from "../redux/PasteSlice";

function Home() {
  const [title, setTitle] = useState("");
  const [value, setValue] = useState("");
  const [params, setParams] = useSearchParams();
  const pasteId = params.get("pasteid");

  const dispatch = useDispatch();
  const allPastes = useSelector((state) => state.paste.pastes || []);

  // Create or update paste
  function Createpaste() {
    if (!title.trim() || !value.trim()) {
      alert("Both title and notes content must be provided.");
      return;
    }

    const paste = {
      title,
      value,
      _id: pasteId || Math.random().toString(36).substr(2, 9),
      createdAt: new Date().toISOString(),
    };

    if (pasteId) {
      dispatch(updateToPaste(paste));
    } else {
      dispatch(addToPaste(paste));
    }

    // Clear form inputs
    setTitle("");
    setValue("");
    setParams("");
  }

  // Load existing paste when editing
  useEffect(() => {
    if (pasteId) {
      const paste = allPastes.find((item) => item._id === pasteId);

      if (paste) {
        setTitle(paste.title);
        setValue(paste.value);
      }
    }
  }, [pasteId, allPastes]);

  return (
    <div className="bg-gray-900 text-white min-h-screen flex flex-col items-center">
     

      {/* Main Content */}
      <div className="p-6 w-full max-w-5xl flex flex-col items-center">
        {/* Title and Create/Update Button */}
        <div className="w-full flex flex-col gap-4 mt-6">
          <div className="flex gap-4">
            <input
              type="text"
              className="flex-grow p-4 text-lg rounded-lg border border-gray-700 bg-gray-800 text-white shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Enter title here (e.g., Grocery List)"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <button
              onClick={Createpaste}
              className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-md text-lg font-semibold transition-all"
            >
              {pasteId ? "Update Paste" : "Create Paste"}
            </button>
          </div>
        </div>

        {/* Textarea for Notes */}
        <div className="w-full mt-6">
          <textarea
            className="w-full h-96 p-6 text-lg rounded-lg border border-gray-700 bg-gray-800 text-white shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none resize-none"
            placeholder="Enter your notes here (e.g., Milk, Eggs, Bread...)"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}

export default Home;
