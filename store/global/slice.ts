/** @format */

import { createSlice } from "@reduxjs/toolkit"

type Global = {
	debugMode: boolean
	lang: string
	animation: boolean
	map: string
}

const initialState: Global = {
	debugMode: false,
	lang: "fr",
	animation: true,
	map: null,
}

const folderSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		setProperties<T>(state, action: { payload: { key: string; value: T } }) {
			state[action.payload.key] = action.payload.value
		},
	},
})

const { setProperties } = folderSlice.actions

const { reducer } = folderSlice

export { setProperties, reducer }
