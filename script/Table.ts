import {Page} from "./Page.js";
import {
	btn,
	checkboxselectcolumn,
	column, comp,
	datasourcestore,
	datecolumn,
	h2,
	menu,
	p,
	table,
	Window
} from "@intermesh/goui";
import {PlaygroundTablePanel} from "./table/PlayGroundTablePanel.js";
import {PagingTable} from "./table/PagingTable.js";
import {DemoDataSource, demoDataSource, DemoEntity} from "./DemoDataSource.js"

export class Table extends Page {

	constructor() {
		super();
		this.title = "Table";
		this.sourceURL = "Table.ts";

		this.items.add(
			p("Table's support sorting, keyboard navigation and (multi) row selection. " +
				"Right click the headers to enable or disable columns. You can also reorder columns using drag and drop."),

			new PlaygroundTablePanel(),

			new PagingTable(),

			h2("Checkbox selection and button in sticky columns"),

			this.createCheckboxSelectionTable(),

			h2("Grouped"),

			this.createGroupedTable()
		);
	}

	private createCheckboxSelectionTable() {
		return comp({
			cls: "border scroll",
			height: 300
		},table({
			fitParent: true,
			store: datasourcestore<DemoDataSource, DemoEntity & {selected:boolean}>({
				dataSource: demoDataSource,
				queryParams: {
					filter: {
						parentId: null
					},
					limit: 10
				},
				buildRecord:async entity => {
					return Object.assign(entity , {selected: true});
				}
			}),

			rowSelectionConfig: {
				multiSelect: true
			},

			columns: [
				checkboxselectcolumn({
					id: "selected",
					sticky: true
				}),

				column({
					header: "ID",
					id: "id",
					sortable: true,
					resizable: true,
					width: 100,
					align: "right"
				}),

				// Omitting width will auto size this to fill the width
				column({
					header: "Name",
					id: "name",
					sortable: true,
					resizable: true,
					width: 300
				}),

				// datecolumns have a standard width
				datecolumn({
					header: "Created At",
					id: "createdAt",
					sortable: true
				}),

				column({
					id: "more",
					width: 30,
					sticky: true,
					renderer: (columnValue, record, td, table1, storeIndex) => {
						return btn({
							icon: "more_vert",
							menu: menu({},
								btn({
									text: "Edit",
									icon: "edit",
									handler: () => {
										Window.alert(`You want to edit ${record.number}`);
									}
								}),
								btn({
									text: "Delete",
									icon: "delete",
									handler: () => {
										Window.confirm(`Do you want to delete ${record.number}?`);
									}
								}))
						})
					}
				})
			],

			listeners: {
				navigate: ({target, storeIndex}) => {
					console.log(target.store.get(storeIndex)!.createdAt);
				},

				render: ({target}) => {
					target.store.load();
				}
			}
		})
		);
	}

	private createGroupedTable() {
		return table({
			fitParent: true,
			store: datasourcestore({
				dataSource: demoDataSource,
				queryParams: {
					filter: {
						parentId: null
					},
					limit: 20
				},
				sort: [{
					isAscending: true,
					property: "group"
				}, {
					isAscending: true,
					property: "name"
				}]
			}),

			rowSelectionConfig: {
				multiSelect: true,
				listeners: {
					selectionchange: ({target}) => {
						console.log("selectionchange", target.getSelected());
					}
				}
			},
			groupBy: "group",

			columns: [

				column({
					header: "ID",
					id: "id",
					sortable: true,
					resizable: true,
					width: 100,
					align: "right"
				}),

				// Omitting width will auto size this to fill the width
				column({
					header: "Name",
					id: "name",
					sortable: true,
					resizable: true
				}),

				// column({
				// 	header: "Group",
				// 	id: "group",
				// 	sortable: true,
				// 	resizable: true
				// }),

				// datecolumns have a standard width
				datecolumn({
					header: "Created At",
					id: "createdAt",
					sortable: true
				})
			],

			listeners: {

				navigate: ({target, storeIndex}) => {
					console.log(target.store.get(storeIndex)!.createdAt);
				},

				render: ({target}) => {
					void target.store.load();
				}

			},

		})
	}
}