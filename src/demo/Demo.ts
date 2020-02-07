import Panel from "./Panel";
import '../mvp/sliderFacade'
import IOptions from "../mvp/defaultOptions";

class Demo {
	$slider: JQuery<Element>;
  panel: Panel;

  constructor(public root: Element, options: Partial<IOptions> = {}) {
    this.init(options);
  }

  init(options: Partial<IOptions>) {
    const slider = this.root.querySelector('.js-demo__slider .slider__wrapper');
    const panel = this.root.querySelector('.js-demo__panel .panel__wrapper');

    this.$slider = $(slider).slider(options) as JQuery<Element>;
    this.panel = new Panel(panel as HTMLElement, this.$slider);
  }
}

export default Demo