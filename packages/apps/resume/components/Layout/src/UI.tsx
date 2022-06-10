/** @format */

import styled, { createGlobalStyle, css } from "styled-components"
import { colors } from "_components/constants"

export const GlobalStyles = createGlobalStyle<{ noMouse: boolean }>`
  body, html, #__next {
	height: 100%;
	width: 100%;
	margin: 0;
	background: ${colors.background};
  }

  * {
    font-size: 17px;
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
