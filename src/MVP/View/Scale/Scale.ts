import createElement from "../../utility";
import EventEmitter from "../../EventEmitter";
import IOptions from "../../defaultOptions";

class Scale extends EventEmitter {
  private scale: HTMLElement;
  private parent: HTMLElement;
  private values: HTMLElement;

  constructor(parent: HTMLElement) {
    super();

    this.parent = parent;
    this.init();
  }

  init() {
    this.scale = createElement("div", { class: "slider__scale" });
    this.values = createElement("div", { class: "scale__values" });
    this.scale.appendChild(this.values);
    this.parent.appendChild(this.scale);
  }

  render(state: IOptions, sliderLength: number): void {
    if (state.scale) {
      this.scale.setAttribute("style", "display: block");
    } else {
      this.scale.setAttribute("style", "display: none");
    }
    state.vertical
      ? this.scale.classList.add("scale--vertical")
      : this.scale.classList.remove("scale--vertical");

    this.renderValues(state, sliderLength);
  }

  renderValues(state: IOptions, sliderLength: number): void {
    const { minVal, maxVal, step } = state;
    const elems = this.values.childNodes;

    while (elems.length) {
      elems.forEach((item) => {
        item.remove();
      });
    }

    let left = state.vertical ? 0 : 2;
    const maxWidthVal = Math.max(`${maxVal}`.length, `${minVal}`.length);

    const leftStep = 96 / (maxVal - minVal);

    for (let i = minVal; i <= maxVal; i++) {
      const value = createElement("div", { class: "value__item" });

      state.vertical
        ? value.setAttribute("style", `top: ${left}%`)
        : value.setAttribute("style", `left: ${left}%`);
      left += leftStep;
      value.innerHTML = `${i}`;
      this.values.appendChild(value);
    }
  }

}

export default Scale;
