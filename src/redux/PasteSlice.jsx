import { createSlice } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';

export const pasteSlice = createSlice({
  name: 'pastes',
  initialState: {
    pastes: localStorage.getItem('paste')
      ? JSON.parse(localStorage.getItem('paste'))
      : [],
  },
  reducers: {
    // Add a new paste
    addToPaste: (state, action) => {
      const paste = action.payload;
      state.pastes.push(paste);
      localStorage.setItem('paste', JSON.stringify(state.pastes));
      toast.success('Paste created successfully');
    },

    // Update an existing paste
    updateToPaste: (state, action) => {
      const paste = action.payload;
      const index = state.pastes.findIndex((item) => item._id === paste._id);
      if (index >= 0) {
        state.pastes[index] = paste;
        localStorage.setItem('paste', JSON.stringify(state.pastes));
        toast.success('Paste updated successfully');
        
      }
    },

    // Reset all pastes
    resetAllPaste: (state) => {
      state.pastes = [];
      localStorage.removeItem('paste');
      toast.success('All pastes deleted successfully');
    },

    // Delete a specific paste
    deletePaste: (state, action) => {
      state.pastes = state.pastes.filter(
        (paste) => paste._id !== action.payload
      );
    },
    // Other reducers like addPaste, updatePaste, etc.
  },
});

// Correct export for reducers
export const { addToPaste, deletePaste, resetAllPaste, updateToPaste } =
  pasteSlice.actions;

export default pasteSlice.reducer;
