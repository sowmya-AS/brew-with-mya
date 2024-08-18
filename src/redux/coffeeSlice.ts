import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {CoffeeType, Size, Extra, CoffeeState} from '../../types'


const initialState: CoffeeState = {
  selectedType: null,  
  selectedSize: null,  
  selectedExtras: [],  
  types: [],  
  sizes: [],  
  extras: [],  
};

const coffeeSlice = createSlice({
  name: 'coffee',
  initialState,
  reducers: {
    
    setSelectedType: (state, action: PayloadAction<CoffeeType | null>) => {
      state.selectedType = action.payload;
    },
    
    
    setSelectedSize: (state, action: PayloadAction<string | null>) => {
      state.selectedSize = action.payload;
    },
    
    
    setSelectedExtras: (state, action: PayloadAction<string[]>) => {
      state.selectedExtras = action.payload;
    },
    
    
    setTypes: (state, action: PayloadAction<CoffeeType[]>) => {
      state.types = action.payload;
    },
    
    
    setSizes: (state, action: PayloadAction<Size[]>) => {
      state.sizes = action.payload;
    },
    
    
    setExtras: (state, action: PayloadAction<Extra[]>) => {
      state.extras = action.payload;
    },
  },
});

export const { 
  setSelectedType, 
  setSelectedSize, 
  setSelectedExtras, 
  setTypes, 
  setSizes, 
  setExtras 
} = coffeeSlice.actions;

export default coffeeSlice.reducer;
