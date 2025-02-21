import {Page} from "../Page.js";
import {
	arrayfield, ArrayUtil,
	btn, ContainerField,
	containerfield,
	fieldset,
	form,
	Sortable,
	p,
	select,
	tbar,
	textfield,
	Window, Form, ContainerFieldValue
} from "@intermesh/goui";


export class ArrayFieldPage extends Page {

	private arrayField;
	private sortableArrayField;
	private form: Form<ContainerFieldValue>;


	constructor() {
		super();

		this.title = "ArrayField";
		this.sourceURL = "form/ArrayFieldPage.ts";


		this.items.add(
			this.form = form({
					itemId: "form",
					title: "Form",
					cls: "scroll fit",
					handler: (form) => {

						Window.alert("<code>" + JSON.stringify(form.value, null, 4) + "</code>");
					}
				},

				p("An ArrayField can be used to represent an array of objects like contact e-mail addresses for example. Press 'Save' to see what that looks like."),


				fieldset({

					},


					this.arrayField = arrayfield({
						name: "arrayfield",
						/**
						 * This function is called to create form fields for each array item.
						 * Typically, a container field will be used.
						 */
						buildField: () => {
							const field = containerfield({
									cls: "group",
								},

								select({
									name: "type",
									width: 140,
									label: "Type",
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
						value: [{
							type: "work",
							email: "john@work.com"
						},
							{
								type: "home",
								email: "john@home.com"
							}]
					}),
					tbar({},
						'->',
						btn({
							icon: "add",
							cls: "outlined",
							text: "Add new value",
							handler: () => {
								
								this.arrayField.addValue({
									type: "home",
									email: "another@example.com"
								});
							}
						})
					),

					this.sortableArrayField = arrayfield({
						name: "sortablearrayfield",
						listeners: {
							render: comp => {
								const sortable = new Sortable(comp, ".group");
								sortable.on("sort", (field, toIndex, fromIndex, droppedOn, fromComp) => {
									comp.value = ArrayUtil.move(comp.value, fromIndex, toIndex);
								})
							}
						},
						/**
						 * This function is called to create form fields for each array item.
						 * Typically, a container field will be used.
						 */
						buildField: () => {
							const field = containerfield({
									cls: "group",
								},

								select({
									name: "type",
									width: 140,
									label: "Type",
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
								}),

								btn({
									icon: "delete",
									title: "Delete",
									handler: (btn) => {
										field.remove();
									}
								}),

								btn({
									cls: "handle",
									icon: "drag_handle",
									title: "Sort",
									listeners: {
										render: comp => {
											comp.el.addEventListener("mousedown", () => {
												const row = comp.findAncestorByType(ContainerField)!
												row.el.draggable = true;
											})

											comp.el.addEventListener("mouseup", () => {
												const row = comp.findAncestorByType(ContainerField)!
												row.el.draggable = false;
											})
										}
									}
								})
							);

							return field;
						},
						value: [
							{
								type: "work",
								email: "john@work.com"
							},
							{
								type: "home",
								email: "john@home.com"
							}, {
								type: "home",
								email: "foo@home.com"
							}, {
								type: "home",
								email: "bar@home.com"
							}]
					})
				),
				tbar({},
					'->',
					btn({
						icon: "add",
						cls: "outlined",
						text: "Add new value",
						handler: () => {

							this.sortableArrayField.addValue({
								type: "home",
								email: "another@example.com"
							});
						}
					})
				),



				tbar({cls: "bottom"},

					"->",
					
					btn({
						cls: "primary",
						text: "Save",
						type: "submit"
					}),

					btn({
						text: "Reset",
						type: "reset"
					}),

					btn({
						text: "Clear",
						type: "button",
						handler: () => {
							this.form.clear();
						}
					}),


					btn({
						text: "Load",
						handler: () => {
							const dataSets = [
								{
									"set": "set1",
									"arrayfield": [
										{
											"type": "work",
											"email": "john@work1.com"
										},
										{
											"type": "home",
											"email": "john@home1.com"
										}
									],
									"sortablearrayfield": [
										{
											"type": "work",
											"email": "john@work1.com"
										},
										{
											"type": "home",
											"email": "john@home1.com"
										},
										{
											"type": "home",
											"email": "foo@home1.com"
										},
										{
											"type": "home",
											"email": "bar@home1.com"
										}
									]
								},
								{
									"set": "set2",

									// this will empty the field
									"arrayfield": [
									],
									"sortablearrayfield": [
										{
											"type": "work",
											"email": "john@work2.com"
										},
										{
											"type": "home",
											"email": "john@home2.com"
										},
										{
											"type": "home",
											"email": "foo@home2.com"
										},
									]
								},
								{
									"set": "set3",

									// omitting it will reset the field to the value that was used to generate it.
									// "arrayfield": [
									//
									// ],
									"sortablearrayfield": [
										{
											"type": "work",
											"email": "john@work3.com"
										},
										{
											"type": "home",
											"email": "john@home3.com"
										},
										{
											"type": "home",
											"email": "bar@home3.com"
										}
									]
								}
							]

							this.form.value = dataSets[Math.floor(Math.random() * 3)];
						}
					})
				)
			)
		)
	}
}