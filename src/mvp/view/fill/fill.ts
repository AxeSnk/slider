import createElement from "../../utility";
import EventEmitter from "../../eventEmitter";
import IOptions from "../../defaultOptions";

class Fill extends EventEmitter {
  private fill: HTMLElement;
  private parent: HTMLElement;

  constructor(parent: HTMLElement) {
    super();

    this.parent = parent;

    this.fill = createElement("div", { class: "slider__fill" });
    this.parent.appendChild(this.fill);
  }

  public renderFill(state: IOptions, shift: number, lenght: number): void {
    if (state.vertical) {
      this.fill.classList.add("fill--vertical");
      this.fill.style.left = "";
      this.fill.style.width = "";
      this.fill.style.height = lenght + "px";
      this.fill.style.top = 0 + "px";
    } else {
      this.fill.classList.remove(".fill--vertical");
      this.fill.style.top = "";
      this.fill.style.height = "";
      this.fill.style.width = lenght + "px";
      this.fill.style.left = 0 + "px";
    }
  }

  public renderRangeFill(
    state: IOptions,
    posHandle_0: number,
    posHandle_1: number,
    shift: number,
    lenght: number
  ): void {
    if (state.vertical) {
      if (posHandle_0 > posHandle_1) {
        false;
      } else {
        this.fill.classList.add("fill--vertical");
        this.fill.style.left = "";
        this.fill.style.width = "";
        this.fill.style.height = lenght + "px";
        this.fill.style.top = shift + "px";
      }
    } else {
      if (posHandle_0 > posHandle_1) {
        false;
      } else {
        this.fill.classList.remove(".fill--vertical");
        this.fill.style.top = "";
        this.fill.style.height = "";
        this.fill.style.width = lenght + "px";
        this.fill.style.left = shift + "px";
      }
    }
  }

  public getFill(): HTMLElement {
    return this.fill;
  }
}

export default Fill;
