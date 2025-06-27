import {
	btn,
	Button as Btn,
	checkbox,
	colorpicker,
	comp,
	h2,
	hr,
	Menu,
	menu,
	Notifier,
	p,
	root, t,
	tbar,
	h3,
	collapsebtn
} from "@intermesh/goui"
import {Page} from "./Page.js";

export class Button extends Page {
	constructor() {
		super();

		this.sourceURL = "Button.ts";
		this.title = "Buttons";

		this.items.add(
			p("This page shows all the buttons, toolbars and menu components."),

			h2({
				text: "Basic"
			}),

			tbar({},

				btn({
					text: "Basic",
					handler: this.onClick
				}),

				btn({
					text: "Primary",
					cls: "primary",
					handler: this.onClick
				}),

				btn({
					text: "Accent",
					cls: "accent",
					handler: this.onClick
				}),

				btn({
					text: "Disabled",
					handler: this.onClick,
					disabled: true
				})
			),

			h2({
				text: "Filled buttons"
			}),

			tbar({},

				btn({
					text: "Basic",
					handler: this.onClick,
					cls: "filled"
				}),

				btn({
					text: "Primary",
					cls: "primary filled",
					handler: this.onClick
				}),

				btn({
					text: "Accent",
					cls: "accent filled",
					handler: this.onClick
				}),

				btn({
					text: "Disabled",
					cls: "filled",
					handler: this.onClick,
					disabled: true
				})
			),

			h2({
				text: "Outlined buttons"
			}),

			tbar({},

				btn({
					text: "Basic",
					handler: this.onClick,
					cls: "outlined"
				}),

				btn({
					text: "Primary",
					cls: "primary outlined",
					handler: this.onClick
				}),

				btn({
					text: "Accent",
					cls: "accent outlined",
					handler: this.onClick
				}),

				btn({
					text: "Disabled",
					cls: "outlined",
					handler: this.onClick,
					disabled: true
				})
			),


			h2({
				text: "Icons from the Material font"
			}),

			tbar({},

				btn({
					icon: "more_vert",
					handler: this.onClick
				}),

				btn({
					icon: "close",
					cls: "primary",
					handler: this.onClick
				}),

				btn({
					icon: "save",
					cls: "accent",
					handler: this.onClick
				}),
				btn({
					icon: "more",
					text: "Disabled",
					handler: this.onClick,
					disabled: true
				})
			),

			h2("Grouped"),

			comp({cls: "group"},
				btn({
					icon: "format_bold",
					handler: this.onClick
				}),

				btn({
					icon: "format_italic",
					handler: this.onClick
				}),

				btn({
					icon: "format_underlined",
					handler: this.onClick
				})
			),

			h2({
				text: "A toolbar with menu buttons"
			}),

			tbar({
					style: {
						backgroundColor: "#0277bd",
						color: "white"
					}
				},
				btn({
					text: "Menu",
					menu: menu({},

						btn({
							text: "Alerts",
							menu: menu({},
								btn({
									text: "Success",
									handler: () => {
										Notifier.success("That went super!")
									}
								}),

								btn({
									text: "Error",
									handler: () => {
										Notifier.error("That went wrong!")
									}
								}),

								btn({
									text: "Warning",
									handler: () => {
										Notifier.warning("Look out!")
									}
								}),

								btn({
									text: "Notice",
									handler: () => {
										Notifier.notice("Heads up.")
									}
								})
							)
						}),

						btn({
							text: "Mask 3s",
							handler: () => {
								root.mask();
								setTimeout(() => {
									root.unmask();
								}, 1000);
							}
						}),

						hr(),

						btn({
							text: "Test",
							handler: this.onClick,
							menu: menu({},
								btn({
									text: "Test 1.1",
									handler: this.onClick,
								}),

								btn({
									text: "Test 2.2",
									handler: this.onClick,
									menu: menu({},
										btn({
											text: "Test 2.2.1",
											handler: this.onClick,
										}),
										btn({
											text: "Test 2.2.2",
											handler: this.onClick,
										})
									)
								}),
								btn({
									text: "Test 2.3",
									handler: this.onClick,
								})
							)
						}),

						checkbox({
							label: "Checkbox menu item 1",
							name: "checkbox1",
							value: true
						}),

						checkbox({
							label: "Checkbox menu item 2",
							name: "checkbox2",
							value: true
						}),

						btn({
							text: "And a button",

						})
					)
				}),

				hr(),

				btn({
					text: "Color",
					menu: menu({}, colorpicker({
						listeners: {
							select: ({target, color}) => {
								target.parent!.el.style.color = "#" + color;
								target.hide();
							}
						}
					}))
				}),

				"->",

				btn({
					icon: "menu",
					menu: menu({
						},
						btn({
							text: "Item 1"
						}),
						btn({
							text: "Item 2"
						}),
						btn({
							text: "Item 3",
							menu: menu({},
								btn({
									text: "Item 3.1"
								}),
								btn({
									text: "Item 3.2"
								})
							)
						})
					)
				})
			),

			h2({
				text: "Navigation menu"
			}),

			menu({cls: "demo"},
				btn({
					text: "Home",
					route: ""
				}),
				btn({
					text: "Buttons",
					route: "buttons"
				}),
				btn({
					text: "Form",
					route: "form"
				}),
				btn({
					text: "Table",
					route: "table"
				}),
				btn({
					text: "Window",
					route: "window"
				})
			),


			h2({
				text: "Context menu"
			}),

			comp({
				text: t("Right click on me to show context menu"),
				height: 100,
				cls: "frame pad",
				listeners: {
					render: ({target}) => {
						target.el.addEventListener("contextmenu", ev => {

							ev.preventDefault();

							const contextMenu = menu({
								isDropdown: true
							},
								btn( {
									icon: "open_in_browser",
									text: t("Open")
								}),

								btn({
									icon: "edit",
									text: t("Edit")
								}),

								hr(),
								btn( {
									cls: "danger",
									icon: "delete",
									text: t("Delete")
								}),
								);

							contextMenu.showAt(ev);
						})
					}
				}
			}),

			h2("Collapsible button"),

			this.createCollapsibleCard()

		)

	}


	private createCollapsibleCard() {
		const body = comp({
			cls: "pad",
			text: "Click the button in the toolbar to collapse and expand this body."
		})

		return comp({cls: "card"},
			tbar({},
				h3("Collapsible card"),
				"->",
				collapsebtn({
					collapseEl: body
				})
			),
			body
		);
	}

	private onClick(btn: Btn) {
		const msg = "You clicked the '" + (btn.icon ?? btn.text) + "' button";
		console.log(msg);
		Notifier.success(msg);
	}
}