import createElement from "../../utility";
import IOptions from "../../defaultOptions";

export default class Slider {
  private slider: HTMLElement;
  private parent: HTMLElement;

  constructor(parent: HTMLElement) {
    this.parent = parent;
    this.slider = createElement("div", { class: "slider" });
    this.parent.appendChild(this.slider);
  }

  setOrientation(state: IOptions): void {
    state.vertical
      ? this.slider.classList.add("slider--vertical")
      : this.slider.classList.remove("slider--vertical");
  }

  getPosition(state: IOptions): number {
    return state.vertical
      ? this.slider.getBoundingClientRect().top
      : this.slider.getBoundingClientRect().left;
  }

  getLength(state: IOptions): number {
    return state.vertical ? this.slider.offsetHeight : this.slider.offsetWidth;
  }

  getElement(): HTMLElement {
    return this.slider;
  }
}
