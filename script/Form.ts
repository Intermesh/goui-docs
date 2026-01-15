import {Page} from "./Page.js";
import {
	a, btn,
	code,
	ComboBox,
	combobox,
	comp,
	datefield, displayfield,
	fieldset, form,
	h1, htmlfield,
	img,
	p,
	t, TextField,
	textfield,
	tree,
	Tree, Window
} from "@intermesh/goui";
import {MainMenu} from "./MainMenu.js"
import {demoDataSource} from "./DemoDataSource.js"

export class Form extends Page {
	constructor() {
		super();
		this.title = "Form";

		this.items.add(

			form({
				handler: async (form) => {

						// Simulate a fake async validation error. It will be cleared if the user changes the field.
						if(form.value.middleName !== "van") {
							form.findField("middleName")!.setInvalid("Middle name must be 'van'");
						} else {

							void Window.alert("<code>" + JSON.stringify(form.value, null, 4) + "</code>", "Success");
						}
					}
				},

				fieldset({
						legend: "Example form"
					},

					p("This form also demonstrates some validation principles. The passwords must match, e-mail must be valid and the middle name field will be validated asynchronously after submitting the form."),

					comp({cls: "group"},
						textfield({
							name: "firstName",
							label: "First name"
						}),

						textfield({
							name: "middleName",
							label: "First name"
						}),

						textfield({
							name: "lastName",
							label: "Last name"
						})
					),

					textfield({
						name: "email",
						label: "E-mail",
						type: "email"
					}),

					combobox({
						dataSource: demoDataSource,
						label: t("Contact"),
						name: "contactId",
						filterName: "name"

					}),

					combobox({
						dataSource: demoDataSource,
						label: t("Customer"),
						name: "customerId",
						filterName: "name"
					}),
				),

				fieldset({},

					textfield({
						required: true,
						type: "password",
						name: "password",
						label: t("Password")
					}),

					textfield({
						required: true,
						type: "password",
						name: "confirmPassword",
						label: t("Confirm password"),
						listeners: {
							validate: ({target}) =>
							{
								// Validate if passwords match
								if(target.value != (target.previousSibling() as TextField).value) {
									target.setInvalid(t("Passwords don't match"));
								}
							}
						}
					})

					),

				fieldset({},
					datefield({
						label: t("Starts at"),
						name: "startsAt"
					}),

					datefield({
						label: t("Due at"),
						name: "dueAt"
					}),

					datefield({
						label: t("Completed at"),
						name: "completedAt"
					}),
				),

				fieldset({

				},

					comp({cls: "group", style: {alignItems: "unset"}},
						btn({icon: "add"}),
						htmlfield({
							cls: "frame-hint",
							hint: "Type something nice here",
							flex: 1,
							required: true
						}),
						btn({icon: "send"}),
					),

				),

				btn({
					type: "submit",
					text: "Submit",
				})
			),



			p("Forms can handle complex object structures using Container and Array type fields. They don't submit in " +
				"the traditional way but return a Javascript Object that can be sent using an XHR or fetch API request. " +
				"To see how this works fill in some data and press 'Save' in the various form component pages."),

			tree({
				fitParent: true,
				cls: "main-menu",
				nodeProvider: () => MainMenu.formComponents
			})


		)
	}
}