import {Page} from "./Page.js";
import {cardmenu, cards, comp, p} from "@intermesh/goui"

export class CardContainer extends Page {
	constructor() {
		super();
		this.title = "Card container";
		this.sourceURL = './CardContainer.ts';

		this.items.add(
			p({html: "A CardContainer component contains multiple components but only one is shown. The others are hidden like in a pile of cards. In combination with a CardMenu you can create a tab panel:"}),

			comp({
					cls: "frame"
				},
				cardmenu(),
				cards({
						activeItem: 0
					},

					comp({
							title: "Tab 1",
							cls: "pad"
						},
						p("Deserunt harum quas cumque. Molestiae alias quia quod nihil sequi dignissimos quia. Quo quia tenetur tenetur.\n" +
							"\n" +
							"Hic est at veniam. Nisi commodi quia cum libero tempore qui illo in. Veniam neque mollitia non voluptatum dolorum excepturi.")
					),
					comp({
							title: "Tab 2",
							cls: "pad"
						},
						p("Minus perferendis sequi omnis rerum. Omnis molestiae voluptates quo. Dolorum possimus corporis distinctio officiis.\n" +
							"\n" +
							"Illum labore beatae numquam laboriosam rerum eveniet ullam qui. Voluptas est voluptate qui. Qui sunt quia molestias qui est. Eveniet beatae debitis suscipit qui. Et labore autem explicabo harum similique iure molestiae.")
					),
					comp({
							title: "Tab 3",
							cls: "pad"
						},
						p({html: "Voluptatum cum repellendus aut et. Et tempore rerum numquam cupiditate amet sed consequuntur. Quam natus voluptatem ullam. Ut ipsum autem ex eum doloremque ducimus velit."})
					)
				)
			)
		)
	}
}