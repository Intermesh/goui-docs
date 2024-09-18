import {Page} from "./Page.js";
import {code, comp, fieldset, h1, h2, p, textfield, tree} from "@intermesh/goui"
import {MainMenu} from "./MainMenu.js"

export class Component extends Page {
	constructor() {
		super();
		this.title = "Component";

		const components = (new MainMenu).data.find(c => c.href=="#component")!.children

		this.items.add(
			p("The Component class is the base of all components. All components extend this class. <br />" +
				"Components are mostly created with a create function. For example a 'Table' is created with 'table()'. " +
				"These helper functions take child components as second argument. This makes it possible to write " +
				"organised code with indentation:"),

			code("<div style=\"color: rgb(8, 8, 8); font-family: &quot;Fira Code&quot;, monospace; font-size: 9.8pt;\"><pre><div style=\"white-space: normal; color: rgb(8, 8, 8); font-family: &quot;Fira Code&quot;, monospace; font-size: 9.8pt;\"><pre><div style=\"white-space: normal; color: rgb(8, 8, 8); font-family: &quot;Fira Code&quot;, monospace; font-size: 9.8pt;\"><pre><span style=\"font-style: italic;\">comp</span>({<span style=\"color: rgb(135, 16, 148);\">cls</span>: <span style=\"color: rgb(6, 125, 23);\">\"special-css\"</span>},<br> <span style=\"font-style: italic;\">h1</span>(<span style=\"color: rgb(6, 125, 23);\">\"Example\"</span>),<br><br> <span style=\"font-style: italic;\">p</span>(<span style=\"color: rgb(6, 125, 23);\">\"A paragraph\"</span>),<br><br> <span style=\"font-style: italic;\">p</span>({<br>  <span style=\"color: rgb(135, 16, 148);\">cls</span>: <span style=\"color: rgb(6, 125, 23);\">\"special\"</span>,<br>  <span style=\"color: rgb(135, 16, 148);\">html</span>: <span style=\"color: rgb(6, 125, 23);\">\"If you need additional configuration you can also use \" </span>+<br>   <span style=\"color: rgb(6, 125, 23);\">\"these functions with a config object.\"<br></span><span style=\"color: rgb(6, 125, 23);\"> </span>}),<br><br> <span style=\"font-style: italic;\">fieldset</span>({},<br><br>  <span style=\"font-style: italic;\">textfield</span>({<br>   <span style=\"color: rgb(135, 16, 148);\">name</span>: <span style=\"color: rgb(6, 125, 23);\">\"text\"</span>,<br>   <span style=\"color: rgb(135, 16, 148);\">label</span>: <span style=\"color: rgb(6, 125, 23);\">\"Text\"<br></span><span style=\"color: rgb(6, 125, 23);\">  </span>})<br><br> )<br>)</pre></div></pre></div></pre></div>"),

			p("You can also see in the example above that component has multiple helper " +
				"functions to create text easily like h1, h2, h3, h4, p, section and code. <br />" +
				"The code above outputs:")
			,
			comp({cls: "special-css"},
				h1("Example"),

				p("A paragraph"),

				p({
					cls: "special",
					html: "If you need additional configuration you can also use " +
						"these functions with a config object."
				}),

				fieldset({},

					textfield({
						name: "text",
						label: "Text"
					})
				)
			),

			h2("Components"),

			tree({
				cls: "no-icons",
				data: components
			})
		)
	}
}