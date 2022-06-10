/** @format */

import React, {
	useCallback,
	useState,
	KeyboardEvent,
	useRef,
	useEffect,
} from "react"

import { InputProps } from "./types"

import * as S from "./UI"

export const Input = ({
	value = "",
	onValidate = () => {},
	onCallPrevious = () => {},
	onCallNext = () => {},
}: InputProps) => {
	const [inputValue, setInputValue] = useState<string>(value)
	const ref = useRef<HTMLInputElement>(null)

	const handleKeyUp = useCallback(
		(e: KeyboardEvent<HTMLInputElement>) => {
			const commandPattern = e.currentTarget.value.trim()
			if (commandPattern === "") {
				e.preventDefault()
			} else if (e.key === "Enter") {
				onValidate(commandPattern)
				setInputValue("")
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
			<strong>λ</strong>{" "}
			<S.CustomInput
				ref={ref}
				value={inputValue}
				spellCheck="false"
				autoComplete="false"
				onBlur={() => ref?.current?.focus()}
				onKeyDown={handleKeyDown}
				onKeyUp={handleKeyUp}
				onChange={e => {
					setInputValue(e.currentTarget.value)
				}}
			/>
		</S.Container>
	)
}
