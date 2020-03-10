import createElement from "../../utility";
import EventEmitter from "../../eventEmitter";

class Tooltip extends EventEmitter {
  private tooltip: HTMLElement;
  private parent: HTMLElement;

  constructor(parent: HTMLElement) {
    super();

    this.parent = parent;

    this.tooltip = createElement("div", { class: "slider__tooltip" });
    this.parent.appendChild(this.tooltip);
  }

  public renderTooltip(
    tooltipMask: boolean,
    val: number,
    minVal: number,
    maxVal: number,
    vertical: boolean,
    handleHeight: number
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
      this.tooltip.style.left = -handleHeight * 1.4 + "px";
    } else {
      this.tooltip.classList.remove("tooltip--vertical");
      this.tooltip.style.left = "";
      this.tooltip.style.top = -handleHeight * 1.4 + "px";
    }
  }

  getTooltip(): HTMLElement {
    return this.tooltip;
  }
}

export default Tooltip;
