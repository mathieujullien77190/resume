/** @format */

import React, { useCallback, useEffect } from "react"

import { findCommand } from "_commands/data"
import { createCommand } from "_commands/terminalEngine"

import Layout from "_components/Layout"
import Terminal from "_components/Terminal"
import SimpleMap from "_components/SimpleMap"

import { useAppDispatch } from "_store/hooks"
import {
	addCommand,
	moveCursor,
	setIsRendered,
	useGetCommands,
	useGetCurrentCommand,
} from "_store/history/"
import {
	useGetDebugMode,
	useGetLanguage,
	useGetAnimation,
	useGetMap,
} from "_store/global/"

import { isMobile } from "react-device-detect"

const Home = () => {
	const dispatch = useAppDispatch()
	const commands = useGetCommands()
	const debugMode = useGetDebugMode()
	const options = { animation: useGetAnimation(), lang: useGetLanguage() }
	const map = useGetMap()
	const currentCommand = useGetCurrentCommand()

	const handleRendered = useCallback(
		(id: string) => {
			dispatch(setIsRendered(id))
		},
		[dispatch]
	)

	const handleSendRestrictedCommand = useCallback(
		(commandPattern: string) => {
			const cmd = createCommand(commandPattern, true)
			const baseCmd = findCommand(cmd.name, true)

			if (baseCmd?.redux && cmd.canExecute)
				dispatch(baseCmd.redux({ args: cmd.args }))

			dispatch(addCommand(createCommand(commandPattern, true)))
		},
		[dispatch]
	)

	const handleClick = useCallback(() => {
		if (isMobile) {
			handleSetCursor(-1)
		}
	}, [isMobile])

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
					onSendRestrictedCommand={handleSendRestrictedCommand}
					onSendPreviousCommand={() => handleSetCursor(-1)}
					onSendNextCommand={() => handleSetCursor(1)}
					onRendered={handleRendered}
				/>
				<SimpleMap search={map} />
			</>
		</Layout>
	)
}

export default Home
