/** @format */

import { useEffect, useRef } from "react"

// useEffect call just one time
export const useOnceEffect = (effect: () => void) => {
	const initialRef = useRef(true)

	useEffect(() => {
		if (!initialRef.current) {
			return
		}
		initialRef.current = false
		effect()
	}, [effect])
}
