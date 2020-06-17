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
    vertical: boolean
  ): void {
    if (vertical) {
      this.handle.style.left = "";
      let height: number = 96;
      let newLeft: number = ((val - minVal) * height) / (maxVal - minVal);

      if (newLeft < 0) {
        this.handle.style.top = 0 + "%";
      } else if (newLeft > height) {
        this.handle.style.top = height + "%";
      } else {
        this.handle.style.top = newLeft + "%";
      }
    } else {
      this.handle.style.top = "";
      let width: number = 96;
      let newLeft: number = ((val - minVal) * width) / (maxVal - minVal);

      if (newLeft < 0) {
        this.handle.style.left = 0 + "%";
      } else if (newLeft > width) {
        this.handle.style.left = width + "%";
      } else {
        this.handle.style.left = newLeft + "%";
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
    let handleX: number = handle.className === 'slider__handle' ? handle.offsetLeft : handle.parentElement!.offsetLeft;
    let handleY: number = handle.className === 'slider__handle' ? handle.offsetTop : handle.parentElement!.offsetTop;
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
