import {Page} from "../Page.js";
import {
	autocompletechips,
	btn,
	checkboxselectcolumn,
	chips,
	column,
	datasourcestore,
	DateTime,
	fieldset,
	form,
	p,
	store,
	table,
	tbar,
	Window
} from "@intermesh/goui";
import {demoDataSource} from "../DemoDataSource.js"
import {RecipientsField} from "../components/RecipientsField";


export class ChipsFieldPage extends Page {


	constructor() {
		super();

		this.title = "ChipsField";
		this.sourceURL = "form/ChipsFieldPage.ts";

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
					title: "Form",
					cls: "scroll fit",
					handler: (form) => {

						Window.alert("<code>" + JSON.stringify(form.value, null, 4) + "</code>");
					}
				},

				p("Forms can handle complex object structures using Container and Array type fields. They don't submit in the traditional way but return a Javascript Object that can be sent using an XHR or fetch API request. To see how this works fill in some data and press 'Save' below."),


				fieldset({

					},

					new RecipientsField(),

					chips({
						name: "fruits",
						label: "Fruits",
						value: ["Apple", "Banana", "Coconut"]
					}),

					autocompletechips({
						label: "Autocomplete single select",
						name: "acChips",
						chipRenderer: async (chip, value) => {
							chip.text = value.name;
						},

						textInputToValue: async (text: string) :Promise<any> => {
							return {name: text};
						},
						pickerRecordToValue(field, record): any {
							return {
								id: record.id,
								name: record.description
							};
						},
						listeners: {
							autocomplete: (field, input) => {
								//clone the array for filtering
								const filtered = structuredClone(autocompleteRecords).filter((r:AutoCompleteRecord) => {
									// console.warn(r.description, text, r.description.indexOf(text))
									return !input || r.description.toLowerCase().indexOf(input.toLowerCase()) === 0;
								});

								//simple local filter on the store
								field.list.store.loadData(filtered, false);
							}
						},

						// dropdown list can be a table or list component
						list: table({
							fitParent: true,
							headers: false,
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


					autocompletechips({
						list: table({
							fitParent: true,
							headers: false,
							store: datasourcestore({
								dataSource: demoDataSource
							}),
							rowSelectionConfig: {
								multiSelect: true
							},
							columns: [
								checkboxselectcolumn(),
								column({
									header: "Name",
									id: "name",
									sortable: true,
									resizable: true
								})
							]
						}),
						label: "Autocomplete with multi select",
						name: "acChipsMultiSelect",
						value: ["Test 2", "Test 4"],
						chipRenderer: async (chip, value) => {
							chip.text = value;
						},
						pickerRecordToValue(field, record): any {
							return record.name;
						},
						listeners: {
							autocomplete: (field, input) => {
								field.list.store.setFilter("autocomplete", {name: input});
								void field.list.store.load();
							}
						}
					})
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