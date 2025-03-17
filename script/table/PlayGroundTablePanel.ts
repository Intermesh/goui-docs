import {btn, comp, Component, mstbar, ObjectUtil, searchbtn, tbar} from "@intermesh/goui"
import {PlaygroundTable} from "./PlaygroundTable.js";


export class PlaygroundTablePanel extends Component {


	constructor() {
		super();

		const playgroundTable = new PlaygroundTable();

		//clone the array for filtering
		const records = ObjectUtil.clone(playgroundTable.store.getArray());

		this.items.add(
			tbar({},
				"->",

				searchbtn({
					listeners: {
						input: (searchBtn, text) => {

							const filtered = records.filter((r) => {
								return !text || r.description.toLowerCase().indexOf(text.toLowerCase()) === 0;
							});

							//simple local filter on the store
							playgroundTable.store.loadData(filtered, false)
						}
					}
				}),

				btn({
					icon: "add",
					cls: "primary filled",
					text: "Add",
					handler: () => {
					}
				}),

				mstbar({table: playgroundTable}, "->", btn({icon: "delete"})),
			),

			comp({cls: "pad"}, // needed to properly align with toolbar

				comp({
						cls: "border scroll",
						height: 300
					},
					playgroundTable
				)
			)
		)
	}
}