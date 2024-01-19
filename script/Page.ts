import {btn, Button, comp, Component, h1, p} from "@intermesh/goui";

export class Page extends Component {

	public sourceURL?: string;

	private titleEl: Component
	private sourceBtn: Button;

	constructor() {
		super("section");

		this.items.add(
			comp({cls: "hbox"},
				this.titleEl = h1(),

				comp({flex: 1}),

				comp({style: {alignSelf: "center"}},
					this.sourceBtn = btn({
						cls: "accent outlined",
						text: "Source on GitHub",
						handler: () => {
							window.open('https://github.com/intermesh/goui-docs/tree/main/script/' + this.sourceURL);
						}
					})
				)
			)
		);
	}

	protected internalRender(): HTMLElement {
		this.sourceBtn.hidden = this.sourceURL == undefined;

		this.addFooter();
		return super.internalRender();
	}

	private addFooter() {
		this.items.add(
			comp({
				tagName:"footer",
				cls: "main"
			},
				p('Powered by <a href="https://www.group-office.com">Intermesh Group-Office</a> ©2023'),
				p("Licensed under MIT license"
				)
			)
		);
	}

	set title(title: string) {
		this.titleEl.text = title;
	}

	get title() {
		return this.titleEl.text;
	}
}