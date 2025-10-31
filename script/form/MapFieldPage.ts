import {Page} from "../Page.js";
import {
	btn,
	containerfield,
	fieldset,
	form,
	MapField,
	mapfield,
	p,
	select,
	tbar,
	textfield,
	Window
} from "@intermesh/goui";


export class MapFieldPage extends Page {
	private mapField: MapField;


	constructor() {
		super();

		this.title = "MapField";
		this.sourceURL = "form/MapFieldPage.ts";


		this.items.add(
			form({
					itemId: "form",
					title: "Form",
					cls: "scroll fit",
					handler: (form) => {

						Window.alert("<code>" + JSON.stringify(form.value, null, 4) + "</code>");
					}
				},

				p({html: "A MapField represents a key value object. Press 'Save' to see what that looks like."}),


				fieldset({

					},

					this.mapField = mapfield({
						name: "mapfield",
						required: true,
						buildField: () => {
							const field = containerfield({
									cls: "group",
								},

								select({
									name: "type",
									width: 140,
									label: "Type",
									value: "work",
									options: [
										{
											value: "work",
											name: "Work"
										},
										{
											value: "home",
											name: "Home"
										}
									]
								}),
								textfield({
									flex: 1,
									label: "E-mail",
									name: "email",
									required: true
								}),

								btn({
									icon: "delete",
									title: "Delete",
									handler: (btn) => {
										field.remove();
									}
								})
							);

							return field;
						},

						value: {
							"key1": {
								type: "work",
								email: "john@work.com"
							},

							"key2": {
								type: "home",
								email: "john@home.com"
							}
						}
					}),

					tbar({},
						'->',
						btn({
							icon: "add",
							cls: "outlined",
							text: "Add new value",
							handler: () => {
								this.mapField.add({})
							}
						})
					)
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