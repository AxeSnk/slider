import createElement from "../../utility";
import EventEmitter from "../../EventEmitter";
import Tooltip from "../Tooltip/Tooltip";
import IOptions from "../../defaultOptions";

class Handle extends EventEmitter {
  private handle: HTMLElement;
  private tooltip: Tooltip;
  private parent: HTMLElement;
  private id: number;

  constructor(parent: HTMLElement, id: number) {
    super();

    this.parent = parent;
    this.init();
    this.addListener();
    this.id = id;
    this.tooltip = new Tooltip(this.handle);
  }

  init() {
    this.handle = createElement("div", { class: "slider__handle" });
    this.parent.appendChild(this.handle);
  }

  addListener() {
    this.handle.addEventListener("mousedown", this.dragHandle.bind(this));
  }

  renderTooltip(
    tooltipMask: boolean,
    val: number,
    minVal: number,
    maxVal: number,
    vertical: boolean
  ): void {
    this.tooltip.renderTooltip(tooltipMask, val, minVal, maxVal, vertical);
  }

  renderHandle(
    val: number,
    minVal: number,
    maxVal: number,
    vertical: boolean,
    sliderLength: number
  ): void {
    if (vertical) {
      this.handle.style.left = "";
      let height: number = sliderLength - this.handle.offsetHeight;
      let newLeft: number = ((val - minVal) * height) / (maxVal - minVal);

      if (newLeft < 0) {
        this.handle.style.top = 0 + "px";
      } else if (newLeft > height) {
        this.handle.style.top = height + "px";
      } else {
        this.handle.style.top = newLeft + "px";
      }
    } else {
      this.handle.style.top = "";
      let width: number = sliderLength - this.handle.offsetWidth;
      let newLeft: number = ((val - minVal) * width) / (maxVal - minVal);

      if (newLeft < 0) {
        this.handle.style.left = 0 + "px";
      } else if (newLeft > width) {
        this.handle.style.left = width + "px";
      } else {
        this.handle.style.left = newLeft + "px";
      }
    }
  }

  getPositionHandle(state: IOptions): number {
    if (state.vertical) {
      return this.handle.getBoundingClientRect().top;
    } else {
      return this.handle.getBoundingClientRect().left;
    }
  }

  getWidth(): number {
    return this.handle.offsetWidth;
  }

  getHeight(): number {
    return this.handle.offsetHeight;
  }

  getHandle(): HTMLElement {
    return this.handle;
  }

  private dragHandle(event: MouseEvent): void {
    let handle: HTMLElement = event.target as HTMLElement;
    let handleX: number = handle.offsetLeft;
    let handleY: number = handle.offsetTop;
    let mouseX: number = event.clientX;
    let mouseY: number = event.clientY;
    let id: number = this.id;


    event.preventDefault();

    let moveHandle = (moveEvent: MouseEvent): void => {
      let leftX: number = handleX + moveEvent.clientX - mouseX + handle.offsetWidth / 2;
      let leftY: number = handleY + moveEvent.clientY - mouseY + handle.offsetHeight / 2;
      this.emit(`drag_${id}`, { leftX, leftY, id });
    };

    window.addEventListener("mousemove", moveHandle);

    let handleMouseUp = (): void => {
      window.removeEventListener("mousemove", moveHandle);
      window.removeEventListener("mouseup", handleMouseUp);
    };

    window.addEventListener("mouseup", handleMouseUp);
  }
}

export default Handle;
