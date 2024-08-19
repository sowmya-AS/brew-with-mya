import { StackNavigationProp } from '@react-navigation/stack';

export type RootStackParamList = {
    Home: undefined;
    CoffeeTypes: undefined;
    Sizes: undefined;
    Overview:undefined;
    Extras:undefined;
  };
  
export type NavigationProp = StackNavigationProp<RootStackParamList>;

export interface CoffeeType {
  _id: string;
  name: string;
  sizes: string[];
  extras: string[];
}

export interface Size {
  _id: string;
  name: string;
}

export interface Extra {
  _id: string;
  name: string;
  subselections: {
    _id: string;
    name: string;
  }[];
}
export interface CoffeeState {
  selectedType: CoffeeType | null;  
  selectedSize: string | null; 
  selectedExtras: string[];  
  types: CoffeeType[];  
  sizes: Size[];  
  extras: Extra[];  
}

export interface Subsection {
  _id: string;
  name: string;
}



