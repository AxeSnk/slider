import Panel from './Panel';
import '../MVP/sliderFacade';
import { IOptions } from '../MVP/utils/IOptions';

class Demo {
  $slider!: JQuery<Element>;

  panel!: Panel;

  constructor(public root: Element, options: Partial<IOptions> = {}) {
    this.init(options);
  }

  private init(options: Partial<IOptions>): void {
    const slider = this.root.querySelector('.js-slider');
    const panel = this.root.querySelector('.js-panel');

    this.$slider = $(slider!).slider(options) as JQuery<Element>;
    this.panel = new Panel(panel as HTMLElement, this.$slider);
  }
}

export default Demo;
