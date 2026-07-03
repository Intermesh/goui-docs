// Demonstrates how to patch / override a component.

// It's a pity it's not possible to override the constructor this way
// https://stackoverflow.com/questions/55230215/how-to-modify-the-constructor-of-an-es6-class
// We also can't use an init function
// https://stackoverflow.com/questions/43595943/why-are-derived-class-property-values-not-seen-in-the-base-class-constructor

import {Button} from "@intermesh/goui"

Button.patch(function() {
	this.on("click", () => {
		console.warn("Override click handler called", this);
	})
})

