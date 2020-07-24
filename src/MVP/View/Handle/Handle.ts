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
    this.handle = createElement("div", { class: "slider__handle" });
    this.init();
    this.addListener();
    this.id = id;
    this.tooltip = new Tooltip(this.handle);
  }

  public renderTooltip(arg: Partial<IOptions>): void {
    this.tooltip.renderTooltip(arg);
  }

  public renderHandle(
    val: number,
    minVal: number,
    maxVal: number,
    vertical: boolean
  ): void {
    if (vertical) {
      this.handle.style.left = "";
      let height = 96;
      let newLeft = ((val - minVal) * height) / (maxVal - minVal);

      if (newLeft < 0) {
        this.handle.style.top = 0 + "%";
      } else if (newLeft > height) {
        this.handle.style.top = height + "%";
      } else {
        this.handle.style.top = newLeft + "%";
      }
    } else {
      this.handle.style.top = "";
      let width = 96;
      let newLeft = ((val - minVal) * width) / (maxVal - minVal);

      if (newLeft < 0) {
        this.handle.style.left = 0 + "%";
      } else if (newLeft > width) {
        this.handle.style.left = width + "%";
      } else {
        this.handle.style.left = newLeft + "%";
      }
    }
  }

  public getPositionHandle(state: IOptions): number {
    if (state.vertical) {
      return this.handle.getBoundingClientRect().top;
    } else {
      return this.handle.getBoundingClientRect().left;
    }
  }

  public getHandle(): HTMLElement {
    return this.handle;
  }

  private init() {
    this.parent.appendChild(this.handle);
  }

  private addListener() {
    this.handle.addEventListener("mousedown", this.dragHandle.bind(this));
    this.handle.addEventListener("touchstart", this.touchHandle.bind(this));
  }

  private dragHandle(event: MouseEvent): void {
    let handle = event.target as HTMLElement;
    let handleX =
      handle.className === "slider__handle"
        ? handle.offsetLeft
        : handle.parentElement!.offsetLeft;
    let handleY =
      handle.className === "slider__handle"
        ? handle.offsetTop
        : handle.parentElement!.offsetTop;
    let mouseX = event.clientX;
    let mouseY = event.clientY;
    let id = this.id;

    event.preventDefault();

    let moveHandle = (moveEvent: MouseEvent): void => {
      let leftX = handleX + moveEvent.clientX - mouseX + handle.offsetWidth / 2;
      let leftY =
        handleY + moveEvent.clientY - mouseY + handle.offsetHeight / 2;
      this.emit(`drag_${id}`, { leftX, leftY, id });
    };

    window.addEventListener("mousemove", moveHandle);

    let handleMouseUp = (): void => {
      window.removeEventListener("mousemove", moveHandle);
      window.removeEventListener("mouseup", handleMouseUp);
    };

    window.addEventListener("mouseup", handleMouseUp);
  }

  private touchHandle(event: TouchEvent): void {
    let handle = event.target as HTMLElement;
    let handleX =
      handle.className === "slider__handle"
        ? handle.offsetLeft
        : handle.parentElement!.offsetLeft;
    let handleY =
      handle.className === "slider__handle"
        ? handle.offsetTop
        : handle.parentElement!.offsetTop;
    let mouseX = event.touches[0].clientX;
    let mouseY = event.touches[0].clientY;
    let id = this.id;

    event.preventDefault();

    let moveHandle = (moveEvent: TouchEvent): void => {
      let leftX =
        handleX +
        moveEvent.touches[0].clientX -
        mouseX +
        handle.offsetWidth / 2;
      let leftY =
        handleY +
        moveEvent.touches[0].clientY -
        mouseY +
        handle.offsetHeight / 2;
      this.emit(`drag_${id}`, { leftX, leftY, id });
    };

    window.addEventListener("touchmove", moveHandle);

    let handleMouseUp = (): void => {
      window.removeEventListener("touchmove", moveHandle);
      window.removeEventListener("touchend", handleMouseUp);
    };

    window.addEventListener("touchend", handleMouseUp);
  }
}

export default Handle;
