import {Page} from "./Page.js";
import {a, btn, code, comp, h2, img, p} from "@intermesh/goui"

export class Home extends Page {
	constructor() {
		super();
		this.title = "Group-Office User Interface";

		this.items.add(

			p("Welcome to the GOUI (<a href=\"https://www.group-office.com/\">Group-Office</a> " +
				"User Interface) Documentation website. " +
				"Developed using <a href=\"https://www.typescriptlang.org/\">TypeScript</a> and " +
				"<a href=\"https://sass-lang.com/\">SASS</a>, GOUI aims to create stunning and efficient " +
				"web applications.<br><br>" +

				"On this website, you'll find an extensive collection of available components. The complete " +
				"source code is hosted on <a href=\"https://github.com/intermesh/goui\">GitHub</a>, which can be accessed to kickstart your development process. " +
				"With comprehensive TypeScript documentation, your coding experience will be greatly enhanced " +
				"through intelligent suggestions from your TypeScript editor."
			),


			a({
				target: "_blank,",
				href: "resources/goui-calendar.png"
			}, img({
					style: {
						maxWidth: "100%"
					},
					src: "resources/goui-calendar.png",
					alt: "GOUI Calendar"
				})
			),

			h2("Group-Office"),

			p(
				"GOUI was specifically designed to replace the outdated ExtJS 3.4 framework utilized in " +
				"<a href=\"https://www.group-office.com/\">Group-Office</a>. " +
				"However, it is not limited to Group-Office alone. This versatile framework can be seamlessly " +
				"integrated into any JavaScript or TypeScript project."
			),


			h2("Efficient architecture"),

			p(
				"GOUI has a highly efficient architecture, utilizing pure JavaScript and CSS for rendering. " +
				"Whenever possible, pure HTML and CSS are leveraged, allowing the browser to efficiently render " +
				"components. In cases where this is not feasible, JavaScript is employed. Additionally, applications " +
				"are developed entirely in TypeScript, eliminating the need for parsing templates. The component generator are " +
				"designed to make the code very structured and readable."
			),

			btn({
				text: "Get started",
				route: "getstarted",
				cls: "filled primary"
			}),



		)
	}
}