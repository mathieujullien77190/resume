/** @format */
import { BaseCommand, Help } from "_/types"

import { colors } from "_components/constants"

import { titleAsciiArt } from "./asciArt"

const textHelp = (help: Help) => {
	const patterns = help.patterns
		.map(item => `\t${item.pattern} : ${item.description}\n`)
		.join("")
	return `${help.description || ""}${
		help.patterns.length > 0 ? "\n" : ""
	}${patterns}`
}

const allCommandsHelp = () => {
	return commands
		.filter(
			command => !command.restricted && command.help && command.name !== "help"
		)
		.map(command => {
			return `*${command.name}*\n${command.help.patterns
				.map(pattern => `\t${pattern.pattern} : ${pattern.description}\n`)
				.join("")}\n`
		})
		.join("")
}

export const commands: BaseCommand[] = [
	{
		restricted: true,
		name: "welcome",
		action: () => {
			return { FR: `Bienvenue, taper \`help\``, EN: "xxx" }
		},
		help: {
			description:
				"Ceci est une commande à accès restreint, vous ne pouvez pas l'utiliser",
			patterns: [],
		},
		display: {
			hideCmd: true,
			style: { color: colors.importantColor },
		},
	},
	{
		restricted: true,
		name: "title",
		action: () => {
			return titleAsciiArt
		},
		help: {
			description:
				"Ceci est une commande à accès restreint, vous ne pouvez pas l'utiliser",
			patterns: [],
		},
		display: {
			hideCmd: true,
			style: { alignItems: "center" },
		},
	},
	{
		restricted: true,
		name: "noclick",
		action: () => {
			return {
				FR: `Ceci est un terminal de commande, la souris est inutile`,
				EN: "xxx",
			}
		},
		help: {
			description:
				"Ceci est une commande à accès restreint, vous ne pouvez pas l'utiliser",
			patterns: [],
		},
	},
	{
		restricted: true,
		name: "unknow",
		action: ({ args }) => {
			return {
				FR: `${args[0]} n’est pas reconnu en tant que commande interne, tapez \`help\` pour afficher la liste des commandes`,
				EN: "xxx",
			}
		},
		help: {
			description:
				"Ceci est une commande à accès restreint, vous ne pouvez pas l'utiliser",
			patterns: [],
		},
	},
	{
		restricted: true,
		name: "argumenterror",
		action: () => {
			return { FR: `argument(s) non reconnu`, EN: "xxx" }
		},
		help: {
			description:
				"Ceci est une commande à accès restreint, vous ne pouvez pas l'utiliser",
			patterns: [],
		},
	},
	{
		restricted: false,
		name: "hello",
		action: ({ args }) => {
			return args.length === 0
				? { FR: "Hello le monde", EN: "xxx" }
				: { FR: `Hello ${args.join(" ")}`, EN: "xxx" }
		},
		help: {
			description: "Affiche du texte à l'écran",
			patterns: [
				{
					pattern: "hello",
					description: "Affiche `Hello world`",
				},
				{
					pattern: "hello [text]",
					description: "Affiche `Hello [text]`",
				},
			],
		},
	},
	{
		restricted: false,
		name: "help",
		action: ({ args, help }) => {
			if (args.length === 0) {
				return `${textHelp(
					help
				)}\nListe des commandes : \n\n${allCommandsHelp()}`
			} else {
				const select = findCommand(args[0], null)
				if (select) return textHelp(select.help)
				return "Cette commande n’existe pas"
			}
		},
		help: {
			description:
				'Fournit des informations d’aide sur les commandes du "SuperMatouCmder"',
			patterns: [
				{
					pattern: "help [command]",
					description: "affiche des informations d’aide sur [command]",
				},
			],
		},
	},
	{
		restricted: false,
		name: "clear",
		action: () => {
			return ""
		},
		help: {
			patterns: [
				{
					pattern: "clear",
					description: "Efface tout sauf l'historique",
				},
			],
		},
	},
	{
		restricted: false,
		name: "email",
		testArgs: { authorize: ["copy"], empty: true },
		action: ({ args }) => {
			const email = "mathieu.jullien77190@gmail.com"
			if (args[0] === "copy") {
				navigator.clipboard.writeText(email)
			}
			return email
		},
		help: {
			patterns: [
				{
					pattern: "email",
					description: "Affiche l'email de l'auteur du site",
				},
				{
					pattern: "email copy",
					description:
						"Affiche l'email de l'auteur du site et l'enregistre dans le presse papier",
				},
			],
		},
	},
	{
		restricted: false,
		name: "debug",
		testArgs: { authorize: ["on", "off"], empty: false },
		action: ({ args }) => {
			return args[0] === "on"
				? { FR: "activé", EN: "enabled" }
				: { FR: "désactiver", EN: "disabled" }
		},
		help: {
			patterns: [
				{
					pattern: "debug on",
					description: "Active le mode debug en console",
				},
				{
					pattern: "debug off",
					description: "désactive le mode debug en console",
				},
			],
		},
	},
	{
		restricted: false,
		name: "animation",
		testArgs: { authorize: ["on", "off"], empty: false },
		action: ({ args }) => {
			return args[0] === "on"
				? { FR: "activé", EN: "enabled" }
				: { FR: "désactiver", EN: "disabled" }
		},
		help: {
			patterns: [
				{
					pattern: "animation on",
					description: "Active les animations",
				},
				{
					pattern: "debug off",
					description: "désactive les animations",
				},
			],
		},
	},
	{
		restricted: false,
		name: "lang",
		testArgs: { authorize: ["FR", "EN", "leet", "xleet", "#"], empty: false },
		action: ({ args }) => {
			return { FR: `langage : ${args[0]}`, EN: `language : ${args[0]}` }
		},
		help: {
			patterns: [
				{
					pattern: "lang FR",
					description:
						"Affiche tout les textes en français (attention les commandes restent en anglais)",
				},
				{
					pattern: "lang EN",
					description: "Affiche tout les textes en anglais",
				},
				{
					pattern: "lang leet",
					description: "Affiche tout les textes en leet (version lisible)",
				},
				{
					pattern: "lang xleet",
					description: "Affiche tout les textes en xleet (version ilisible)",
				},
				{
					pattern: "lang #",
					description: "Remplace toute les lettres par `#` (version inutile)",
				},
			],
		},
	},
]

export const findCommand = (
	name: string,
	restricted: boolean = false
): BaseCommand | null => {
	return (
		commands.filter(
			command =>
				command.name === name.toLowerCase() &&
				(command.restricted === restricted || restricted === null)
		)[0] || null
	)
}
