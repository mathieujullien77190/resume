/** @format */
import { BaseCommand, Command } from "_/types"

export type CommandProps = {
	command: Command
	baseCommand: BaseCommand
	lang: string
	animation: boolean
	canRendered: boolean
	onRendered?: () => void
}
