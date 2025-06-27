import {column, comp, Component, datasourcestore, datecolumn, h2, h3, paginator, table, p} from "@intermesh/goui"
import {PagingStore} from "./PagingStore.js";
import {demoDataSource} from "../DemoDataSource.js"

export class PagingTable extends Component {



	constructor() {
		super();

		const s = new PagingStore();

		this.items.add(
			h2("Pagination"),


			p("You can paginate using a toolbar or by scrolling."),


			h3("Paginator toolbar"),

			comp({cls: "border",} ,
				table({
					fitParent: true,
					store: s,
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
			),


			h3("Paginate on scroll"),

			comp({
				cls: "scroll border",
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
						render: ({target}) => {
							// register the parent element to load store on scroll down
							target.store.addScrollLoader(target.parent!.el);

							// load the store initially
							void target.store.load();
						}
					},
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