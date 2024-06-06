import {Page} from "./Page.js";
import {btn, column, comp, datasourcestore, datecolumn, h2, splitter, table, tree} from "@intermesh/goui";
import {demoDataSource, DemoEntity} from "./DemoDataSource";

type TreeRecord = {
	id?: string,
	text: string
	children?: TreeRecord[]
}

export class DragAndDrop extends Page {
	sourceURL = "DragAndDrop.ts";

	constructor() {
		super();

		this.title = "Drag And Drop";

		const tree = this.createTree();


		const table = this.createTable();

		this.items.add(

			h2("Table sorting"),

			this.createSortTable(),

			h2("Tree sorting and moving"),

			this.createSortingTree(),

			h2("From table to tree"),
			comp({cls: "hbox"},
				// btn({
				// 	icon: "refresh",
				// 	handler: () => {
				// 		tree.reload();
				// 	}
				//
				// }) ,
				tree,

				splitter({
					resizeComponentPredicate: tree
				}),

				comp({cls: "pad scroll", flex: 1},
					table)

			),


		)
	}

	private createSortingTree() {
		return tree({
			data: [
				{
					id: "1",
					text: "Node 1",
					children: [
						{
							id: "1.1",
							text: "Node 1.1",
							children: []
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
			],
			draggable: true,
			dropBetween: true,
			dropOn: true,
			listeners: {
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
	}

	private createSortTable() {
		return table({
			fitParent: true,
			store: datasourcestore({
				dataSource: demoDataSource,
				queryParams: {
					filter: {
						parentId: undefined
					},
					limit: 10
				}
			}),

			sortable: true,

			columns: [

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
			],

			listeners: {
				render: sender => {
					sender.store.load();
				}
			}
		})
	}

	private createTable() {
		return table({
			fitParent: true,
			store: datasourcestore({
				dataSource: demoDataSource,
				queryParams: {
					filter: {
						parentId: undefined
					},
					limit: 10
				}
			}),

			draggable: true,
			dropBetween: false,
			dropOn: false,

			columns: [

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
			],

			listeners: {

				// dropallowed:(list, e, dropRow, dragData) => {
				// 	// todo: this should not be needed to disable drop
				// 	return false;
				// },

				render: sender => {
					sender.store.load();
				}
			}
		})
	}

	createTree() {
		const dsTree = tree(

			{
				width: 180,
				listeners: {
					drop: (tree, e, dropRow, dropIndex, dropPos, dragData) => {

						const dropRecord = dragData.dropTree.store.get(dropIndex);

						void demoDataSource.update(dragData.record.id, {
							parentId: dropRecord.id
						});
					},
					// We populate the tree directly from a datasource on the beforeexpand event. This also fires on render for the root nodes.
					beforeexpand: (tree1, childrenTree, record, storeIndex) => {

						// we already fetched the nodes
						if(childrenTree.store.loaded) {
							return;
						}

						// Get the data
						demoDataSource.get().then(getResponse => {
							//at the root of the tree record is undefined
							const parentId = record ? record.id : undefined,
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

							// retry expand
							childrenTree.expand();
						})

						//cancel the expand action. We will call it when data has been fetched.
						return false;
					},
				},
				draggable: true,
				dropOn: true
			}
		);

		// when the data source changes reload the tree
		demoDataSource.on("change", () => {

			dsTree.reload();
		});

		return dsTree;

	}

	private demoEntityToTreeRecord = async (e:DemoEntity): Promise<TreeRecord> => {
		const children = await demoDataSource.query({
			filter: {parentId: e.id}
		});
		const rec = {
			id: e.id + "",
			text: e.name,
			children: children.ids.length ? undefined : [] // set to empty array if has no childen so
			// the tree knows it's a leaf
		}

		return rec;
	}
}