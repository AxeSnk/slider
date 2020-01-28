import createElement from "../../utility";
import EventEmitter from "../../eventEmitter";

export default class Fill extends EventEmitter {
  private fill: HTMLElement;
  private parent: HTMLElement;

  constructor(parent: HTMLElement) {
    super();

    this.parent = parent;

    this.fill = createElement("div", { class: "slider__fill" });
    this.parent.appendChild(this.fill);
  }

  public renderFill(width: number): void {
    this.fill.style.width = width + "px";
  }

  public renderRangeFill(
    posHandle_0: number,
    posHandle_1: number,
    left: number,
    width: number,
    sliderWidth: number
  ): void {
    if (posHandle_0 > posHandle_1) {
      false
    } else {
      this.fill.style.width = width + "px";
      this.fill.style.left = left + "px";
    }
  }

  public makeVertical(left: number, height: number): void {
    this.fill.classList.add("fill--vertical");
    this.fill.style.height = height + "px";
    this.fill.style.top = left + "px";
  }

  public getFill(): HTMLElement {
    return this.fill;
  }
}
