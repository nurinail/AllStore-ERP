import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface GlobalSliceType {
  isAuthenticated: boolean;
  isTable:boolean;
}

const initialState: GlobalSliceType = {
  isAuthenticated:false,
  isTable:false,
}

export const globalSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    handleIsAuthenticated: (state,action: PayloadAction<boolean>) => {
      state.isAuthenticated=action.payload
    },
    handleIsTable: (state,action: PayloadAction<boolean>) => {
      state.isTable=action.payload
    },
    
  },
})

export const { handleIsAuthenticated,handleIsTable } = globalSlice.actions

export default globalSlice.reducer