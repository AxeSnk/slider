import createElement from "../../utility";
import IOptions from "../../defaultOptions";

export default class Scale {
  private scale: HTMLElement;
  private parent: HTMLElement;

  constructor(parent: HTMLElement) {
    this.parent = parent;
    this.scale = createElement("div", { class: "slider__scale" });
    this.parent.appendChild(this.scale);
  }
  clear(): void {
    const old = document.querySelector(".slider__scale");
    if (old) {
      while (old.firstChild) {
        old.removeChild(old.firstChild);
      }
    }
  }

  render(state: IOptions): void {
    let i: number;
    for (i = state.minVal; i <= state.maxVal; i = i + 1) {
      const division: HTMLElement = createElement("div", {
        class: "slider__scale-division"
      });
      division.id = `slider__scale-division-${i}`;
      this.scale.appendChild(division);
      const division__text: HTMLElement = createElement("div", {
        class: "division__text"
      });
      division__text.innerHTML = `${i}`;
      division.appendChild(division__text);
    }
  }

  setOrientation(
    state: IOptions,
    sliderLenght: number,
    handleWidth: number
  ): void {
    state.vertical
      ? (this.scale.classList.add("scale--vertical"),
        (this.scale.style.height = sliderLenght - handleWidth + "px"),
        (this.scale.style.left = "15px"))
      : (this.scale.classList.remove("scale--vertical"),
        (this.scale.style.width = sliderLenght - handleWidth + "px"),
        (this.scale.style.top = "15px"));
  }
}
