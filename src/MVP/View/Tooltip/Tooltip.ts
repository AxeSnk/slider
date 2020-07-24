import createElement from "../../utility";
import EventEmitter from "../../EventEmitter";
import IOptions from "../../defaultOptions";

class Tooltip extends EventEmitter {
  private tooltip: HTMLElement;
  private parent: HTMLElement;

  constructor(parent: HTMLElement) {
    super();

    this.parent = parent;
    this.tooltip = createElement("div", { class: "slider__tooltip" });
    this.init();
  }

  public renderTooltip(arg: Partial<IOptions>): void {
    const { tooltip, val, minVal, maxVal, vertical } = arg;
    if (tooltip) {
      this.tooltip.setAttribute("style", "display: block");
    } else {
      this.tooltip.setAttribute("style", "display: none");
    }

    if (val! < minVal!) {
      this.tooltip.innerHTML = `${minVal}`;
    } else if (val! > maxVal!) {
      this.tooltip.innerHTML = `${maxVal}`;
    } else {
      this.tooltip.innerHTML = `${val}`;
    }

    if (vertical) {
      this.tooltip.classList.add("tooltip--vertical");
      this.tooltip.style.top = "";
      this.tooltip.style.left = -1.6 + "rem";
    } else {
      this.tooltip.classList.remove("tooltip--vertical");
      this.tooltip.style.left = "";
      this.tooltip.style.top = -1.6 + "rem";
    }
  }

  private init() {
    this.parent.appendChild(this.tooltip);
  }

  public getTooltip(): HTMLElement {
    return this.tooltip;
  }
}

export default Tooltip;
