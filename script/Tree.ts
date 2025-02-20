import {Page} from "./Page.js"
import {
	h2,
	TreeRecord,
	Tree as TreeComp,
	tree,
	btn, treecolumn, datecolumn,

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
						id: "name",
						header: "Name",
						defaultIcon: "folder",
						sortable: true
					}),
					datecolumn({
						header: "Created At",
						id: "createdAt",
						sortable: true
					}),
				],
				nodeProvider:   async (record, store) : Promise<TreeRecord[]> => {

					let childIds;
					if(record) {
						// We already fetched the childIds in its parent. See below
						childIds = record.childIds;
					} else {
						// When there's no record we're fetching the root of the tree
						const q = await demoDataSource.query({
							filter: {parentId: null},
							sort: store.sort
						});

						childIds = q.ids;
					}

					const getResponse = await demoDataSource.get(childIds)
					//at the root of the tree record is undefined
					return Promise.all(getResponse.list.map(async (e) => {
						// prefetch child id's so the Tree component knows if this node has children
						const childIds = (await demoDataSource.query({filter: {parentId: e.id}})).ids;

						return {
							id: e.id + "",
							name: e.name,
							createdAt: e.createdAt,

							// Store the child id's in the node record so we can use it when it's expanded
							childIds,

							// Set to empty array if it has no children. Then the Tree component knows it's a leaf and won't present an expand arrow
							children: childIds.length ? undefined : []
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

			dsTree.store.reload();
		});

		this.items.add(
			h2("Simple tree"),
			demoTree,

			h2("Checkbox tree"),
			this.createCheckTree(),

			h2("Tree table using datasource"),
			btn({
				icon: "refresh",
				handler: () => {
					dsTree.store.reload();
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