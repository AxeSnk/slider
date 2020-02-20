import createElement from "../../utility";
import EventEmitter from "../../eventEmitter";
import Tooltip from "./../tooltip/tooltip";
import IOptions from "../../defaultOptions";

export default class Handle extends EventEmitter {
  private handle: HTMLElement;
  private tooltip: Tooltip;
  private parent: HTMLElement;
  private position: number = 0;
  private id: number;

  constructor(parent: HTMLElement, id: number) {
    super();

    this.parent = parent;

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

    event.preventDefault(); // предотвратить запуск выделения (действие браузера)

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

  public setPosition(
    vertical: boolean,
    value: number,
    shift: number,
    sliderLenght: number,
    difference: number,
    step: number
  ): void {
    if (vertical) {
      let height: number = sliderLenght - this.handle.offsetHeight;
      let stepCount: number = difference / step;
      let stepSize: number = height / stepCount;
      let newLeft: number = ((value - shift) * height) / difference;
      let pos: number = Math.round(newLeft / stepSize) * stepSize;

      this.position = pos;
    } else {
      let width: number = sliderLenght - this.handle.offsetWidth;
      let stepCount: number = difference / step;
      let stepSize: number = width / stepCount;
      let newLeft: number = ((value - shift) * width) / difference;
      let pos: number = Math.round(newLeft / stepSize) * stepSize;

      this.position = pos;
    }
  }

  public renderTooltip(
    val: number,
    minVal: number,
    maxVal: number,
    vertical: boolean,
    handleHeight: number
  ): void {
    this.tooltip.renderTooltip(val, minVal, maxVal, vertical, handleHeight);
  }

  public updateTooltip(
    state: { minVal: number; maxVal: number; vertical: boolean },
    handleHeight: number,
    position: number,
    sliderLenght: number,
    id: number,
    posOther: number | null
  ): void {
    this.tooltip.updateTooltip(
      state,
      handleHeight,
      position,
      sliderLenght,
      id,
      posOther
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

  public updateHandle(
    vertical: boolean,
    sliderLenght: number,
    posOther: number
  ): void {
    let pos = this.position;
    let height: number = sliderLenght - this.handle.offsetHeight;
    let width: number = sliderLenght - this.handle.offsetWidth;

    if (vertical) {
      if (this.id === 0) {
        if (posOther ? pos >= posOther : false) {
          false;
        } else if (0 > pos) {
          this.handle.style.top = 0 + "px";
        } else if (pos > height) {
          this.handle.style.top = height + "px";
        } else {
          this.handle.style.top = pos + "px";
        }
      } else {
        if (pos <= posOther) {
          false;
        } else if (0 > pos) {
          this.handle.style.top = 0 + "px";
        } else if (pos > height) {
          this.handle.style.top = height + "px";
        } else {
          this.handle.style.top = pos + "px";
        }
      }
    } else {
      if (this.id === 0) {
        if (posOther ? pos >= posOther : false) {
          false;
        } else if (0 > pos) {
          this.handle.style.left = 0 + "px";
        } else if (pos > width) {
          this.handle.style.left = width + "px";
        } else {
          this.handle.style.left = pos + "px";
        }
      } else {
        if (pos <= posOther) {
          false;
        } else if (0 > pos) {
          this.handle.style.left = 0 + "px";
        } else if (pos > width) {
          this.handle.style.left = width + "px";
        } else {
          this.handle.style.left = pos + "px";
        }
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
