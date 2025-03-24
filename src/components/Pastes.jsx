import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deletePaste } from "../redux/PasteSlice";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

function Pastes() {
  const paste = useSelector((state) => state.paste.pastes || []); // Get pastes from Redux
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();

  // Filtered data based on search input
  const filterData = paste.filter((paste) =>
    paste.title.toLowerCase().includes(search.toLowerCase())
  );

  // Handle delete
  function handledelete(pasteId) {
    if (window.confirm("Are you sure you want to delete this paste?")) {
      dispatch(deletePaste(pasteId)); // Dispatch delete action
      toast.success("Paste deleted successfully");
    }
  }

  // Handle copy
  function handlecopy(content) {
    navigator.clipboard.writeText(content);
    toast.success("Content copied!");
  }

  // Handle share
  function handleshare() {
    navigator.clipboard.writeText(window.location.href);
    toast.success("Link copied!");
  }

  return (
    <div className="p-5 bg-gray-900 min-h-screen text-white">
      {/* Search Bar */}
      <div className="mb-5 flex justify-center">
        <input
          className="p-3 rounded-lg w-full max-w-[600px] bg-gray-800 text-white placeholder-gray-400 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="search"
          placeholder="Search your paste here..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Paste List */}
      <div className="space-y-5">
        {filterData.length > 0 ? (
          filterData.map((paste) => (
            <div
              key={paste._id}
              className="p-4 bg-gray-800 rounded-lg shadow-md border border-gray-700"
            >
              <div className="text-xl font-semibold mb-2 text-blue-400">
                {paste.title}
              </div>
              <div className="text-gray-300 mb-4">{paste.content}</div>
              <div className="flex justify-between items-center mt-4">
                <div className="text-sm text-gray-500">
                  Created At: {new Date(paste.createdAt).toLocaleString()}
                </div>
                <div className="flex gap-3">
                  <Link
                    to={`/?pasteid=${paste._id}`}
                    className="px-3 py-1 text-sm bg-blue-600 hover:bg-blue-700 rounded-md"
                  >
                    Edit
                  </Link>
                  <Link
                    to={`/paste/pasteid/${paste._id}`}
                    className="px-3 py-1 text-sm bg-green-600 hover:bg-green-700 rounded-md"
                  >
                    View
                  </Link>
                  <button
                    onClick={() => handledelete(paste._id)}
                    className="px-3 py-1 text-sm bg-red-600 hover:bg-red-700 rounded-md"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => handlecopy(paste.content)}
                    className="px-3 py-1 text-sm bg-yellow-600 hover:bg-yellow-700 rounded-md"
                  >
                    Copy
                  </button>
                  <button
                    onClick={handleshare}
                    className="px-3 py-1 text-sm bg-purple-600 hover:bg-purple-700 rounded-md"
                  >
                    Share
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-400">No pastes found.</p>
        )}
      </div>
    </div>
  );
}

export default Pastes;
