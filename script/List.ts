import {Page} from "./Page.js";
import {btn, DateTime, h2, list, p, store, StoreRecord} from "@intermesh/goui"

export class List extends Page {
	constructor() {
		super();

		this.title = "List";
		this.sourceURL = "List.ts";

		const s = store({data: this.generateStoreData()});


		this.items.add(
			p({text: "A list renders items using a store. It renders an <ul> with <li> items by default, but it's not limited to these. "}),

			h2({text: "A list with some random generated strings"}),
			list({
				store: s,
				renderer: record => {
					return record.description;
				}
			}),

			btn({
				text: "Regenerate store data",
				cls: "filled",
				handler: () => {

					s.loadData(this.generateStoreData(), false);

				}
			})
		)
	}


	private generateStoreData() {
		const records: StoreRecord[] = [];

		for (let i = 1; i <= 10; i++) {
			records.push({
				number: i,
				description: (Math.random() + 1).toString(36).substring(7),
				createdAt: (new DateTime()).addDays(Math.ceil(Math.random() * -365)).format("c")
			});
		}

		return records;
	}
}