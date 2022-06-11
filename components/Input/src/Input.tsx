/** @format */

import React, {
	useCallback,
	useState,
	KeyboardEvent,
	useRef,
	useEffect,
} from "react"
import { InputProps } from "./types"

import { isMobile } from "react-device-detect"

import { autocompleteCommand } from "_/api/commands"

import * as S from "./UI"
import { cleanCommand } from "./helpers"

export const Input = ({
	value = "",
	onValidate = () => {},
	onCallPrevious = () => {},
	onCallNext = () => {},
}: InputProps) => {
	const [inputValue, setInputValue] = useState<string>(value)
	const [predict, setPredict] = useState<string>("")
	const [nbsLetters, setNbsLetters] = useState<number>(0)
	const ref = useRef<HTMLInputElement>(null)

	const handleKeyUp = useCallback(
		(e: KeyboardEvent<HTMLInputElement>) => {
			const commandPattern = cleanCommand(e.currentTarget.value)
			const autocomplete = autocompleteCommand(commandPattern)

			setNbsLetters(e.currentTarget.value.length)
			setPredict(autocomplete)

			if (commandPattern === "") {
				e.preventDefault()
			} else if (e.key === "Enter") {
				onValidate(commandPattern)
				setInputValue("")
				setNbsLetters(0)
				setPredict("")
			} else if (e.key === "Tab" && autocomplete !== "") {
				setInputValue(autocomplete + " ")
				setNbsLetters(autocomplete.length + 1)
				setPredict("")
			}
		},
		[onValidate]
	)

	const handleKeyDown = useCallback(
		(e: KeyboardEvent<HTMLInputElement>) => {
			if (e.key === "ArrowUp") {
				onCallPrevious()
				e.preventDefault()
			} else if (e.key === "ArrowDown") {
				onCallNext()
				e.preventDefault()
			} else if (e.key === "Tab") {
				e.preventDefault()
			}
		},
		[onCallPrevious, onCallNext]
	)

	useEffect(() => {
		ref?.current?.focus()
	}, [])

	useEffect(() => {
		setInputValue(value)
	}, [value])

	return (
		<S.Container>
			<S.Lambda>λ</S.Lambda>
			<S.CustomInput
				ref={ref}
				value={inputValue}
				nbsLetters={nbsLetters}
				spellCheck="false"
				autoComplete="false"
				autoCapitalize="off"
				autoCorrect="off"
				onBlur={() => ref?.current?.focus()}
				onKeyDown={handleKeyDown}
				onKeyUp={handleKeyUp}
				onChange={e => {
					setInputValue(e.currentTarget.value)
				}}
			/>
			{!isMobile && predict !== "" && (
				<S.Predict>( {predict}? appuyez sur [TAB] )</S.Predict>
			)}
		</S.Container>
	)
}
