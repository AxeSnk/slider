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
    const { minVal, maxVal, vertical, step } = state;
    const elems: NodeListOf<ChildNode> = this.values.childNodes;

    this.clear(elems);

    let left = vertical ? 0 : 2;

    const valStart: HTMLElement = createElement("div", {
      class: "value__item-start value__item",
    });

    vertical
      ? valStart.setAttribute("style", `top: ${left}%`)
      : valStart.setAttribute("style", `left: ${left}%`);      
      valStart.innerHTML = `${minVal}`;
    this.values.appendChild(valStart);

    let i: number;
    let width = vertical ? 98 : 100
    let value: number;
    value = Math.round((Math.round((maxVal - minVal) / step) * step /3) / step ) * step;

    for(i = 0; i < 2; i++) {
      let newLeft = value/(maxVal - minVal) * width;
      left = newLeft;
      const valItem = createElement("div", {
        class: "value__item",
      });
  
      state.vertical
        ? valItem.setAttribute("style", `top: ${left}%`)
        : valItem.setAttribute("style", `left: ${left}%`);
        valItem.innerHTML = `${value}`;
      this.values.appendChild(valItem);

      value += value;
    }

    left = vertical ? 96 : 98;

    const valEnd = createElement("div", {
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
    const isValStart = target.className.indexOf("value__item-start") === 0;
    const isValEnd = target.className.indexOf("value__item-end") === 0;

    let scaleX = this.scale.getBoundingClientRect().left;
    let scaleY =this.scale.getBoundingClientRect().top;
    let mouseX = event.clientX;
    let mouseY = event.clientY;
    let leftX = mouseX - scaleX;
    let leftY = mouseY - scaleY;

    if(range) {

      if(isValStart) {
        this.emit("clickScaleVal", { val: target.innerHTML });
      } else if(isValEnd) {
        this.emit("clickScaleValEnd", { valEnd: target.innerHTML })
      } else {
        this.emit("clickScaleValItem", { leftX, leftY });
      }

    }
    
    if(!range) {

      if(isValStart) {
        this.emit("clickScaleVal", { val: target.innerHTML });
        this.emit("clickScaleValEnd", { valEnd: maxVal })
      } else if(isValEnd) {
        this.emit("clickScaleVal", { val: target.innerHTML });
        this.emit("clickScaleValEnd", { valEnd: maxVal })
      } else {
        this.emit("clickScaleVal", { val: target.innerHTML });
        this.emit("clickScaleValEnd", { valEnd: maxVal })
      }

    }

  }
}

export default Scale;
