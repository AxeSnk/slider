import createElement from "../../utility";
import EventEmitter from "../../EventEmitter";

class Tooltip extends EventEmitter {
  private tooltip: HTMLElement;
  private parent: HTMLElement;

  constructor(parent: HTMLElement) {
    super();

    this.parent = parent;
    this.init();
  }

  init() {
    this.tooltip = createElement("div", { class: "slider__tooltip" });
    this.parent.appendChild(this.tooltip);
  }

  renderTooltip(
    tooltipMask: boolean,
    val: number,
    minVal: number,
    maxVal: number,
    vertical: boolean
  ): void {
    if (tooltipMask) {
      this.tooltip.setAttribute("style", "display: block");
    } else {
      this.tooltip.setAttribute("style", "display: none");
    }

    if (val < minVal) {
      this.tooltip.innerHTML = `${minVal}`;
    } else if (val > maxVal) {
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

  getTooltip(): HTMLElement {
    return this.tooltip;
  }
}

export default Tooltip;
