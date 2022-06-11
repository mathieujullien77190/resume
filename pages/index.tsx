/** @format */

import React, { useCallback, useEffect } from "react"

import { findCommand } from "_/api/commands"
import { createCommand } from "_/api/terminalEngine"

import Layout from "_components/Layout"
import Terminal from "_components/Terminal"

import { useAppDispatch } from "_store/hooks"
import {
	addCommand,
	moveCursor,
	setIsRendered,
	useGetCommands,
	useGetCurrentCommand,
} from "_store/history/"
import {
	setProperties,
	useGetNoMouse,
	useGetDebugMode,
	useGetLanguage,
	useGetAnimation,
} from "_store/global/"

const Home = () => {
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
		dispatch(setProperties({ value: true, key: "noMouse" }))
	}, [noMouse, handleSendRestrictedCommand])

	const handleSendCommand = useCallback(
		(commandPattern: string) => {
			const cmd = createCommand(commandPattern, false)
			const baseCmd = findCommand(cmd.name, false)

			if (baseCmd?.redux && cmd.canExecute)
				dispatch(baseCmd.redux({ args: cmd.args }))

			if (cmd.name === "clear" && cmd.canExecute)
				handleSendRestrictedCommand("title")

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
