import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface GlobalSliceType {
  isAuthenticated: boolean
}

const initialState: GlobalSliceType = {
  isAuthenticated:false,
}

export const globalSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    handleIsAuthenticated: (state,action: PayloadAction<boolean>) => {
      state.isAuthenticated=action.payload
    },
    
  },
})

export const { handleIsAuthenticated } = globalSlice.actions

export default globalSlice.reducer