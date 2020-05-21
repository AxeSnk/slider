import createElement from "../../utility";
import IOptions from "../../defaultOptions";

class Fill {
  private fill: HTMLElement;
  private parent: HTMLElement;

  constructor(parent: HTMLElement) {
    this.parent = parent;
    this.init();
    this.renderFill = this.renderFill.bind(this);
  }

  init() {
    this.fill = createElement("div", { class: "slider__fill" });
    this.parent.appendChild(this.fill);
  }

  renderFill(
    state: IOptions,
    handleFirstPos: number,
    handleSecondPos: number,
    sliderPos: number
  ): void {
    const length: number = state.range ? handleSecondPos - handleFirstPos : handleFirstPos - sliderPos;
    const shift: number = handleFirstPos - sliderPos;

    if (state.vertical) {
      this.fill.classList.add("fill--vertical");
      this.fill.style.left = "";
      this.fill.style.width = "";
      this.fill.style.height = length + "px";
      this.fill.style.top = 0 + "px";
      if (state.range) {
        this.fill.style.top = shift + "px";
      }
    } else {
      this.fill.classList.remove("fill--vertical");
      this.fill.style.top = "";
      this.fill.style.height = "";
      this.fill.style.width = length + "px";
      this.fill.style.left = 0 + "px";
      if (state.range) {
        this.fill.style.left = shift + "px";
      }
    }
  }

  getFill(): HTMLElement {
    return this.fill;
  }
}

export default Fill;
