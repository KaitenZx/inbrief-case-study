import { createSlice, PayloadAction } from '@reduxjs/toolkit';


export interface FiltersState {
	category: string;
	source: string;
	startDate: string;
	endDate: string;
}


const initialState: FiltersState = {
	category: '',
	source: '',
	startDate: '',
	endDate: '',
}

const filtersSlice = createSlice({
	name: 'filters',
	initialState,
	reducers: {
		setFilters(state, action: PayloadAction<FiltersState>) {
			return action.payload
		},
		resetFilters(state) {
			return initialState
		},
	},
})


export const { setFilters, resetFilters } = filtersSlice.actions

export default filtersSlice.reducer