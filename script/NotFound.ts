import {Page} from "./Page.js";
import {p} from "@intermesh/goui"

export class NotFound extends Page {
	constructor() {
		super();
		this.title = "Not found";

		this.items.add(
			p({
				html: "Sorry, the page you were looking for is not found."
			})
		)
	}
}