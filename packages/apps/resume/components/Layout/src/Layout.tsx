/** @format */

import React, { useEffect } from "react"
import Head from "next/head"

import { LayoutProps } from "./types"
import { wording } from "./wording"

import * as S from "./UI"

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
			<S.GlobalStyles noMouse={noMouse} />
			<S.App onClick={onClick}>{children}</S.App>
		</>
	)
}
