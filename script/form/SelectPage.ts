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

				p("Forms can handle complex object structures using Container and Array type fields. They don't submit in the traditional way but return a Javascript Object that can be sent using an XHR or fetch API request. To see how this works fill in some data and press 'Save' below."),


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

							autocomplete: (field, text) => {
								//clone the array for filtering
								const filtered = autocompleteRecords.filter((r:AutoCompleteRecord) => {
									// console.warn(r.description, text, r.description.indexOf(text))
									return !text || r.description.toLowerCase().indexOf(text.toLowerCase()) === 0;
								});

								//simple local filter on the store
								field.list.store.loadData(filtered, false)
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
							render:comp => {
								//group the list by the group column
								comp.list.groupBy = "group";
								comp.list.store.queryParams = {
									filter: {
										parentId: undefined
									}
								};
								comp.list.store.sort = [{
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