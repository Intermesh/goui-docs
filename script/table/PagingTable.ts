import {column, comp, Component, datasourcestore, datecolumn, h2, h3, paginator, table} from "@intermesh/goui"
import {PagingStore} from "./PagingStore.js";
import {demoDataSource} from "../DemoDataSource.js"

export class PagingTable extends Component {



	constructor() {
		super();

		const s = new PagingStore();

		this.items.add(
			h2("Pagination"),

			table({
				fitParent: true,
				store: s,
				cls: "frame",
				columns: [
					column({
						header: "No.",
						id: "number",
						sortable: true,
						resizable: true,
						width: 100,
						align: "right"
					}),

					// Omitting width will auto size this to fill the width
					column({
						header: "Description",
						id: "description",
						sortable: true,
						resizable: true
					}),

					// datecolumns have a standard width
					datecolumn({
						header: "Created At",
						id: "createdAt",
						sortable: true
					})
				]
			}),

			paginator({
				store: s
			}),


			h3("Paginate on scroll"),

			comp({
				cls: "scroll frame",
				height: 300
			},
				table({
					fitParent: true,
					store: datasourcestore({
						dataSource: demoDataSource,
						queryParams: {
							limit: 20 // limit is required for paging
						}
					}),
					listeners: {
						render: table => {
							// register the parent element to load store on scroll down
							table.store.addScrollLoader(table.parent!.el);

							// load the store initially
							void table.store.load();
						}
					},
					cls: "frame",
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

						// datecolumns have a standard width
						datecolumn({
							header: "Created At",
							id: "createdAt",
							sortable: true
						})
					]
				})
			)

		)

		void s.loadNext();
	}
}