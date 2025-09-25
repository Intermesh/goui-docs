import {Page} from "../Page.js";
import {
	autocomplete,
	btn,
	colorfield,
	column,
	combobox,
	datasourcestore,
	DateTime,
	Field,
	fieldset,
	form,
	list,
	listfield,
	p,
	select,
	store,
	table,
	tbar,
	Window
} from "@intermesh/goui";
import {demoDataSource, DemoEntity} from "../DemoDataSource.js"


export class SelectPage extends Page {


	constructor() {
		super();

		this.title = "Select fields";
		this.sourceURL = "form/SelectPage.ts";

		type AutoCompleteRecord = {
			id: number,
			description: string,
			createdAt: string
		}
		// Create some records to use for the autocomplete store below
		const autocompleteRecords: AutoCompleteRecord[] = [];

		for (let i = 1; i <= 20; i++) {
			autocompleteRecords.push({
				id: i,
				description: "Test " + i,
				createdAt: (new DateTime()).addDays(Math.ceil(Math.random() * -365)).format("c")
			});
		}


		this.items.add(
			form({
					itemId: "form",
					cls: "scroll fit",
					handler: (form) => {

						Window.alert("<code>" + JSON.stringify(form.value, null, 4) + "</code>");
					}
				},

				p({html: "In the examples below you'll find simple select fields and auto complete fields using data sources."}),


				fieldset({
					},

					select({
						label: "Select",
						name: "select",
						value: 1,
						options: [

							{
								value: 1,
								name: "Option 1"
							},
							{
								value: 2,
								name: "Option 2"
							},
							{
								value: null,
								name: "Set null"
							},
						]
					}),

					autocomplete({
						hint: "Type 'test' to autocomplete. Use the arrow keys for keyboard navigation.",
						// required: true,
						label: "Autocomplete",
						name: "autocomplete",

						pickerRecordToValue: (field, record) => {
							return record.id;
						},

						async valueToTextField (field, value: any): Promise<string> {
							const record = field.list.store.find(r => r.id == value);
							return record ? record.description : "";
						},

						// value: 3,

						buttons: [
							btn({
								icon: "clear",
								type: "button",
								handler: (btn) => {
									(btn.parent!.parent! as Field).value = undefined;
								}
							})
						],
						listeners: {

							autocomplete: ({target, input}) => {
								//clone the array for filtering
								const filtered = autocompleteRecords.filter((r:AutoCompleteRecord) => {
									// console.warn(r.description, text, r.description.indexOf(text))
									return !input || r.description.toLowerCase().indexOf(input.toLowerCase()) === 0;
								});

								//simple local filter on the store
								target.list.store.loadData(filtered, false)
							}
						},

						list: table({
							headers: false,
							fitParent: true,
							store: store<AutoCompleteRecord>({
								data: autocompleteRecords,
								sort: [{
									property: "description",
									isAscending: true
								}]
							}),
							columns: [
								column({
									header: "Description",
									id: "description",
									sortable: true,
									resizable: true
								})
							]
						})


					}),

					combobox({
						label: "Combo box",
						name: "comboBox",
						filterName: "name",
						dataSource: demoDataSource,
						hint: "A combo box is an extension of an autocompletefield and simplifies the creation of a combo box",
						listeners: {
							render:({target}) => {
								//group the list by the group column
								target.list.groupBy = "group";
								target.list.store.queryParams = {
									filter: {
										parentId: null
									}
								};
								target.list.store.sort = [{
									isAscending: true,
									property: "group"
								}, {
									isAscending: true,
									property: "name"
								}]
							}
						}
					}),


					listfield({
						label: "Listfield",
						name: "listfield",
						hint: "A field similar to a standard HTML select field but with full HTML support in the options and rendering.",
						list: list({
							cls: "listfield-list",
							store: datasourcestore({
								dataSource: demoDataSource
							}),
							renderer: (record:DemoEntity, row, list1, storeIndex) => {
								return `<i class="icon" style="display: inline-block;vertical-align: middle">person</i> ${record.name}`;
							}
						}),
						valueProperty: "id",
						async renderValue(field, value: string): Promise<string> {
							const record = await demoDataSource.single(value);

							return `<i class="icon" style="display: inline-block;vertical-align: middle">person</i> ${record!.name}`;
						}

					}),


					colorfield({
						width: 100,
						label: "Color",
						name: "color",
						value: "2196F3"
					}),

				),

				tbar({cls: "bottom"},

					"->",
					
					btn({
						cls: "primary",
						html: "Save",
						type: "submit"
					})
				)
			)
		)
	}
}