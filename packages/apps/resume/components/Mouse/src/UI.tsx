/** @format */

import styled, { css } from "styled-components"
import { colors } from "_components/constants"

export const Container = styled.div<{ show: boolean }>`
	color: ${colors.importantColor};
	background: ${colors.background};
	font-size: 14px;
	line-height: 18px;
	position: fixed;
	height: 100px;
	width: 100px;
	top: 1rem;
	right: 1rem;
	border: dashed 2px ${colors.textColor};
	padding: 0.5rem;
	opacity: 0;
	justify-content: center;
	align-items: center;
	text-align: center;
	cursor: pointer;
	font-family: monospace;
	font-weight: bold;
	display: flex;

	${({ show }) =>
		show &&
		css`
			transition: opacity 500ms ease-out;
			opacity: 1;
		`}
`
