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
    const { minVal, maxVal } = state;
    const elems: NodeListOf<ChildNode> = this.values.childNodes;

    while (elems.length) {
      elems.forEach((item) => {
        item.remove();
      });
    }

    let left: number = state.vertical ? 0 : 2;
    const maxWidthVal: number = Math.max(`${maxVal}`.length, `${minVal}`.length);
    const symbolWidth: number = this.getSymbolWidth(maxWidthVal);
    const maxQuantitySymbol: number = Math.floor(sliderLength / (symbolWidth * 1.5));
    const scaleStep: number = Math.floor((maxVal - minVal) / maxQuantitySymbol);

    const leftStep: number = 96 / maxQuantitySymbol;

    for (let i = minVal; i < maxVal; i = i + scaleStep) {
      const value = createElement("div", { class: "value__item" });

      state.vertical
        ? value.setAttribute("style", `top: ${left}%`)
        : value.setAttribute("style", `left: ${left}%`);
      left += leftStep;
      value.innerHTML = `${i}`;
      this.values.appendChild(value);
    }

  }

  getSymbolWidth(maxWidthVal: number): number {
    const elem: HTMLElement = createElement("div", { class: "value__item" });
    let symbols: string = '';
    for (let i = 0; i < maxWidthVal; i++) {
      symbols += "0";
    }
    elem.innerHTML = `${symbols}`;
    this.values.append(elem);
    const symboldWidth: number = Number(elem.getBoundingClientRect().width);
    this.values.removeChild(elem);

    return symboldWidth;
  }
}

export default Scale;
