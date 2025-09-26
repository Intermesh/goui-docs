import {autocompletechips, AutocompleteChips, column, store, table} from "@intermesh/goui";

const autocompleteRecords = [

	{email: "alfred@foo.org"},
	{email: "ben@foo.org"},
	{email: "cindy@foo.org"},
	{email: "daryl@foo.org"},
	{email: "edward@foo.org"},
	{email: "ferdinand@foo.org"},
	{email: "gina@foo.org"},
	{email: "hilbert@foo.org"},
	{email: "ian@foo.org"},
	{email: "john@example.org"},
	{email: "john@foo.org"} ,
	{email: "jane@foo.org"},
	{email: "kramer@foo.org"},
	{email: "louis@foo.org"},
	{email: "test@foo.org"},
];

export class RecipientsField extends AutocompleteChips {
	constructor() {
		super(
			table({
				fitParent: true,
				headers: false,
				store: store({
					data: autocompleteRecords,
					sort: [{
						property: "email",
						isAscending: true
					}]
				}),
				columns: [
					column({
						header: "E-mail",
						id: "email",
						sortable: true,
						resizable: true
					})
				]
			})

		);

		this.label = "To";
		this.name = "to";
		this.on("autocomplete", ({target, input}) => {
			//clone the array for filtering
			const filtered = structuredClone(autocompleteRecords).filter((r:any) => {
				return !input || r.email.toLowerCase().indexOf(input.toLowerCase()) === 0;
			});

			//simple local filter on the store
			target.list.store.loadData(filtered, false);
		});

		this.chipRenderer = (chip, value) => {
			chip.text = value;
		};

		this.textInputToValue = async (text: string) :Promise<any> => {
			return text;
		};

		this.pickerRecordToValue = (field, record) => {
			return record.email;
		}

	}
}