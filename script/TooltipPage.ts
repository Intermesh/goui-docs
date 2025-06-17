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
			}),

			p("A larger tooltip with HTML:"),

			btn({
				cls: "filled",
				text: "I have a tooltip",
				listeners: {
					render: btnCmp => {
						tooltip({
							listeners: {
								render: cmp => {
									cmp.el.addEventListener("click", () => {
										btnCmp.remove();
									})
								}
							},
							target: btnCmp.el,
							html: "<h1>Lorem Ipsum Dolor Sit Amet</h1>\n" +
								"<p>\n" +
								"  <strong>Lorem ipsum</strong> dolor sit amet, <em>consectetur</em> adipiscing elit. \n" +
								"  <a href=\"#\">Nullam eget</a> sapien nec urna facilisis dictum.\n" +
								"</p>\n" +
								"<ul>\n" +
								"  <li>Vestibulum ante ipsum primis</li>\n" +
								"  <li>In faucibus orci luctus et</li>\n" +
								"  <li>Ultrices posuere cubilia Curae</li>\n" +
								"</ul>\n" +
								"<p>\n" +
								"  Sed <span style=\"color: #007acc;\">viverra</span> massa at <b>nisi sodales</b>, nec pretium \n" +
								"  <u>ligula dictum</u>. Pellentesque habitant morbi tristique senectus et netus.\n" +
								"</p>\n" +
								"<blockquote>\n" +
								"  \"Quisque facilisis, enim vel cursus dictum, \n" +
								"  velit erat pretium nisi, nec dictum urna magna eu urna.\"\n" +
								"</blockquote>\n"
						})
					}
				}
			})
		);
	}
}