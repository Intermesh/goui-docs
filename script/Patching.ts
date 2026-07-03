import {Page} from "./Page.js";
import {code, comp, p} from "@intermesh/goui";

export class Patching extends Page {
	constructor() {
		super();

		this.sourceURL = "Patching.ts";
		this.title = "Patching";

		this.items.add(
			p({html: "This page demonstrates how to patch / extend GOUI components. The 'patch' method extends" +
					" the component prototype. This happens when the component is added to another component. Ideally we would do " +
					"this after constructing but that is very difficult to do with Javascript today. Here's an example of how " +
					"to patch / extend all Button components:"}),
			code({},
				comp({tagName: "pre", text: "import {Button} from \"@intermesh/goui\"\n" +
						"\n" +
						"Button.patch(function() {\n" +
						"\tthis.on(\"click\", () => {\n" +
						"\t\tconsole.warn(\"Override click handler called\", this);\n" +
						"\t})\n" +
						"})\n"})
				)
			)
	}
}