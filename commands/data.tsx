/** @format */
import { BaseCommand, Help } from "_/types"
import reactStringReplace from "react-string-replace"
import uniqid from "uniqid"

import { colors, app } from "_components/constants"

import { titleAsciiArt, plantFlowers } from "./asciArt"

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
		.sort((a, b) => a.name.localeCompare(b.name))
		.map(command => {
			return `+${command.name}+\n${command.help.patterns
				.map(pattern => `\t${pattern.pattern} : ${pattern.description}\n`)
				.join("")}\n`
		})
		.join("")
}

const highlightFlower = (text, baseStyles) => {
	let result = text

	const list = [
		{ reg: /R(.*)R/g, styles: { color: colors.restrictedColor } },
		{ reg: /I(.*)I/g, styles: { color: colors.importantColor } },
		{ reg: /B(.*)B/g, styles: { color: colors.infoColor } },
		{ reg: /G(.*)G/g, styles: { color: colors.appColor } },
		{ reg: /T(.*)T/g, styles: { color: colors.restrictedColor } },
		{ reg: /J(.*)J/g, styles: { color: colors.importantColor } },
		{ reg: /H(.*)H/g, styles: { color: colors.infoColor } },
		{ reg: /K(.*)K/g, styles: { color: colors.appColor } },
		{ reg: /X(.*)X/g, styles: { color: colors.restrictedColor } },
		{ reg: /D(.*)D/g, styles: { color: colors.importantColor } },
		{ reg: /Z(.*)Z/g, styles: { color: colors.infoColor } },
	]

	list.forEach(item => {
		result = reactStringReplace(result, item.reg, (match, i) => (
			<span
				key={uniqid()}
				style={{
					...item.styles,
					...baseStyles,
				}}
			>
				{match}
			</span>
		))
	})

	return result
}

export const commands: BaseCommand[] = [
	{
		restricted: true,
		name: "welcome",
		action: () => {
			return [
				`Bienvenue, Vous êtes sur $${app.name}$ un terminal de commande tout en couleur.`,
				"Deux solutions s'offrent à vous : ",
				` • Vous souhaitez avoir des informations sur ${app.author} : taper \`cv\``,
				` • Vous avez du temps à perdre et vous voulez découvrir toute -l'inutilité- la puissance de $${app.name}$ : tapez \`help\` `,
			].join("\n")
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
			stylePre: { fontSize: "calc(100vw/100)" },
			highlight: text => highlightFlower(text, { fontSize: "calc(100vw/100)" }),
			trad: false,
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
			description: `Fournit des informations d’aide sur les commandes du $${app.name}$`,
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
			const email = app.email
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
		restricted: true,
		name: "actionmap",
		action: () => {
			return { fr: "affiche une carte", en: "display map" }
		},
		redux: ({ args }) => {
			return setProperties({
				key: "map",
				value: args[0],
			})
		},
	},
	{
		restricted: false,
		name: "about",
		action: () => {
			return [
				`\n| $${app.name}$`,
				"| Application de ligne de commande (inspiré par λCmder) qui n'a absolument aucune utilité",
				`| Créée par *${app.author}* alias *${app.alias}* `,
				"| Technos utilisées : React/Redux | NextJs | NodeJs",
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
					pattern: `lang #`,
					description: `Remplace toute les lettres par \`${app.logo}\` (version inutile)`,
				},
			],
		},
	},
	{
		restricted: false,
		name: "cv",
		action: () => {
			return [
				"*FORMATIONS*",
				"",
				"+2007 – 2010 : Licence / Master MIAGE option SIR+ #[?]~MIAGE%20Orleans#",
				"Méthodes Informatiques Appliquées à la gestion des entreprises (UFR de science d’Orléans)",
				"",
				"+2005 – 2007 : DUT Informatique+  #[?]~IUT%20A%20Claude%20Bernard%20Lyon%201#",
				"IUT informatique option génie informatique (IUT A Claude Bernard Lyon 1)",
				"",
				"+2005: Bac scientifique+ #[?]~Lycee%20charles%20et%20adrien%20dupuy#",
				"Baccalauréat scientifique spé mathématique (Lycée Charles et Adrien Dupuy, Le Puy en Velay)",
			].join("\n")
		},

		help: {
			patterns: [
				{
					pattern: "cv",
					description: `Affiche le CV de ${app.author}`,
				},
			],
		},
	},
	{
		restricted: false,
		name: "flowers",
		action: () => {
			return plantFlowers()
		},
		display: {
			stylePre: {
				fontSize: "calc(100vw/60)",
				color: colors.appColor,
				transform: "scaleX(-1)",
				textAlign: "right",
			},
			highlight: text => highlightFlower(text, { fontSize: "calc(100vw/60)" }),
			trad: false,
			reverse: true,
			stepTime: 1,
			stepSize: 1,
		},
		help: {
			patterns: [
				{
					pattern: "flowers",
					description: `${app.logo}${app.logo}${app.logo} Plantez des fleurs ${app.logo}${app.logo}${app.logo}`,
				},
			],
		},
	},
	{
		restricted: false,
		name: "bird",
		action: () => {
			return " => Elsa, pulco, Flocon et Satele (pronconcé Satile)"
		},
		JSX: () => (
			<div
				style={{
					display: "flex",
					margin: "10px 0",
					position: "relative",
					justifyContent: "center",
				}}
			>
				<div
					style={{ position: "absolute", width: "100%", height: "100%" }}
				></div>
				<iframe
					style={{
						width: "45vw",
						height: "45vw",
						border: `solid 1px ${colors.textColor}`,
						margin: "0 5px",
					}}
					src="//video.nest.com/embedded/live/fsva0q8gKr?autoplay=1"
				></iframe>
				<iframe
					style={{
						width: "45vw",
						height: "45vw",
						border: `solid 1px  ${colors.textColor}`,
						margin: "0 5px",
					}}
					src="//video.nest.com/embedded/live/CijGpstQF6?autoplay=1"
				></iframe>
			</div>
		),

		help: {
			patterns: [
				{
					pattern: "bird",
					description: `Affiche le flux video en direct des perruches de *${app.author}*`,
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
	if ((find[0]?.name || "").length === startCommand.length) return ""
	return find[0]?.name || ""
}
