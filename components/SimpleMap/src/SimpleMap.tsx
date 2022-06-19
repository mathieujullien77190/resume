/** @format */

import React, { useState, useEffect, useRef } from "react"
import { SimpleMapProps } from "./types"

import * as S from "./UI"
import { key, baseURL, stepTime, finishTime } from "./constants"
import { colors } from "_components/constants"

import { isMobile } from "react-device-detect"

const SimpleMap = ({
	search,
	zoomMin = 2,
	zoomMax = 17,
	markerColor = colors.restrictedColor.replace("#", ""),
	onComplete = () => {},
}: SimpleMapProps) => {
	const [currentUrl, setCurrentUrl] = useState<string>(null)
	const timer = useRef<ReturnType<typeof setInterval>>()

	useEffect(() => {
		if (search) {
			clearInterval(timer.current)

			let counter = 0

			const sizes = document.body.getBoundingClientRect()
			const width = isMobile ? sizes.width - 24 : Math.floor(sizes.width / 2)
			const height = Math.floor(width / 2)

			const allMap = Array(zoomMax - zoomMin + 1)
				.fill(null)
				.map(
					(_, i) =>
						`${baseURL}?center=${search}&zoom=${
							i + zoomMin
						}&scale=1&size=${width}x${height}&maptype=hybrid&key=${key}&format=png&visual_refresh=true&markers=size:small%7Ccolor:0x${markerColor}%7Clabel:%7C${search}`
				)

			timer.current = setInterval(() => {
				setCurrentUrl(allMap[counter])
				if (counter < allMap.length - 1) counter++
				else {
					clearInterval(timer.current)
					window.setTimeout(() => {
						setCurrentUrl(null)
						onComplete()
					}, finishTime)
				}
			}, stepTime)
		}
	}, [search])

	return (
		<S.Container
			onClick={() => {
				clearInterval(timer.current)
				setCurrentUrl(null)
				onComplete()
			}}
		>
			{currentUrl && (
				<S.Img src={currentUrl} alt={`Google Map of ${search}`}></S.Img>
			)}
		</S.Container>
	)
}

export const MemoSimpleMap = React.memo(SimpleMap, (prevProps, nextProps) => {
	return prevProps.search === nextProps.search
})
