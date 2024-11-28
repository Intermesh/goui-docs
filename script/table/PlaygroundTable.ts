import {column, datecolumn, DateTime, store, StoreRecord, Table} from "@intermesh/goui"

export class PlaygroundTable extends Table {

	fitParent = true;

	constructor() {

		const records: StoreRecord[] = [];

		for (let i = 1; i <= 20; i++) {
			records.push({
				number: i,
				description: "Test " + i,
				createdAt: (new DateTime()).addDays(Math.ceil(Math.random() * -365)).format("c")
			});
		}

		super(
			store({
				data: records,
				sort: [{property: "number", isAscending: true}]
			}),

			[
				column({
					header: "No.",
					id: "number",
					sortable: true,
					resizable: true,
					width: 70,
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
		);

		this.title = "Table";
		this.itemId = "table";
		// this.cls = "fit";

		this.rowSelectionConfig = {
			multiSelect: true
		};

		// this.on("navigate",(table, rowIndex, record) => {
		// 	Window.alert("Selected", "You navigated to " + record.number + ". Press 'Escape' to close me and navigate the grid with the arrow keys.");
		// });

	}
}