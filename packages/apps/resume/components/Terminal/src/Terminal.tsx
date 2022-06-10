/** @format */

import React from "react"

import { TerminalProps } from "./types"

import Input from "_components/Input"
import Command from "_components/Command"

import * as S from "./UI"

export const Terminal = ({
	commands,
	currentCommand,
	options,
	onRendered,
	onSendCommand,
	onSendPreviousCommand,
	onSendNextCommand,
}: TerminalProps) => {
	return (
		<S.TerminalContainer>
			{commands
				.filter(command => command.visible)
				.map((command, i, all) => {
					const prevIsRendered = i === 0 ? true : all[i - 1].isRendered

					return (
						<Command
							lang={options.lang}
							animation={options.animation}
							command={command}
							key={command.id}
							canRendered={prevIsRendered}
							onRendered={() => onRendered(command.id)}
						/>
					)
				})}

			<Input
				value={currentCommand?.pattern}
				onValidate={onSendCommand}
				onCallPrevious={onSendPreviousCommand}
				onCallNext={onSendNextCommand}
			/>
		</S.TerminalContainer>
	)
}
