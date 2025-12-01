import * as yup from "yup";

export const otcSchema = yup.object({
	name: yup
		.string()
		.required("Name is required")
})