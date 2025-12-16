import {p, panel} from "@intermesh/goui"
import {Page} from "./Page.js";

export class Panel extends Page {
	constructor() {
		super();

		this.sourceURL = "Panel.ts";
		this.title = "Panel";

		this.items.add(
			p({html: "This page demonstrates the Panel component."}),


			panel({
				title: "Panel component",
				cls: "card"
			},
				p({text: "This is a basic panel with a title and content. It can be collapsed by clicking the header."})
			)
		)
	}
}
