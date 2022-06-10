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
	lang: "FR",
	animation: true,
}

const folderSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		activateNoMouse(state, action: { payload: boolean }) {
			state.noMouse = action.payload
		},
		activateDebugMode(state, action: { payload: boolean }) {
			state.debugMode = action.payload
		},
		changeLanguage(state, action: { payload: string }) {
			state.lang = action.payload
		},
		activateAnimation(state, action: { payload: boolean }) {
			state.animation = action.payload
		},
	},
})

const {
	activateNoMouse,
	activateDebugMode,
	changeLanguage,
	activateAnimation,
} = folderSlice.actions

const { reducer } = folderSlice

export {
	activateNoMouse,
	activateDebugMode,
	changeLanguage,
	activateAnimation,
	reducer,
}
