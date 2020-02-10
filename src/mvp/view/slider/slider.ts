import createElement from "../../utility";

export default class Slider {
  private slider: HTMLElement;
  private parent: HTMLElement;

  constructor(parent: HTMLElement) {
    this.parent = parent;

    this.slider = createElement("div", { class: "slider" });
    this.parent.appendChild(this.slider);
  }

  public makeVertical(): void {
    this.slider.classList.add("slider--vertical");
  }

  public getElement(): HTMLElement {
    return this.slider;
  }

  public getPositionX(): number {
    return this.slider.getBoundingClientRect().left;
  }

  public getPositionY(): number {
    return this.slider.getBoundingClientRect().top;
  }

  public getWidth(): number {
    return this.slider.offsetWidth;
  }

  public getHeight(): number {
    return this.slider.offsetHeight;
  }
}
