/** @format */
import reactStringReplace from "react-string-replace"
import { Trad } from "_/types"
import { colors, app } from "_components/constants"
import uniqid from "uniqid"

export const trad = (input: Trad | string, lang: string) => {
	if (lang === "leet") return frToLeet(input["fr"] || input)
	if (lang === "xleet") return frToLeet(input["fr"] || input, true)
	if (lang === "#")
		return (input["fr"] || input)
			.normalize("NFD")
			.replace(/[\u0300-\u036f]/g, "")
			.replace(/[\wç]/gi, app.logo)
	return input[lang] || input
}

const frToLeet = (txt: string, advanced: boolean = false): string => {
	const alphabetBasic = {
		a: "4",
		b: "8",
		e: "3",
		f: "ph",
		g: "6", // or 9
		i: "1", // or |
		o: "0",
		s: "5",
		t: "7", // or +
	}

	const alphabetAdvanced = {
		c: "(", // or k or |< or /<
		d: "<|",
		h: "|-|",
		k: "|<", // or /<
		l: "|", // or 1
		m: "|\\/|",
		n: "|\\|",
		p: "|2",
		u: "|_|",
		v: "/", // or \/
		w: "//", // or \/\/
		x: "><",
		y: "'/",
	}

	// Convert input into l33t
	const convertInput = (text, useAdvanced = "n") => {
		for (let i = 0; i < text.length; i++) {
			let alphabet
			let letter = text[i].toLowerCase()

			if (useAdvanced.toLowerCase() === "y") {
				// Use advanced l33t speak alphabet
				alphabet = alphabetBasic[letter]
					? alphabetBasic[letter]
					: alphabetAdvanced[letter]
			} else {
				// Use basic l33t speak alphabet
				alphabet = alphabetBasic[letter]
			}

			if (alphabet) {
				text = text.replace(text[i], alphabet)
			}
		}

		return text
	}

	return convertInput(txt, advanced ? "y" : "n")
}

export const highlightFlower = text => {
	let result = text

	const baseStyles = {
		fontWeight: "bold",
		fontSize: "calc(100vw/100)",
	}
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

export const highlight = text => {
	let result = text

	result = reactStringReplace(result, /(\`[\d\wλ\'\[\]\ ]*\`)/g, (match, i) => (
		<span key={uniqid()} style={{ fontStyle: "italic" }}>
			{match}
		</span>
	))

	result = reactStringReplace(result, /\*([\d\wλ\'\ ]*)\*/g, (match, i) => (
		<span key={uniqid()} style={{ color: colors.infoColor }}>
			{match}
		</span>
	))

	result = reactStringReplace(result, /\-([\d\wλ\'\ ]*)\-/g, (match, i) => (
		<span key={uniqid()} style={{ textDecoration: "line-through" }}>
			{match}
		</span>
	))

	result = reactStringReplace(result, /\+([\d\wλ\'\ ]*)\+/g, (match, i) => (
		<span
			key={uniqid()}
			style={{
				background: colors.appColor,
				color: "black",
				border: "solid 1px solid",
				padding: "0 5px",
				fontWeight: "bold",
			}}
		>
			{match}
		</span>
	))

	return result
}
