import {Tree} from "@intermesh/goui"


export class MainMenu extends Tree {

	static formComponents = [
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
	];

	static components = [
		{
			text: "Card container",
			href: "#cardcontainer",
			children: []
		},{
			text: "Panel",
			href: "#panel",
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
			text: "Tooltip",
			href: "#tooltip",
			children: []
		}, {
			text: "Form",
			href: "#form",
			children:  MainMenu.formComponents
		}];
	constructor() {
		super(() => [
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
				children: MainMenu.components
			}
		]);

		this.fitParent = true;

		this.cls = "no-row-lines main-menu";

		this.on("rowclick", ({target, storeIndex}) => {
			const record = target.store.get(storeIndex)!;
			void this.expand(record);
		})
	}
}