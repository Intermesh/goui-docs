import {Page} from "./Page.js";
import {btn, comp, h2, p, splitter} from "@intermesh/goui";

export class GetStarted extends Page {
	constructor() {
		super();
		this.title = "Get started";
		// this.sourceURL = './Layout.ts';

		this.items.add(

			p(
				"Start building efficient web apps now! Use our simple 'Hello World' boilerplate project. " +
				"Go to the template repository: <br /><br /> " +
				"<a href=\"https://github.com/Intermesh/goui-hello-world.git\">https://github.com/Intermesh/goui-hello-world.git</a>." +
				"<br /><br />Clone it and run it."
			),


		)
	}
}