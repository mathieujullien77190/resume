/** @format */
import reactStringReplace from "react-string-replace"
import { Trad } from "_/types"
import { colors } from "_components/constants"

export const trad = (input: Trad | string, lang: string) => {
	if (lang === "leet") return frToLeet(input["FR"] || input)
	if (lang === "xleet") return frToLeet(input["FR"] || input, true)
	if (lang === "#") return (input["FR"] || input).replace(/[\wç]/gi, "#")
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

export const hightlight = text => {
	let result = text

	result = reactStringReplace(result, /(\`[\d\w\[\]\ ]*\`)/g, (match, i) => (
		<span key={match + i} style={{ fontStyle: "italic" }}>
			{match}
		</span>
	))

	result = reactStringReplace(result, /\*([\d\w\ ]*)\*/g, (match, i) => (
		<span key={match + i} style={{ color: colors.infoColor }}>
			{match}
		</span>
	))

	return result
}

export const letterWrite = (text: string) => {
	return text.split("").map((_, i) => text.substring(0, i + 1))
}
