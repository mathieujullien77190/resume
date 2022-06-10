/** @format */

import { useEffect, useState } from "react"
import { letterWrite } from "./helpers"

export const useDisplayByLetter = (
	baseTxt: string,
	canRendered: boolean,
	animation: boolean
) => {
	const [textTime, setTextTime] = useState<string>("")
	const [finish, setFinish] = useState<boolean>(false)
	useEffect(() => {
		if (canRendered) {
			const txt = animation ? letterWrite(baseTxt) : [baseTxt]
			const stepTime = txt.length > 200 ? 1 : 20
			let i = 0

			const timer = setInterval(() => {
				setTextTime(txt[i])
				i++

				if (i > txt.length - 1) {
					clearInterval(timer)
					setFinish(true)
				}
			}, stepTime)
		}
	}, [canRendered])
	return { txt: textTime, finish }
}
