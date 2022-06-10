/** @format */
import { Command } from "_/types"

export type CommandProps = {
	command: Command
	lang: string
	animation: boolean
	canRendered: boolean
	onRendered?: () => void
}
