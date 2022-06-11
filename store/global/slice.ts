/** @format */

import { createSlice } from "@reduxjs/toolkit"

type Global = {
	noMouse: boolean
	debugMode: boolean
	lang: string
	animation: boolean
}

const initialState: Global = {
	noMouse: false,
	debugMode: false,
	lang: "fr",
	animation: true,
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
