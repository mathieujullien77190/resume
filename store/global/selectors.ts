/** @format */

import { RootState } from "../root"
import { useAppSelector } from "_store/hooks"

export const useGetDebugMode = () =>
	useAppSelector((state: RootState) => state.global.debugMode)

export const useGetLanguage = () =>
	useAppSelector((state: RootState) => state.global.lang)

export const useGetAnimation = () =>
	useAppSelector((state: RootState) => state.global.animation)

export const useGetMap = () =>
	useAppSelector((state: RootState) => state.global.map)
