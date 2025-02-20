import {Page} from "./Page.js";
import {
	autocompletechips,
	btn, column,
	comp,
	fieldset,
	form,
	h2,
	htmlfield, store,
	t, table,
	tbar,
	textfield,
	win,
	Window as GouiWindow
} from "@intermesh/goui"

export class Window extends Page {
	sourceURL = "Window.ts";

	constructor() {
		super();

		this.title = "Window";

		this.items.add(
			btn({
				text: "Basic window",
				handler: () => {

					const w = win({
							title: "Basic window",
							modal: false,
							width: 400,
							height: 200,
							closable: true,
							maximizable: false,
							draggable: false,
							resizable: false,
						},

						comp({
							cls: "pad",
							text: "I'm a basic window. No features enabled."
						})
					);

					w.show();
				}
			}),


			btn({
				text: "Modal window",
				handler: () => {
					win({
							title: "Modal window",
							modal: true,
							width: 400,
							height: 200,
							closable: true,

							draggable: false,
							resizable: false
						},

						comp({
							cls: "pad",
							text: "I'm a modal window. You have to close me first."
						})
					).show();
				}
			}),

			btn({
				text: "Draggable and resizable window",
				handler: () => {
					win({
							title: "Draggable window",
							draggable: true,
							width: 400,
							height: 200,
							closable: true,
							maximizable: true,
							resizable: true,
							collapsible: true
						},

						comp({
							cls: "pad",
							text: "I'm a draggable window. Drag me with the header or resize me on the edges or corners."
						})
					).show();
				}
			}),

			btn({
				text: "Dialog with form",
				handler: () => {
					win({
							title: "Dialog with form",
							draggable: true,
							width: 900,
							height: 600,
							closable: true,
							maximizable: true,
							resizable: true,
							collapsible: true
						},

						form({
								flex: 1,
								cls: "vbox",
								handler: (f) => {
									GouiWindow.alert("<code>" + JSON.stringify(f.value, null, 4) + "</code>");
								}
							},

							fieldset({
									cls: "scroll vbox gap",
									flex: 1
								},

								textfield({
									label: t("Subject"),
									name: "subject",
									required: true,

								}),

								this.createToField(),

								htmlfield({
									flex: 1,
									name: "body",
									label: t("Body")
								})
							),

							tbar({},
								btn({
									type: "button",
									text: t("Attach files"),
									icon: "attach_file"
								}),

								'->',

								btn({
									type: "submit",
									text: t("Send")
								})
							)
						)
					).show();
				}
			})


			,


			h2({
				text: "Static functions"
			}),

			btn({
				text: "Alert",
				handler: () => {
					GouiWindow.alert("You clicked the alert button showing a GOUI alert dialog.")
				}
			}),

			btn({
				text: "Prompt",
				handler: async () => {
					const input = await GouiWindow.prompt("Enter your name", "Name");
					input != undefined ?
						GouiWindow.alert("Hi " + input) :
						GouiWindow.alert("You cancelled");
				}
			}),

			btn({
				text: "Confirm",
				handler: async () => {
					const confirmed = await GouiWindow.confirm("Are you sure you want to do this?");
					confirmed ?
						GouiWindow.alert("OK!", "Your answer") :
						GouiWindow.alert("STOP!", "Your answer");
				}
			}),


			btn({
				text: "Error dialog",
				handler: async () => {
						try {
							// @ts-ignore
							this.causeAnError();
						}
						catch(e) {
							GouiWindow.error(e);
						}

				}
			})
		)
	}

	private createToField() {

		const autocompleteRecords = [
			{email: "john@example.org"},
			{email: "john@foo.org"} ,
			{email: "jane@foo.org"},
			{email: "alfred@foo.org"},
		];

		return autocompletechips({
			label: "To",
			name: "to",
			listeners: {
				autocomplete: (field, input) => {
					//clone the array for filtering
					const filtered = structuredClone(autocompleteRecords).filter((r:any) => {
						return !input || r.email.toLowerCase().indexOf(input.toLowerCase()) === 0;
					});

					//simple local filter on the store
					field.list.store.loadData(filtered, false);
				}
			},

			chipRenderer: (chip, value) => {
				chip.text = value;
			},

			textInputToValue: async (text: string) :Promise<any> => {
				return text;
			},
			pickerRecordToValue(field, record): any {
				return record.email;
			},

			// dropdown list can be a table or list component
			list: table({
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
		});
	}
}