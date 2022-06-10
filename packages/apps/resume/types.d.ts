/** @format */
import { CSSProperties } from "react"

export type Help = {
	description?: string
	patterns: { pattern: string; description: string }[]
}

export type Trad = { FR: string; EN: string }

export type Action = ({
	name,
	args,
	help,
}: {
	name?: Command["name"]
	args?: Command["args"]
	help?: Command["help"]
}) => Trad | string

export type Args = { authorize: string[]; empty: boolean }

export type BaseCommand = {
	restricted: boolean
	name: string
	action: Action
	help?: Help
	testArgs?: Args
	display?: {
		hideCmd?: boolean
		style?: CSSProperties
	}
}

export type Command = {
	pattern: string
	name: string
	args: string[]
	result: Trad | string
	restricted: boolean
	visible?: boolean
	timestamp?: number
	id: string
	display?: {
		hideCmd?: boolean
		style?: CSSProperties
	}
	isRendered: boolean
}
