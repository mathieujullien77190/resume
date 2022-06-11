/** @format */

import styled, { createGlobalStyle, css } from "styled-components"
import { colors } from "_components/constants"

export const GlobalStyles = createGlobalStyle<{
	noMouse: boolean
	isMobile: boolean
}>`
  body, html, #__next {
	height: 100%;
	width: 100%;
	margin: 0;
	background: ${colors.background};
  }

  *, input {
    font-size: ${({ isMobile }) => (isMobile ? "12px" : "17px")};
  	${({ noMouse }) =>
			noMouse &&
			css`
				//cursor: none;
			`}
  }
`

export const App = styled.div`
	padding: 12px;
	min-height: calc(100% - 24px);
`
