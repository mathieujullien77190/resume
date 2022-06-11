/** @format */

import React from "react"
import Head from "next/head"

import { LayoutProps } from "./types"
import { wording } from "./wording"

import * as S from "./UI"

import { isMobile } from "react-device-detect"

export const Layout = ({
	children,
	noMouse,
	onClick = () => {},
}: LayoutProps) => {
	return (
		<>
			<Head>
				<title>{wording.HEAD_TITLE}</title>
				<meta charSet="UTF-8" />
				<meta name="description" content={wording.HEAD_META} />
			</Head>
			<S.GlobalStyles noMouse={noMouse} isMobile={isMobile} />
			<S.App
				onClick={() => {
					if (!isMobile) onClick()
				}}
			>
				{children}
			</S.App>
		</>
	)
}
