/** @format */

const httpTrigger = async function (context, req): Promise<void> {
	context.res.status(200).json({ data: "hello server" })
}

export default httpTrigger
