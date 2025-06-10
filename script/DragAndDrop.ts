import {Page} from "./Page.js";
import {
	btn,
	column,
	comp,
	datasourcestore,
	datecolumn,
	h2, List, SelectedRow,
	Sortable,
	splitter, Store, Table,
	table,
	Tree,
	tree, treecolumn,
	TreeRecord
} from "@intermesh/goui"
import {demoDataSource, DemoEntity} from "./DemoDataSource.js"


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
			// btn({
			// 	text: "Refresh",
			// 	icon: "refresh",
			// 	handler: () => {
			// 		tree.store.reload();
			// 	}
			//
			// }) ,
			comp({cls: "hbox"},

				tree,

				splitter({
					resizeComponent: tree
				}),

				comp({cls: "pad scroll", flex: 1},
					table)

			),


		)
	}

	private createSortingTree() {
		return tree({
			nodeProvider: () => [
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
			dropOn: false,
			listeners: {

				drop: (toComp, toIndex,fromIndex, droppedOn, fromComp) => {

					if(fromComp != toComp) {
						const record = (fromComp as Tree).store.get(fromIndex)!;
						(fromComp as List).store.removeAt(fromIndex);
						toComp.store.insert(toIndex, record)
					} else {
						toComp.store.move(fromIndex, toIndex);
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
						parentId: null
					},
					limit: 10
				}
			}),

			dropBetween: true,
			dropOn: false,
			draggable: true,

			columns: [

				column({
					header: "ID",
					id: "id",
					sortable: true,
					resizable: true,
					width: 70,
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
			],

			listeners: {
				render: sender => {
					void sender.store.load();
				},
				drop: (toComp, toIndex,fromIndex, droppedOn, fromComp) => {

					toComp.store.move(fromIndex, toIndex);

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
						parentId: null
					},
					limit: 10
				}
			}),

			sortableGroup: "gridtotree",
			draggable: true,
			dropBetween: false,
			dropOn: false,
			rowSelectionConfig: {
				multiSelect:true
			},

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
				columns: [
					treecolumn({
						id: "name",
						header: "Name",
						defaultIcon: "folder",
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

				rowSelectionConfig: {
					multiSelect:true
				},
				sortableGroup: "gridtotree",
				draggable: true,
				dropOn: true,
				dropBetween: false,
				width: 240,
				listeners: {
					drop: (toComponent, toIndex, fromIndex, droppedOn, fromComp, dragData) => {

						const selectedRowIndexes = dragData.selectedRowIndexes as SelectedRow<Store>[],
							fromRecords = selectedRowIndexes.map(row => row.record);

						const toRecord = toComponent.store.get(toIndex)!;

						if(fromComp instanceof List && fromComp.rowSelection) {
							fromComp.rowSelection!.clear();
						}

						fromRecords.forEach(fromRecord => {
							void demoDataSource.update(fromRecord.id!, {
								parentId: toRecord.id
							});
						});
					},
					dropallowed: (toComponent, toIndex, fromIndex, droppedOn, fromComp) => {
						const toRecord = toComponent.store.get(toIndex)!;

						// disallow drops on nodes with 10 just because we can :)
						return toRecord.name.indexOf("10") == -1;
					},

				}
			}
		);

		// when the data source changes reload the tree
		demoDataSource.on("change", () => {
			void dsTree.store.reload();
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