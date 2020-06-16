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
    this.addListener();
  }

  init() {
    this.scale = createElement("div", { class: "slider__scale" });
    this.values = createElement("div", { class: "scale__values" });
    this.scale.appendChild(this.values);
    this.parent.appendChild(this.scale);
  }

  render(state: IOptions): void {
    if (state.scale) {
      this.scale.setAttribute("style", "display: block");

      state.vertical
        ? this.scale.classList.add("scale--vertical")
        : this.scale.classList.remove("scale--vertical");

      this.renderValues(state);
      this.range = state.range;
    } else {
      this.scale.setAttribute("style", "display: none");
    }
  }

  renderValues(state: IOptions): void {
    const { minVal, maxVal } = state;
    const elems: NodeListOf<ChildNode> = this.values.childNodes;

    while (elems.length) {
      elems.forEach((item) => {
        item.remove();
      });
    }

    let left: number = state.vertical ? 0 : 2;

    let val: HTMLElement = createElement("div", {
      class: "value__item-start value__item",
    });

    state.vertical
      ? val.setAttribute("style", `top: ${left}%`)
      : val.setAttribute("style", `left: ${left}%`);
    val.innerHTML = `${minVal}`;
    this.values.appendChild(val);

    left += 96;

    let valEnd: HTMLElement = createElement("div", {
      class: "value__item-end value__item",
    });

    state.vertical
      ? valEnd.setAttribute("style", `top: ${left}%`)
      : valEnd.setAttribute("style", `left: ${left}%`);

    valEnd.innerHTML = `${maxVal}`;
    this.values.appendChild(valEnd);
  }

  addListener() {
    this.scale.addEventListener("mousedown", this.clickScale.bind(this));
  }

  clickScale(event: MouseEvent): void {
    let target = event.target as HTMLElement;

    let isValEnd = target.className.indexOf("value__item-end") === 0;
    if (isValEnd) {
      this.range
        ? this.emit("clickScaleValEnd", { valEnd: target.innerHTML })
        : this.emit("clickScaleVal", { val: target.innerHTML });
    } else {
      this.emit("clickScaleVal", { val: target.innerHTML });
    }
  }
}

export default Scale;
