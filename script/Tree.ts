import {Page} from "./Page.js"
import {
	h2,
	TreeRecord,
	Tree as TreeComp,
	TreeStore,
	tree,
	treestore, btn, treecolumn,

} from "@intermesh/goui"
import {demoDataSource} from "./DemoDataSource.js"

export class Tree extends Page {
	constructor() {
		super();

		this.title = "Tree";
		this.sourceURL = "Tree.ts";

		const treeData: TreeRecord[] = [
			{
				id: "1",
				icon: "star",
				text: "Node 1",
				children: [
					{
						icon: "folder",
						id: "1.1",
						text: "Node 1.1",
						expanded: true,
						children: [{
							icon: "csv",
							id: "1.1.1",
							text: "Node 1.1.1",
							children: []
						},{
							icon: "csv",
							id: "1.1.2",
							text: "Node 1.1.2",
							children: []
						}],
					},
					{
						icon: "folder",
						id: "1.2",
						text: "Node 1.2",
						children: []
					},
					{
						icon: "folder",
						id: "1.3",
						text: "Node 1.3",
						children: []
					},
					{
						icon: "folder",
						id: "1.4",
						text: "Node 1.4",
						children: []
					}
				]
			}, {
				id: "2",
				text: "Node 2",
				icon: "folder",
				// expanded: true,
				children: [
					{
						icon: "folder",
						id: "2.1",
						text: "Node 2.1",
						children: []
					},
					{
						icon: "folder",
						id: "2.2",
						text: "Node 2.2",
						children: []
					}
				]
			}
		];

		const demoTree = tree({

			nodeProvider: () => {
				return treeData;
			},
			rowSelectionConfig: {
				multiSelect: true,
				listeners: {
					selectionchange: sel => {
						// debugger;
						console.log(sel.getSelected())
					},
					rowselect: (s, r) => {
						// debugger;
						// console.log("rowselect", r.id)
					},
					beforerowdeselect: (s, r) => {
						// debugger;
						// console.log("rowdeselect", r.id)
					}
				}
			},
			listeners: {
				// rowclick: (list, storeIndex, row, ev) => {
				// 	const record = list.store.get(storeIndex);
				// 	console.log(list, storeIndex, row,ev, record);
				// }
			}
		});





		/**
		 * Tree that pulls data out of a datasource
		 */
		const dsTree = tree(
			{
				columns: [
					treecolumn({
						id: "text",
						defaultIcon: "folder"
					})
				],
				nodeProvider:   async (record) : Promise<TreeRecord[]> => {
					const q = await demoDataSource.query({filter: {parentId: record ? record.id: undefined}});
					const getResponse = await demoDataSource.get(q.ids)
					//at the root of the tree record is undefined
					return Promise.all(getResponse.list.map(async (e) => {
						return {
							id: e.id + "",
							text: e.name,
							// set to empty array if it has no children. Then the tree knows it's a leaf.
							// this is very inefficient but works for the demo :)
							children: (await demoDataSource.query({filter: {parentId: e.id}, limit: 1})).ids.length ? undefined : []
						}
					}))
				},
				draggable: true,
				dropOn: true,
				listeners: {
					drop: (toComponent, toIndex, fromIndex, droppedOn, fromComp, dragDataSet) => {

						if(fromComp != toComponent	) {
							return;
						}
						const draggedRecord = (fromComp as TreeComp).store.get(fromIndex)!,
							droppedOnRecord = toComponent.store.get(toIndex)!;

						demoDataSource.update(draggedRecord.id!,{
							parentId: droppedOnRecord.id
						});
					}
				}
			}
		);

		// when the data source changes reload the tree
		demoDataSource.on("change", () => {

			dsTree.reload();
		});

		this.items.add(
			h2("Simple tree"),
			demoTree,

			h2("Checkbox tree"),
			this.createCheckTree(),

			h2("Tree using datasource"),
			btn({
				icon: "refresh",
				handler: () => {
					dsTree.reload();
				}
			}),

			dsTree
		)
	}


	private createCheckTree() {
		const treeData: TreeRecord[] = [
			{
				id: "1",
				text: "Node 1",
				check: true,
				children: [
					{
						id: "1.1",
						text: "Node 1.1",
						children: [],
						check: false,
					},
					{
						id: "1.2",
						text: "Node 1.2",
						children: [],
						check: false,
					},
					{
						id: "1.3",
						text: "Node 1.3",
						children: [],
						check: false,
					},
					{
						id: "1.4",
						text: "Node 1.4",
						children: [],
						check: false,
					}
				]
			}, {
				check: false,
				id: "2",
				text: "Node 2",
				children: [
					{
						id: "2.1",
						text: "Node 2.1",
						children: [],
						check: false,
					},
					{
						id: "2.2",
						text: "Node 2.2",
						children: [],
						check: false,
					}
				]
			}
		];


		return tree({
			nodeProvider: () => treeData,
			listeners: {
				checkchange:(tree1, record, storeIndex, checked) => {
					console.log(record, checked, tree1);
				}
			}
		});
	}
}