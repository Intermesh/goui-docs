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
	t,
	textfield,
	tree,
	Tree
} from "@intermesh/goui";
import {MainMenu} from "./MainMenu.js"
import {demoDataSource} from "./DemoDataSource.js"

export class Form extends Page {
	constructor() {
		super();
		this.title = "Form";

		this.items.add(

			form({},

				fieldset({
					legend: "Example form"
					},

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

					comp({cls: "group"},
						btn({icon: "add"}),
						htmlfield({
							flex: 1
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