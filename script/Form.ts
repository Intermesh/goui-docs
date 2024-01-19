import {Page} from "./Page.js";
import {code, comp, fieldset, h1, p, textfield, tree, Tree} from "@intermesh/goui";
import {MainMenu} from "./MainMenu";

export class Form extends Page {
	constructor() {
		super();
		this.title = "Form";

		const mainMenu = new MainMenu();

		const components = (new MainMenu).data.find(c => c.href=="#component")!.children!,
			formComponents = components.find(c => c.href == "#form")!.children!


		this.items.add(
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