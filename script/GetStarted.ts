import {Page} from "./Page.js";
import {btn, comp, h2, p, splitter} from "@intermesh/goui"

export class GetStarted extends Page {
	constructor() {
		super();
		this.title = "Get started";
		// this.sourceURL = './Layout.ts';

		this.items.add(
			p({
				html:

					"Start building efficient web apps now! To get you started you can checkout the components on this documentation" +
					" site and we have some example or boilerplate repositories:" +
					"<ul><li>Use our simple 'Hello World' boilerplate project. " +
					"Go to the template repository: <br /><br /> " +
					"<a href=\"https://github.com/Intermesh/goui-hello-world\">https://github.com/Intermesh/goui-hello-world</a>" +

					"<br /><br /></li>" +

					"<li>A more extensive example is our todo app:<br /><br />" +
					"<a href='https://github.com/Intermesh/goui-todo-app'>https://github.com/Intermesh/goui-todo-app</a><br /><br /></li>" +

					"<li>You can also study the code of this site:<br /><br />" +
					"<a href='https://github.com/Intermesh/goui-docs'>https://github.com/Intermesh/goui-docs</a><br /><br /></li>" +
					"</ul>"
			}),


		)
	}
}