/** @format */

import React, { useCallback, useEffect, useState } from "react"

import { createCommand } from "_/api/terminalEngine"

import Layout from "_components/Layout"
import Terminal from "_components/Terminal"
import Mouse from "_components/Mouse"

import { useAppDispatch } from "_store/hooks"
import {
	addCommand,
	moveCursor,
	clear,
	setIsRendered,
	useGetCommands,
	useGetCurrentCommand,
} from "_store/history/"
import {
	activateNoMouse,
	activateDebugMode,
	changeLanguage,
	activateAnimation,
	useGetNoMouse,
	useGetDebugMode,
	useGetLanguage,
	useGetAnimation,
} from "_store/global/"

const Home = () => {
	const [displayMouse, setDisplayMouse] = useState<boolean>(false)
	const dispatch = useAppDispatch()
	const commands = useGetCommands()
	const noMouse = useGetNoMouse()
	const debugMode = useGetDebugMode()
	const options = { animation: useGetAnimation(), lang: useGetLanguage() }
	const currentCommand = useGetCurrentCommand()

	const handleRendered = useCallback(
		(id: string) => {
			dispatch(setIsRendered(id))
		},
		[dispatch]
	)

	const handleSendRestrictedCommand = useCallback(
		(commandPattern: string) => {
			dispatch(addCommand(createCommand(commandPattern, true)))
		},
		[dispatch]
	)

	const handleClick = useCallback(() => {
		if (!noMouse) handleSendRestrictedCommand("noclick")
		dispatch(activateNoMouse(true))
	}, [noMouse, handleSendRestrictedCommand])

	const handleSendCommand = useCallback(
		(commandPattern: string) => {
			const cmd = createCommand(commandPattern, false)

			if (cmd.name === "debug")
				dispatch(activateDebugMode(cmd.args[0] === "on" ? true : false))
			if (cmd.name === "animation")
				dispatch(activateAnimation(cmd.args[0] === "on" ? true : false))
			if (cmd.name === "clear") {
				dispatch(clear())
				handleSendRestrictedCommand("title")
			}
			if (cmd.name === "lang") dispatch(changeLanguage(cmd.args[0]))

			dispatch(addCommand(cmd))

			if (debugMode) console.log("command send : ", cmd)
		},
		[dispatch, debugMode]
	)

	const handleSetCursor = useCallback(
		(direction: number) => {
			dispatch(moveCursor(direction))
		},
		[dispatch]
	)

	useEffect(() => {
		handleSendRestrictedCommand("title")
		handleSendRestrictedCommand("welcome")
	}, [handleSendRestrictedCommand])

	return (
		<Layout onClick={handleClick}>
			<>
				<Terminal
					options={options}
					commands={commands}
					currentCommand={currentCommand}
					onSendCommand={handleSendCommand}
					onSendPreviousCommand={() => handleSetCursor(-1)}
					onSendNextCommand={() => handleSetCursor(1)}
					onRendered={handleRendered}
				/>
			</>
		</Layout>
	)
}

export default Home
