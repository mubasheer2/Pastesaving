import { configureStore } from '@reduxjs/toolkit'
import { pasteSlice } from './redux/PasteSlice'

export default configureStore({
  reducer: {
    paste : pasteSlice.reducer
  }
})