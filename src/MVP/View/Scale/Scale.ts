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

  public render(state: IOptions): void {
    this.state = state;
    if (state.scale) {
      this.scale.setAttribute("style", "display: block");

      state.vertical
        ? this.scale.classList.add("scale--vertical")
        : this.scale.classList.remove("scale--vertical");

      this.renderValues(state);
    } else {
      this.scale.setAttribute("style", "display: none");
    }
  }

  private init() {
    this.scale = createElement("div", { class: "slider__scale" });
    this.values = createElement("div", { class: "scale__values" });
    this.scale.appendChild(this.values);
    this.parent.appendChild(this.scale);
  }

  private renderValues(state: IOptions): void {
    const { minVal, maxVal, vertical } = state;
    const elems: NodeListOf<ChildNode> = this.values.childNodes;

    while (elems.length) {
      elems.forEach((item) => {
        item.remove();
      });
    }

    let left: number = vertical ? 0 : 2;

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

  private addListener() {
    this.scale.addEventListener("mousedown", this.clickScale.bind(this));
  }

  private clickScale(event: MouseEvent): void {
    let target = event.target as HTMLElement;
    const { maxVal, minVal, range } = this.state;

    let isValEnd = target.className.indexOf("value__item-end") === 0;

    if (isValEnd) {
      range
        ? this.emit("clickScaleValEnd", { valEnd: maxVal })
        : this.emit("clickScaleVal", { val: maxVal });
    }

    if (!isValEnd) {
      if (range) {
        this.emit("clickScaleVal", { val: minVal });
      } else {
        this.emit("clickScaleVal", { val: minVal });
        this.emit("clickScaleValEnd", { valEnd: maxVal });
      }
    }
  }
}

export default Scale;
