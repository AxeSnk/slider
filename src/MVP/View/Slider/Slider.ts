import createElement from "../../utility";
import EventEmitter from "../../EventEmitter";
import IOptions from "../../defaultOptions";

class Slider extends EventEmitter {
  private slider: HTMLElement;
  private parent: HTMLElement;

  constructor(parent: HTMLElement) {
    super();

    this.parent = parent;
    this.slider = createElement("div", { class: "slider" });
    this.init();
    this.addListener();
  }

  public render(state: IOptions): void {
    state.vertical
      ? this.slider.classList.add("slider--vertical")
      : this.slider.classList.remove("slider--vertical");
  }

  public getPosition(state: IOptions): number {
    return state.vertical
      ? this.slider.getBoundingClientRect().top
      : this.slider.getBoundingClientRect().left;
  }

  public getLength(state: IOptions): number {
    return state.vertical ? this.slider.offsetHeight : this.slider.offsetWidth;
  }

  public getElement(): HTMLElement {
    return this.slider;
  }

  private init(): void {
    this.parent.appendChild(this.slider);
  }

  private addListener(): void {
    this.slider.addEventListener("click", this.clickSlider.bind(this));
  }

  private clickSlider(event: MouseEvent): void {
    let slider = event.currentTarget as HTMLElement;
    let sliderX = slider.getBoundingClientRect().left;
    let sliderY = slider.getBoundingClientRect().top;
    let mouseX = event.clientX;
    let mouseY = event.clientY;

    let leftX = mouseX - sliderX;
    let leftY = mouseY - sliderY;

    this.emit("clickSlider", { leftX, leftY });
  }
}

export default Slider;
