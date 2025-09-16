import {Page} from "./Page.js";
import {
	btn, code,
	column,
	comp,
	datasourcestore,
	datecolumn,
	form,
	Form,
	Notifier,
	p, router,
	table,
	textfield
} from "@intermesh/goui";
import {demoDataSource, DemoEntity} from "./DemoDataSource.js"


export class Router extends Page {
	sourceURL = "Router.ts"


	constructor() {
		super();
		this.title = "Router";


		this.items.add(
			p({html: "GOUI comes with a router to enable navigation between pages within the SPA application. It's exported as an " +
				"instance called 'router'. " +
				"Typically, you can create a navigation menu, a card container component and setup the router to " +
				"load different " +
				"+cards when you click the menu items. The " +
				"<a href=\"https://github.com/Intermesh/goui-docs/blob/main/script/Index.ts\">index page</a> of this site is " +
				"a perfect example of this approach. Here's a simple example of the router usage:"}),

			code({html: "<div style=\"color: rgb(8, 8, 8); font-family: &quot;Fira Code&quot;, monospace; font-size: 9.8pt; white-space: pre;\"><span style=\"color: rgb(140, 140, 140); font-style: italic;\">// add a regular expression to match against the route with a<br></span><span style=\"color: rgb(140, 140, 140); font-style: italic;\">// function to execute.<br></span><span style=\"color: rgb(131, 0, 145);\">router<br></span><span style=\"color: rgb(131, 0, 145);\">  </span>.<span style=\"color: rgb(122, 122, 67);\">add</span>(<span style=\"color: rgb(38, 78, 255);\">/^mypage$/</span>, () =&gt; {<br>   <span style=\"color: rgb(140, 140, 140); font-style: italic;\">// handle the route. Perhaps add a new component to a<br></span><span style=\"color: rgb(140, 140, 140); font-style: italic;\">   // CardContainer to display. May return a promise so<br></span><span style=\"color: rgb(140, 140, 140); font-style: italic;\">   // start().then() will execute when this function is<br></span><span style=\"color: rgb(140, 140, 140); font-style: italic;\">   // done.<br></span><span style=\"color: rgb(140, 140, 140); font-style: italic;\">  </span>})<br>  .<span style=\"color: rgb(122, 122, 67);\">add</span>(<span style=\"color: rgb(38, 78, 255);\">/^mypage</span><span style=\"color: rgb(0, 55, 166);\">\\/</span><span style=\"color: rgb(38, 78, 255);\">([A</span><span style=\"color: rgb(0, 51, 179);\">-</span><span style=\"color: rgb(38, 78, 255);\">Za</span><span style=\"color: rgb(0, 51, 179);\">-</span><span style=\"color: rgb(38, 78, 255);\">z.0</span><span style=\"color: rgb(0, 51, 179);\">-</span><span style=\"color: rgb(38, 78, 255);\">9-]+)$/</span>, (arg) =&gt; {<br>   <span style=\"color: rgb(140, 140, 140); font-style: italic;\">// you can catch arguments using groups in the regular<br></span><span style=\"color: rgb(140, 140, 140); font-style: italic;\">   // expression.<br></span><span style=\"color: rgb(140, 140, 140); font-style: italic;\">   </span><span style=\"color: rgb(131, 0, 145);\">console</span>.<span style=\"color: rgb(122, 122, 67);\">log</span>(arg)<br>  })<br>  .<span style=\"color: rgb(122, 122, 67);\">start</span>()<br>  .<span style=\"color: rgb(122, 122, 67);\">then</span>(() =&gt; {<br>   <span style=\"color: rgb(140, 140, 140); font-style: italic;\">// the router function has been executed now.<br></span><span style=\"color: rgb(140, 140, 140); font-style: italic;\">  </span>})</div>"})
		)

	}
}

// add a regular expression to match against the route with a
// // function to execute.
// router
// 	.add(/^mypage$/, () => {
// 		// handle the route. Perhaps add a new component to a
// 		// CardContainer to display. May return a promise so
// 		// start().then() will execute when this function is
// 		// done.
// 	})
// 	.add(/^mypage\/([A-Za-z.0-9-]+)$/, (arg) => {
// 		// you can catch arguments using groups in the regular
// 		// expression.
// 		console.log(arg)
// 	})
// 	.start()
// 	.then(() => {
// 		// the router function has been executed now.
// 	})
//