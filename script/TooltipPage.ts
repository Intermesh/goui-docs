import {Page} from "./Page";
import {btn, tooltip, p} from "@intermesh/goui";

export class TooltipPage extends Page {
	sourceURL = "Tooltip.ts";

	constructor() {
		super();
		this.title = "Tooltip";

		this.items.add(
			p("You can render HTML tooltips with the ToolTip component:"),

			btn({
				cls: "filled",
				text: "I have a tooltip",
				listeners: {
					render: cmp => {
						tooltip({
							target: cmp.el,
							text: "Hello I am the tooltip!"
						})
					}
				}
			})
		);
	}
}