/** @format */

import { RootState } from "../root"
import { useAppSelector } from "_store/hooks"

export const useGetNoMouse = () =>
	useAppSelector((state: RootState) => state.global.noMouse)

export const useGetDebugMode = () =>
	useAppSelector((state: RootState) => state.global.debugMode)

export const useGetLanguage = () =>
	useAppSelector((state: RootState) => state.global.lang)

export const useGetAnimation = () =>
	useAppSelector((state: RootState) => state.global.animation)
