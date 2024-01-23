import {Page} from "./Page.js";
import {
	a,
	code,
	ComboBox,
	combobox,
	comp,
	datefield,
	fieldset,
	h1,
	img,
	p,
	t,
	textfield,
	tree,
	Tree
} from "@intermesh/goui";
import {MainMenu} from "./MainMenu";
import {demoDataSource} from "./DemoDataSource";

export class Form extends Page {
	constructor() {
		super();
		this.title = "Form";

		const mainMenu = new MainMenu();

		const components = (new MainMenu).data.find(c => c.href=="#component")!.children!,
			formComponents = components.find(c => c.href == "#form")!.children!


		this.items.add(

			fieldset({
				legend: "Example form"
				},

				textfield({
					flex: 2,
					name: "name",
					label: t("Name"),
					required: true
				}),

				combobox({
					width: 200,
					dataSource: demoDataSource,
					label: t("Book"),
					name: "bookId",
					filterName: "name",
					required: true
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

			p("Forms can handle complex object structures using Container and Array type fields. They don't submit in " +
				"the traditional way but return a Javascript Object that can be sent using an XHR or fetch API request. " +
				"To see how this works fill in some data and press 'Save' in the various form component pages."),

			tree({
				cls: "main-menu",
				data: formComponents
			})


		)
	}
}