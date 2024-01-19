import {Tree} from "@intermesh/goui";
import {router} from "@intermesh/goui";


export class MainMenu extends Tree {
	constructor() {
		super();

		this.cls = "main-menu";

		this.data = [
			{
				href: "#",
				text: "Home",
				children: []
			},{
				href: "#getstarted",
				text: "Get started",
				children: []
			},  {
				text: "Layout",
				href: "#layout",
				children: []
			},{
				text: "Data",
				href: "#data",
				children: []
			},{
				text: "Router",
				href: "#router",
				children: []
			},{
				text: "Drag and drop",
				href: "#draganddrop",
				children: []
			},{
				text: "Components",
				href: "#component",
				children: [
					{
						text: "Card container",
						href: "#cardcontainer",
						children: []
					},{
						text: "Buttons",
						href: "#buttons",
						children: []
					},{
						text: "Table",
						href: "#table",
						children: []
					},{
						text: "Window",
						href: "#window",
						children: []
					},{
						text: "List",
						href: "#list",
						children: []
					},{
						text: "Tree",
						href: "#tree",
						children: []
					},{
						text: "DatePicker",
						href: "#datepicker",
						children: []
					}, {
						text: "Form",
						href: "#form",
						children: [
							{
								href: "#form/TextField",
								text: "TextField",
								children: []
							},
							{
								href: "#form/NumberField",
								text: "NumberField",
								children: []
							},
							{
								href: "#form/DateTime",
								text: "Date and time",
								children: []
							},
							{
								href: "#form/Select",
								text: "Select fields",
								children: []
							},
							{
								href: "#form/HtmlField",
								text: "HtmlField",
								children: []
							},
							{
								href: "#form/ChecksAndRadios",
								text: "Checks and Radios",
								children: []
							},
							{
								href: "#form/ContainerField",
								text: "ContainerField",
								children: []
							},
							{
								href: "#form/MapField",
								text: "MapField",
								children: []
							},
							{
								href: "#form/ArrayField",
								text: "ArrayField",
								children: []
							},
							{
								href: "#form/ChipsField",
								text: "ChipsField",
								children: []
							},
							{
								href: "#form/DisplayField",
								text: "DisplayField",
								children: []
							}
						]
					}]
			}
		];

		// this.on("rowclick", (list, storeIndex, row, ev) => {
		// 	const record = list.store.get(storeIndex)!;
		// 	if(record.children) {
		// 		router.goto(record.children[0].id);
		// 	} else {
		// 		router.goto(record.id);
		// 	}
		// })
	}
}