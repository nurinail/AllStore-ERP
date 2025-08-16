import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface GlobalSliceType {
  isAuthenticated: boolean;
  isTable:boolean;
  isPostRequest:boolean;
}

const initialState: GlobalSliceType = {
  isAuthenticated:false,
  isTable:false,
  isPostRequest:false,
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
    handlePostCreatProduct:(state,action:PayloadAction<boolean>)=>{
      state.isPostRequest=action.payload
    }
    
  },
})

export const { handleIsAuthenticated,handleIsTable,handlePostCreatProduct } = globalSlice.actions

export default globalSlice.reducer