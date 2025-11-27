import * as yup from "yup";

export const inviteGuestSchema = yup.object({
	firstName: yup
		.string()
		.required("First Name is required"),

	lastName: yup
		.string()
		.required("Last Name is required"),

	company: yup
		.boolean()
		.required(),

	companyName: yup
		.string()
		.when("company", {
			is: true,
			then: (schema) =>
				schema.required("Company Name is required"),
			otherwise: (schema) => schema.notRequired(),
		}),

	phoneNumber: yup
		.string()
		.required("Phone number is required")
		.matches(/^[0-9+\s-]{6,15}$/, "Invalid phone number format"),

	accessDays: yup
		.array()
		.of(yup.string())
		.min(1, "Select at least one access day"),

	anyTime: yup.boolean().required(),

	fromTime: yup
		.string()
		.nullable()
		.when("anyTime", {
			is: false,
			then: (schema) => schema.required("Start time is required"),
			otherwise: (schema) => schema.notRequired(),
		}),

	toTime: yup
		.string()
		.nullable()
		.when("anyTime", {
			is: false,
			then: (schema) => schema.required("End time is required"),
			otherwise: (schema) => schema.notRequired(),
		}),
});
