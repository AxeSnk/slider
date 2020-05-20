import createElement from "../../utility";
import EventEmitter from "../../EventEmitter";
import IOptions from "../../defaultOptions";

class Slider extends EventEmitter {
  private slider: HTMLElement;
  private parent: HTMLElement;

  constructor(parent: HTMLElement) {
    super();

    this.parent = parent;
    this.init();
    this.addListener();
  }

  init() {
    this.slider = createElement("div", { class: "slider" });
    this.parent.appendChild(this.slider);
  }

  render(state: IOptions): void {
    state.vertical
      ? this.slider.classList.add("slider--vertical")
      : this.slider.classList.remove("slider--vertical");
  }

  addListener(): void {
    this.slider.addEventListener("mousedown", this.clickSlider.bind(this));
  }

  clickSlider(event: MouseEvent): void {
    let slider: HTMLElement = event.currentTarget as HTMLElement;
    let sliderX: number = slider.offsetLeft;
    let sliderY: number = slider.offsetTop;
    let mouseX: number = event.clientX;
    let mouseY: number = event.clientY;

    let leftX: number = mouseX - sliderX;
    let leftY: number = mouseY - sliderY;

    this.emit("clickSlider", { leftX, leftY });
  }

  getPosition(state: IOptions): number {
    return state.vertical
      ? this.slider.getBoundingClientRect().top
      : this.slider.getBoundingClientRect().left;
  }

  getLength(state: IOptions): number {
    return state.vertical ? this.slider.offsetHeight : this.slider.offsetWidth;
  }

  getElement(): HTMLElement {
    return this.slider;
  }
}

export default Slider;
