import {Page} from "./Page";
import {h2, tree, TreeRecord} from "@intermesh/goui";
import {demoDataSource} from "./DemoDataSource";

export class Tree extends Page {
	constructor() {
		super();

		this.title = "Tree";
		this.sourceURL = "Tree.ts";

		const treeData: TreeRecord[] = [
			{
				id: "1",
				text: "Node 1",
				children: [
					{
						id: "1.1",
						text: "Node 1.1",
						children: [],
					},
					{
						id: "1.2",
						text: "Node 1.2",
						children: []
					},
					{
						id: "1.3",
						text: "Node 1.3",
						children: []
					},
					{
						id: "1.4",
						text: "Node 1.4",
						children: []
					}
				]
			}, {
				id: "2",
				text: "Node 2",
				children: [
					{
						id: "2.1",
						text: "Node 2.1",
						children: []
					},
					{
						id: "2.2",
						text: "Node 2.2",
						children: []
					}
				]
			}
		];


		const demoTree = tree({
			data: treeData,
			draggable: true,
			dropBetween: true,
			dropOn: true,
			listeners: {
				rowclick: (list, storeIndex, row, ev) => {
					console.log(list, storeIndex, row,ev);
				},
				drop: (tree, e, dropRow, dropIndex,  dropPos, dragData) => {

					const store = dragData.cmp.store;

					// remove the dragged record from the store
					store.removeAt(dragData.storeIndex);
					if(store == dragData.dropTree.store && dragData.storeIndex < dropIndex) {
						// if inserting in the same store we need to substract 1 from the index as we took one off.
						dropIndex--;
					}

					//add the record to the new position
					switch(dropPos) {
						case "on":
							// put it inside the dropped node at the end
							dragData.childrenTree.store.add(dragData.record);
						break;

						case "before":
							// reorder in the tree where it's dropped
							dragData.dropTree.store.insert(dropIndex, dragData.record);
							break;

						case "after":
							dragData.dropTree.store.insert(dropIndex + 1, dragData.record);
							break;
					}
				}
			}
		});


		/**
		 * Tree that pulls data out of a datasource
		 */
		const dsTree = tree(
			{
				draggable: true,
				dropOn: true,
				listeners: {
					// We populate the tree directly from a datasource on the expand event. This also fires on render for the root nodes.
					expand: async (tree1, childrenTree, record, storeIndex) => {

						const getResponse = await demoDataSource.get(),
							//at the root of the tree record is undefined
							parentId = record ? record.id : undefined,
							data = getResponse.list.filter(value => value.parentId == parentId)
							.map(e => {
								return {
									id: e.id + "",
									text: e.name,

									// set to empty array if it has no children. Then the tree knows it's a leaf.
									children: getResponse.list.find(value => value.parentId == e.id) ? undefined : []
								}
							});

						childrenTree.store.loadData(data, false);

						console.log(tree1.data);
					},

					drop: (list, e, dropRow, dropIndex, position, dragData) => {
						const dropRecord = dragData.dropTree.store.get(dropIndex);

						demoDataSource.update(dragData.record.id,{
							parentId: dropRecord.id
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
			data: treeData,
			listeners: {
				checkchange:(tree1, childrenTree, record, storeIndex, checked) => {
					console.log(record, checked, tree1.data);
				}
			}
		});
	}
}