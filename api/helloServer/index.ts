/** @format */

import { AzureFunction, Context, HttpRequest } from "@azure/functions"

const httpTrigger: AzureFunction = async function (
	context: Context,
	req: HttpRequest
): Promise<void> {
	context.res.status(200).json({ data: "hello server" })
}

export default httpTrigger
