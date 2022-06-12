/** @format */

import React, { useEffect } from "react"
import { CommandProps } from "./types"

import { app } from "_components/constants"

import * as S from "./UI"
import { trad, highlight, highlightFlower } from "./helpers"
import { useDisplayByLetter } from "./hooks"

const Command = ({
	canRendered,
	command,
	baseCommand,
	lang,
	animation,
	onRendered = () => {},
}: CommandProps) => {
	const result = trad(command.result, lang)
	const name = trad(command.name, lang)
	const args = trad(command.args.map(arg => `${arg}`).join(" "), lang)

	const displayResult = useDisplayByLetter(result, canRendered, animation, lang)

	useEffect(() => {
		window.scrollTo(0, 100000)
	}, [displayResult])

	useEffect(() => {
		if (displayResult.finish) onRendered()
	}, [displayResult.finish, onRendered])

	return (
		<>
			{canRendered && (
				<S.CmdContainer style={command?.display?.style || {}}>
					{!command?.display?.hideCmd && (
						<S.CmdLine restricted={command.restricted}>
							<strong>{app.logo}</strong>{" "}
							<span>
								{name} {args}
							</span>
						</S.CmdLine>
					)}

					<S.CmdResult style={command?.display?.stylePre || {}}>
						{command?.display?.highlight === "flower"
							? highlightFlower(displayResult.txt)
							: highlight(displayResult.txt)}
					</S.CmdResult>

					{baseCommand?.JSX && baseCommand.JSX()}
				</S.CmdContainer>
			)}
		</>
	)
}

export const MemoCommand = React.memo(Command, (prevProps, nextProps) => {
	return (
		prevProps.lang === nextProps.lang &&
		prevProps.command.visible === nextProps.command.visible &&
		prevProps.canRendered === nextProps.canRendered
	)
})
