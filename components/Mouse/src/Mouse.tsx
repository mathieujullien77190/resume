/** @format */

import React, { useState } from "react"
import { isMobile } from "react-device-detect"

import { MouseProps } from "./types"

import * as S from "./UI"

let timer

export const Mouse = ({ onActivate, show, noMouse }: MouseProps) => {
	const [canDisplayUselessMessage, setCanDisplayUselessMessage] =
		useState<boolean>(false)

	return (
		<>
			{isMobile && (
				<S.Container
					show={show}
					onMouseEnter={onActivate}
					onClick={e => {
						if (e.detail >= 3) {
							clearTimeout(timer)
							setCanDisplayUselessMessage(true)
							timer = setTimeout(() => setCanDisplayUselessMessage(false), 5000)
						}
					}}
				>
					{!canDisplayUselessMessage && (
						<>
							{noMouse && (
								<>Votre souris vient d&apos;être désactivé, dommage.</>
							)}
							{!noMouse && <>Veuillez positionner votre souris ici</>}
						</>
					)}
					{canDisplayUselessMessage && (
						<>Ça sert à rien de cliquer comme un perdu!</>
					)}
				</S.Container>
			)}
		</>
	)
}
