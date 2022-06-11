/** @format */
import { BaseCommand, Help } from "_/types"

import { colors } from "_components/constants"

import { titleAsciiArt } from "./asciArt"

import { setProperties } from "_store/global/"
import { clear } from "_store/history/"

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
			return { fr: `Bienvenue, taper \`help\``, en: "xxx" }
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
			stylePre: { fontSize: "calc(100vw/80)" },
			noHightlight: true,
		},
	},
	{
		restricted: true,
		name: "noclick",
		action: () => {
			return {
				fr: `Ceci est un terminal de commande, la souris est inutile`,
				en: "xxx",
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
				fr: `${args[0]} n’est pas reconnu en tant que commande interne, tapez \`help\` pour afficher la liste des commandes`,
				en: "xxx",
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
			return { fr: `argument(s) non reconnu`, en: "xxx" }
		},
		help: {
			description:
				"Ceci est une commande à accès restreint, vous ne pouvez pas l'utiliser",
			patterns: [],
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
		name: "hello",
		action: ({ args }) => {
			return args.length === 0
				? { fr: "Hello le monde", en: "xxx" }
				: { fr: `Hello ${args.join(" ")}`, en: "xxx" }
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
		name: "clear",
		action: () => {
			return ""
		},
		redux: () => {
			return clear()
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
				? { fr: "activé", en: "enabled" }
				: { fr: "désactiver", en: "disabled" }
		},
		redux: ({ args }) => {
			return setProperties({
				key: "debugMode",
				value: args[0] === "on" ? true : false,
			})
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
				? { fr: "activé", en: "enabled" }
				: { fr: "désactiver", en: "disabled" }
		},
		redux: ({ args }) => {
			return setProperties({
				key: "animation",
				value: args[0] === "on" ? true : false,
			})
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
		testArgs: { authorize: ["fr", "en", "leet", "xleet", "#"], empty: false },
		action: ({ args }) => {
			return { fr: `langage : ${args[0]}`, en: `language : ${args[0]}` }
		},
		redux: ({ args }) => {
			return setProperties({
				key: "lang",
				value: args[0],
			})
		},
		help: {
			patterns: [
				{
					pattern: "lang fr",
					description:
						"Affiche tout les textes en français (attention les commandes restent en anglais)",
				},
				{
					pattern: "lang en",
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
	{
		restricted: false,
		name: "about",
		action: () => {
			return [
				"\n| +λ+ SMCmder",
				"| Application de ligne de commande (inspiré par Cmder)",
				"| Créée par *Mathieu JULLIEN* qui n'a absolument aucune utilité",
				"| Techno utilisé : React/Redux | NextJs | NodeJs",
			].join("\n")
		},

		help: {
			patterns: [
				{
					pattern: "about",
					description: "Affiche différentes informations inutile",
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
				command.name === name &&
				(command.restricted === restricted || restricted === null)
		)[0] || null
	)
}

export const autocompleteCommand = (startCommand: string): string => {
	if (startCommand === "") return ""
	const find = commands.filter(
		command => !command.restricted && command.name.indexOf(startCommand) === 0
	)
	return find[0]?.name || ""
}
