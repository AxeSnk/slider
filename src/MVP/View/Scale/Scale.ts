import createElement from "../../utility";
import EventEmitter from "../../EventEmitter";
import IOptions from "../../defaultOptions";

class Scale extends EventEmitter {
  private scale: HTMLElement;
  private parent: HTMLElement;
  private values: HTMLElement;
  private state: IOptions;

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

    this.clear(elems);

    let left: number = vertical ? 0 : 2;

    const val: HTMLElement = createElement("div", {
      class: "value__item-start value__item",
    });

    state.vertical
      ? val.setAttribute("style", `top: ${left}%`)
      : val.setAttribute("style", `left: ${left}%`);
    val.innerHTML = `${minVal}`;
    this.values.appendChild(val);

    left += 96;

    const valEnd: HTMLElement = createElement("div", {
      class: "value__item-end value__item",
    });

    state.vertical
      ? valEnd.setAttribute("style", `top: ${left}%`)
      : valEnd.setAttribute("style", `left: ${left}%`);

    valEnd.innerHTML = `${maxVal}`;
    this.values.appendChild(valEnd);
  }

  private clear(elems: NodeListOf<ChildNode>): void {
    while (elems.length) {
      elems.forEach((item) => {
        item.remove();
      });
    }
  }

  private addListener() {
    this.scale.addEventListener("mousedown", this.clickScale.bind(this));
  }

  private clickScale(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    const { range, maxVal } = this.state;
    const isValEnd = target.className.indexOf("value__item-end") === 0;

    if (isValEnd) {
      if(range) {
        this.emit("clickScaleValEnd", { valEnd: target.innerHTML })
      } else {
        this.emit("clickScaleVal", { val: target.innerHTML });
        this.emit("clickScaleValEnd", { valEnd: target.innerHTML })
      }
    }

    if (!isValEnd) {
      if (range) {
        this.emit("clickScaleVal", { val: target.innerHTML });
      } else {
        this.emit("clickScaleVal", { val: target.innerHTML });
        this.emit("clickScaleValEnd", { valEnd: maxVal })
      }
    }
  }
}

export default Scale;
