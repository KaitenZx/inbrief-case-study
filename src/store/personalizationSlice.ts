import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface PersonalizationState {
	author: string;
	source: string;
	category: string;
}

const initialState: PersonalizationState = {
	author: '',
	source: '',
	category: '',
};


const personalizationSlice = createSlice({
	name: 'personalization',
	initialState,
	reducers: {
		setPersonalization(state, action: PayloadAction<PersonalizationState>) {
			return action.payload
		},
		resetPersonalization(state) {
			return initialState;
		},
	},
})

export const { setPersonalization, resetPersonalization } = personalizationSlice.actions;

export default personalizationSlice.reducer
