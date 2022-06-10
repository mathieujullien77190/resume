/** @format */

import "whatwg-fetch"
import "@testing-library/jest-dom/extend-expect"
import "@testing-library/jest-dom"
import "jest-styled-components"
import { resetStore, getStore } from "./store/initStore"
import { server } from "./testUtils/__mock__/server.js"
import matchMediaPolyfill from "mq-polyfill"
import { act, unsetConnectionToken } from "_testUtils"
/* import dotenv from "dotenv"
dotenv.config() */

// TODO: set env variables as jest globals here ?

// Pseudo-polyfill RAF pour virer les warnings, recommandé par React
global.requestAnimationFrame = function (callback) {
	return setTimeout(callback, 0)
}

jest.mock("react", () => {
	const r = jest.requireActual("react")

	return { ...r, memo: x => x }
})

jest.mock("next/config", () =>
	jest.fn().mockReturnValue({
		publicRuntimeConfig: { BASE_PREFIX_FOR_APP: "/dv-ui" },
	})
)

// Demande au serveur de mocks d’écouter et d’intercepter
// les requêtes décrites dans les handlers.
beforeAll(() => {
	matchMediaPolyfill(window)
	act(() => {
		window.resizeTo = function resizeTo(width, height) {
			Object.assign(this, {
				innerWidth: width,
				innerHeight: height,
				outerWidth: width,
				outerHeight: height,
			}).dispatchEvent(new this.Event("resize"))
		}
	})

	return server.listen({ onUnhandledRequest: "warn" })
})

// Réinitialise les handlers entre chaque test pour éviter
// d’affecter les autres tests.
afterEach(async () => {
	window.resizeTo(1024, 768)

	await localStorage.clear()

	// reset the store empty before each test
	resetStore()

	// and reset all mocks
	jest.clearAllMocks()

	await unsetConnectionToken()

	return server.resetHandlers()
})

// Arrête le serveur quand les tests sont terminés.
afterAll(() => server.close())

beforeEach(async () => {
	// to fully reset the state between tests, clear the storage
	await localStorage.clear()

	// reset the store empty before each test
	resetStore()

	// and reset all mocks
	jest.clearAllMocks()

	await unsetConnectionToken()
})

/* jest.mock('./node_modules/@sl/ui-library/organisms/Autocomplete', () => () =>
  jest.requireActual('react').createElement('div', null, null),
)

jest.mock('./node_modules/@sl/ui-library/molecules/Button', () => () =>
  jest.requireActual('react').createElement('div', null, null),
)

jest.mock('./node_modules/@sl/ui-library/molecules/Checkbox', () => () =>
   jest.requireActual('react').createElement('div', null, null),
)
 */
window.matchMedia = jest.fn().mockImplementation(query => ({
	matches: false,
	media: query,
	onchange: null,
	addListener: jest.fn(),
	removeListener: jest.fn(),
}))
