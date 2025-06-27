import {btn, column, datasourcestore, datecolumn, list, root, store, table} from "@intermesh/goui";
import {PagingTable} from "./table/PagingTable.js";
import {demoDataSource} from "./DemoDataSource.js";

root.items.add(btn({
	text: "Add",
	handler: () => {
		const t = table({
			store: datasourcestore({
				dataSource: demoDataSource,
				queryParams: {
					limit: 20 // limit is required for paging
				}
			}),
			// store: store(),
			listeners: {
				render: ({target}) => {
					// register the parent element to load store on scroll down
					// table.store.addScrollLoader(table.parent!.el);

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

				// // Omitting width will auto size this to fill the width
				// column({
				// 	header: "Name",
				// 	id: "name",
				// 	sortable: true,
				// 	resizable: true
				// }),
				//
				// // datecolumns have a standard width
				// datecolumn({
				// 	header: "Created At",
				// 	id: "createdAt",
				// 	sortable: true
				// })
			]
		});


		root.items.add(t);
	}
}),
	btn({
		text: "remove",
		handler: ()=> {
			root.items.last()?.remove();
		}
	})
)