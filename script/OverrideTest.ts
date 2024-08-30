// Demonstrates how to override a component.
// It's a pity it's not possible to override the constructor this way
// https://stackoverflow.com/questions/55230215/how-to-modify-the-constructor-of-an-es6-class
// We also can't use an init function
// https://stackoverflow.com/questions/43595943/why-are-derived-class-property-values-not-seen-in-the-base-class-constructor

import {Button} from "@intermesh/goui";
const origRender = Button.prototype.render, origOnAdded = Button.prototype.onAdded;

Button.prototype.onAdded = function (index:number) {
	origOnAdded.call(this, index);
	console.warn("Button is added to parent", this);
}

Button.prototype.render = function (parentEl, insertBefore) {
	console.warn("Button is rendered", this);
	return origRender.call(this, parentEl, insertBefore);
}
