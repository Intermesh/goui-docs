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
import {DemoDataSource, demoDataSource, DemoEntity} from "./DemoDataSource.js"
import {RestApiExample} from "./RestApiExample.js"


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
			p({html: "GOUI is event driven. A DataSource collection is a single source of truth for all types of data." +
				" When the DataSource changes it fires an event. All components and stores listen to the 'change' event to " +
				"update themselves. This approach reduces the amount of code that has to be written and maintained. <br>" +
				"The example below demonstrates this with a table and a form. When you save the form the table store acts on the" +
				" data source's change event."}),

			p({html: "This example code also demonstrates how to load async data along with the store using relations and the buildRecord property"}),

			comp({cls: "hbox gap"},
				comp({flex: 2, cls: "frame scroll"}, this.table),
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
					await demoDataSource.update(this.table.rowSelection!.getSelected()[0].record.id, entity);

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
			store: datasourcestore<DemoDataSource, DemoEntity & {async: number}>({
				dataSource: demoDataSource,
				queryParams: {
					limit: 10
				},
				sort: [{
					isAscending: false,
					property:"parentId"
				}],

				// You can define relations to other data sources. They will be resolved on load and before rendering.
				relations: {
					parent:{
						dataSource: demoDataSource,
						path: "parentId"
					}
				},

				// Other async operations that's resolved on store load and before rendering can be done
				// by providing a buildRecord function
				buildRecord: async (entity) => {

					return new Promise(resolve => {
						const r = entity as DemoEntity & {async: number};

						// for demo a random number with a settimeout to make it async
						setTimeout(() => {
							r.async = Math.floor(Math.random() * 10)
							resolve(r);
						})
					})
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
					resizable: true,
					width: 100
				}),

				column({
					id: "parent",
					header: "Parent",
					property: "parent/name", // A JSON pointer path can be set in the property
					width: 100,
					align: "left"
				}),

				column({
					header: "Random async",
					id: "async",
					resizable: true,
					align: "right",
					width: 50
				}),

				datecolumn({
					header: "Created At",
					id: "createdAt",
					sortable: true
				}),
			],
			listeners: {

				navigate: ({target, storeIndex}) => {
					//problem is that record is a reference in the store and the reload won't update
					const record = target.store.get(storeIndex)!;
					this.form.value = record;
					this.form.disabled = false;
				},

				render: ({target}) => {
					void target.store.load();
				},


			}
		});

		tab.emptyStateHtml = "";

		return tab;

	}
}