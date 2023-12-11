import {Page} from "./Page.js";
import {
	btn,
	column,
	comp,
	datasourcestore,
	datecolumn,
	form,
	Form, h2,
	Notifier,
	p,
	table,
	textfield
} from "@intermesh/goui";
import {demoDataSource, DemoEntity} from "./DemoDataSource";
import {RestApiExample} from "./RestApiExample";


export class Data extends Page {
	sourceURL = "Data.ts"
	private readonly table;
	private readonly form: Form;

	constructor() {
		super();
		this.title = "Data";

		// This is the single source of truth data store

		// The table with a store
		this.table = this.createTable();

		// the form to edit data
		this.form = this.createForm();

		this.items.add(
			p("GOUI is event driven. A DataSource collection is a single source of truth for all types of data." +
				" When the DataSource changes it fires an event. All components and stores listen to the 'change' event to " +
				"update themselves. This approach reduces the amount of code that has to be written and maintained. <br>" +
				"The example below demonstrates this with a table and a form. When you save the form the table store acts on the" +
				" data source's change event."),

			comp({cls: "hbox gap"},
				comp({width: 300, cls: "frame"}, this.table),
				this.form
			),


			new RestApiExample()
		);
	}

	private createForm() {
		return form({
				flex: 1,
				disabled: true,
				handler: async (form) => {
					const entity = form.value as DemoEntity;
					await demoDataSource.update(this.table.store.get(this.table.rowSelection!.selected[0])!.id, entity);

					Notifier.success("The record was updated. The change is immediately updated in the list.");
				}
			},
			textfield({
				name: "name",
				label: "Name"
			}),

			btn({
				type: "submit",
				text: "Save"
			})
		);

	}


	private createTable() {

		const tab = table({
			// Create a data source store that gets its data from a DataSource.
			// This store listens for changes on the DataSource.
			fitParent: true,
			store: datasourcestore({
				dataSource: demoDataSource,
				queryParams: {
					filter: {
						parentId: undefined
					},
					limit: 10
				}
			}),
			rowSelectionConfig: {
				multiSelect: false
			},
			columns: [
				column({
					id: "id",
					header: "ID",
					width: 50,
					align: "right"
				}),
				column({
					header: "Name",
					id: "name",
					resizable: true
				}),
				datecolumn({
					header: "Created At",
					id: "createdAt",
					sortable: true
				})
			],
			listeners: {

				navigate: (list, storeIndex) => {
					//problem is that record is a reference in the store and the reload won't update
					const record = list.store.get(storeIndex)!;
					this.form.value = record;
					this.form.disabled = false;
				},

				render: comp1 => {
					void comp1.store.load();
				},


			}
		});

		tab.emptyStateHtml = "";

		return tab;

	}
}