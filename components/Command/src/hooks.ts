/** @format */

import { useEffect, useState } from "react"

export const useDisplayByLetter = (
	baseTxt: string,
	canRendered: boolean,
	animation: boolean,
	lang: string
) => {
	const [textTime, setTextTime] = useState<string>("")
	const [finish, setFinish] = useState<boolean>(false)
	useEffect(() => {
		if (canRendered) {
			const stepTime = 10
			const j = Math.floor(baseTxt.length / 100) + 1
			let i = 0

			const timer = setInterval(() => {
				setTextTime(animation ? baseTxt.substring(0, i + 1) : baseTxt)

				if (i > baseTxt.length - 1) {
					clearInterval(timer)
					setFinish(true)
				}
				i = i + j
			}, stepTime)
		}
	}, [canRendered])

	useEffect(() => {
		if (finish) setTextTime(baseTxt)
	}, [lang])
	return { txt: textTime, finish }
}
