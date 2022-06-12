/** @format */
import { CSSProperties } from "react"

export type Help = {
	description?: string
	patterns: { pattern: string; description: string }[]
}

export type Trad = { fr: string; en: string }

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
	redux?: ({ args }: { args?: Command["args"] }) => unknown
	JSX?: () => JSX.Element
	help?: Help
	testArgs?: Args
	display?: {
		hideCmd?: boolean
		style?: CSSProperties
		stylePre?: CSSProperties
		highlight?: string
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
	canExecute: boolean
	display?: {
		hideCmd?: boolean
		style?: CSSProperties
		stylePre?: CSSProperties
		highlight?: string
	}
	isRendered: boolean
}
