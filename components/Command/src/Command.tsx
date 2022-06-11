/** @format */

import React, { useEffect } from "react"

import { CommandProps } from "./types"

import * as S from "./UI"
import { trad, hightlight } from "./helpers"
import { useDisplayByLetter } from "./hooks"

const Command = ({
	canRendered,
	command,
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
							<strong>λ</strong>{" "}
							<span>
								{name} {args}
							</span>
						</S.CmdLine>
					)}

					<S.CmdResult style={command?.display?.stylePre || {}}>
						{command?.display?.noHightlight
							? displayResult.txt
							: hightlight(displayResult.txt)}
					</S.CmdResult>
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
