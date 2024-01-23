import {a, btn, cards, comp, Component, h2, img, Menu, menu, radio, root, router} from "@intermesh/goui";
import {Button} from "./Button.js";

import {Window} from "./Window.js";
import {List} from "./List.js";
import {Home} from "./Home.js";
import {NotFound} from "./NotFound.js";
import {CardContainer} from "./CardContainer.js";
import {Layout} from "./Layout.js";
import {Tree} from "./Tree.js";

import {Component as ComponentPage} from "./Component.js";
import {Data} from "./Data.js";
import {Table} from "./Table.js";
import {DragAndDrop} from "./DragAndDrop";
import {Router} from "./Router";
import {MainMenu} from "./MainMenu";
import {TextFieldPage} from "./form/TextFieldPage";
import {NumberFieldPage} from "./form/NumberFieldPage";
import {DateTimePage} from "./form/DateTimePage";
import {SelectPage} from "./form/SelectPage";
import {HtmlFieldPage} from "./form/HtmlFieldPage";
import {ChecksAndRadios} from "./form/ChecksAndRadios";
import {ContainerFieldPage} from "./form/ContainerFieldPage";
import {MapFieldPage} from "./form/MapFieldPage";
import {ArrayFieldPage} from "./form/ArrayFieldPage";
import {ChipsFieldPage} from "./form/ChipsFieldPage";
import {DisplayFieldPage} from "./form/DisplayFieldPage";
import {Form} from "./Form";
import {GetStarted} from "./GetStarted";
import {DatePickerPage} from "./DatePickerPage";

/**
 * Create main card panel for displaying SPA pages
 */
const main = cards({cls: "main", flex: 1});

const logo = img({
	style: {width: "66px", height: "56px", padding: "8px 8px 8px 18px", verticalAlign: "middle"},
	src: "./resources/groupoffice-icon.png"
});

const header = comp({
	tagName: "header",
	cls: "hbox"
},
	btn({
		icon: "menu",
		cls: "btn-open-menu",
		handler: () => {
			root.el.classList.add("open-menu");
		}
	}),

	comp({
		cls: "hbox",
		flex: 1
	},
		logo,
		h2({text: "GOUI", flex: 1}),

		a({
			href: "https://goui.io/api",
			text: 'API'
		}),

		a({
			href: "https://github.com/intermesh/goui",
		},
			img({
				src: "resources/github.png",
				alt: "GitHub",
				width: 24,
				height: 24
			})
		),

		btn({
			icon: "format_color_fill",
			menu: menu({},
					radio({
						type: "box",
						name: "theme",
						value: "system",
						options: [
							{text: "System", value: "system"},
							{text: "Light", value: "light"},
							{text: "Dark", value: "dark"}
						],
						listeners: {
							change: (field, newValue, _oldValue) => {
								root.el.classList.toggle("dark", newValue == "dark");
								root.el.classList.toggle("light", newValue == "light");
								root.el.classList.toggle("system", newValue == "system");

								field.findAncestorByType(Menu)!.close();
							}
						}
					})
				)
		})
	),

)


/**
 * To make it memory efficient we will instantiate page components on demand when the router navigates.
 * @param cmp
 */
const pageLoader = (cmp: typeof Component) => {
	const id = router.getPath() || "home";
	let page = main.findItem(id) as Component | undefined;
	if (!page) {
		page = new cmp;
		page.id = id;

		main.items.add(page);
	}

	page.show();

	return page;
}

/**
 * Setup routes
 */
router
	.add(/^$/, () => {
		pageLoader(Home);
	})
	.add(/^buttons$/, () => {
		pageLoader(Button);
	})

	.add(/^getstarted$/, () => {
		pageLoader(GetStarted);
	})

	.add(/^form$/, async () => {
		pageLoader(Form);
	})
	.add(/^form\/TextField$/, async () => {
		pageLoader(TextFieldPage);
	})
	.add(/^form\/TextField$/, async () => {
		pageLoader(TextFieldPage);
	})
	.add(/^form\/NumberField$/, async () => {
		pageLoader(NumberFieldPage);
	})
	.add(/^form\/DateTime$/, async () => {
		pageLoader(DateTimePage);
	})
	.add(/^form\/Select$/, async () => {
		pageLoader(SelectPage);
	})
	.add(/^form\/HtmlField$/, async () => {
		pageLoader(HtmlFieldPage);
	})
	.add(/^form\/ChecksAndRadios$/, async () => {
		pageLoader(ChecksAndRadios);
	})
	.add(/^form\/ContainerField$/, async () => {
		pageLoader(ContainerFieldPage);
	})
	.add(/^form\/MapField$/, async () => {
		pageLoader(MapFieldPage);
	})
	.add(/^form\/ArrayField$/, async () => {
		pageLoader(ArrayFieldPage);
	})
	.add(/^form\/ChipsField$/, async () => {
		pageLoader(ChipsFieldPage);
	})
	.add(/^form\/DisplayField$/, async () => {
		pageLoader(DisplayFieldPage);
	})
	.add(/^table$/, () => {
		pageLoader(Table);
	})
	.add(/^window$/, () => {
		pageLoader(Window);
	})
	.add(/^list$/, () => {
		pageLoader(List);
	})
	.add(/^tree$/, () => {
		pageLoader(Tree);
	})
	.add(/^component$/, () => {
		pageLoader(ComponentPage);
	})
	.add(/^cardcontainer$/, () => {
		pageLoader(CardContainer);
	})
	.add(/^layout$/, () => {
		pageLoader(Layout);
	})
	.add(/^data$/, () => {
		pageLoader(Data);
	})
	.add(/^draganddrop$/, () => {
		pageLoader(DragAndDrop);
	})
	.add(/^router$/, () => {
		pageLoader(Router);
	})
	.add(/^datepicker$/, () => {
		pageLoader(DatePickerPage);
	})
	.add(() => {
		pageLoader(NotFound);
	})
	.start()
	.then(() => {
		/**
		 * Use hbox layout to put menu and section side by side
		 */
		// root.cls = 'vbox';
		root.items.add(

			header,
			comp({
				cls: "hbox main-container",
				// flex: 1
			},
				comp({cls: "side-bar"}, new MainMenu()),
				// splitter({
				// 	resizeComponentPredicate: mainMenu
				// }),
				comp({
					flex: 1,
					cls: "main"
				},
					main

				)
			),

			comp({
				cls: "overlay",
				listeners: {
					render: overlay => {
						overlay.el.addEventListener("click", () => {
							root.el.classList.remove("open-menu");
						})
					}
				}
			})
		)
	});



