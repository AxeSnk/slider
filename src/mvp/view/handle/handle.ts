import createElement from "../../utility";
import EventEmitter from "../../eventEmitter";
import Tooltip from "../Tooltip/Tooltip";
import IOptions from "../../defaultOptions";

class Handle extends EventEmitter {
  private handle: HTMLElement;
  private tooltip: Tooltip;
  private parent: HTMLElement;
  private position: number;
  private id: number;

  constructor(parent: HTMLElement, id: number) {
    super();

    this.parent = parent;
    this.position = 0;

    this.handle = createElement("div", { class: "slider__handle" });
    this.parent.appendChild(this.handle);

    this.handle.addEventListener("mousedown", this.dragHandle.bind(this));
    this.id = id;

    this.tooltip = new Tooltip(this.handle);
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
      let leftX: number =
        handleX + moveEvent.clientX - mouseX + handle.offsetWidth / 2;
      let leftY: number =
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

  public renderTooltip(
    tooltipMask: boolean,
    val: number,
    minVal: number,
    maxVal: number,
    vertical: boolean,
    handleHeight: number
  ): void {
    this.tooltip.renderTooltip(
      tooltipMask,
      val,
      minVal,
      maxVal,
      vertical,
      handleHeight
    );
  }

  public renderHandle(
    val: number,
    minVal: number,
    maxVal: number,
    vertical: boolean,
    sliderLenght: number
  ): void {
    if (vertical) {
      this.handle.style.left = "";
      let height: number = sliderLenght - this.handle.offsetHeight;
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
      let width: number = sliderLenght - this.handle.offsetWidth;
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

  public getPosition(state: IOptions): number {
    if (state.vertical) {
      return this.handle.getBoundingClientRect().top;
    } else {
      return this.handle.getBoundingClientRect().left;
    }
  }

  public getWidth(): number {
    return this.handle.offsetWidth;
  }

  public getHeight(): number {
    return this.handle.offsetHeight;
  }

  public getHandle(): HTMLElement {
    return this.handle;
  }

  public getPositionHandle(): number {
    return this.position;
  }
}

export default Handle;
