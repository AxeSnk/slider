import createElement from "../../utility";
import EventEmitter from "../../eventEmitter";

export default class Tooltip extends EventEmitter {
  private tooltip: HTMLElement;
  private parent: HTMLElement;

  constructor(parent: HTMLElement) {
    super();

    this.parent = parent;

    this.tooltip = createElement("div", { class: "slider__tooltip" });
    this.parent.appendChild(this.tooltip);
  }

  public renderTooltip(
    val: number,
    minVal: number,
    maxVal: number,
    vertical: boolean,
    handleHeight: number
  ): void {
    if (val < minVal) {
      this.tooltip.innerHTML = `${minVal}`;
    } else if (val > maxVal) {
      this.tooltip.innerHTML = `${maxVal}`;
    } else {
      this.tooltip.innerHTML = `${val}`;
    }

    if (vertical) {
      this.tooltip.style.left = -handleHeight * 1.4 + "px";
      this.tooltip.classList.add("tooltip--vertical");
    } else {
      this.tooltip.style.top = -handleHeight * 1.4 + "px";
    }
  }

  public updateTooltip(
    state: { minVal: number; maxVal: number; vertical: boolean },
    handleHeight: number,
    position: number,
    width: number,
    id: number,
    posOther: number | null
  ): void {
    let val: number = Math.round(
      (position * (state.maxVal - state.minVal)) / (width - handleHeight) +
        state.minVal
    );
    if (id === 0) {
      if (posOther ? position >= posOther : false) {
        false;
      } else if (state.minVal > val) {
        this.tooltip.innerHTML = `${state.minVal}`;
      } else if (val > state.maxVal) {
        this.tooltip.innerHTML = `${state.maxVal}`;
      } else {
        this.tooltip.innerHTML = `${val}`;
      }
    } else {
      if (posOther ? position <= posOther : false) {
        false;
      } else if (state.minVal > val) {
        this.tooltip.innerHTML = `${state.minVal}`;
      } else if (val > state.maxVal) {
        this.tooltip.innerHTML = `${state.maxVal}`;
      } else {
        this.tooltip.innerHTML = `${val}`;
      }
    }

    if (state.vertical) {
      this.tooltip.style.left = -handleHeight * 1.4 + "px";
    } else {
      this.tooltip.style.top = -handleHeight * 1.4 + "px";
    }
  }

  public getTooltip(): HTMLElement {
    return this.tooltip;
  }
}
