import createElement from '../../utils/createElement';
import EventEmitter from '../../utils/EventEmitter';
import Tooltip from '../Tooltip/Tooltip';

import { IOptions } from '../../utils/IOptions';

class Handle extends EventEmitter {
  private handle: HTMLElement;

  private tooltip: Tooltip;

  private parent: HTMLElement;

  private id: number;

  constructor(parent: HTMLElement, id: number) {
    super();

    this.parent = parent;
    this.handle = createElement('div', { class: 'slider__handle' });
    this.init();
    this.addListener();
    this.id = id;
    this.tooltip = new Tooltip(this.handle);
  }

  public renderTooltip(
    arg: { tooltip: boolean, val: number, minVal: number, maxVal: number },
  ): void {
    this.tooltip.renderTooltip(arg);
  }

  public renderHandle(
    val: number,
    minVal: number,
    maxVal: number,
    vertical: boolean,
  ): void {
    if (vertical) {
      this.handle.style.left = '';
      const height = 100;
      const newLeft = ((val - minVal) * height) / (maxVal - minVal);

      if (newLeft <= 0) {
        this.handle.style.top = `calc(${0}% - 10px)`;
      } else if (newLeft >= height) {
        this.handle.style.top = `calc(${height}% - 10px)`;
      } else {
        this.handle.style.top = `calc(${newLeft}% - 10px)`;
      }
    } else {
      this.handle.style.top = '';
      const width = 100;
      const newLeft = ((val - minVal) * width) / (maxVal - minVal);

      if (newLeft <= 0) {
        this.handle.style.left = `calc(${0}% - 10px)`;
      } else if (newLeft >= width) {
        this.handle.style.left = `calc(${width}% - 10px)`;
      } else {
        this.handle.style.left = `calc(${newLeft}% - 10px)`;
      }
    }
  }

  public getPositionHandle(state: IOptions): number {
    if (state.vertical) {
      return this.handle.getBoundingClientRect().top;
    }
    return this.handle.getBoundingClientRect().left;
  }

  public getHandle(): HTMLElement {
    return this.handle;
  }

  private init():void {
    this.parent.appendChild(this.handle);
  }

  private addListener(): void {
    this.handle.addEventListener('mousedown', this.dragHandle.bind(this));
    this.handle.addEventListener('touchstart', this.touchHandle.bind(this));
  }

  private dragHandle(event: MouseEvent): void {
    const handle = event.target as HTMLElement;
    const handleX = handle.className === 'slider__handle'
      ? handle.offsetLeft
      : handle.parentElement!.offsetLeft;
    const handleY = handle.className === 'slider__handle'
      ? handle.offsetTop
      : handle.parentElement!.offsetTop;
    const mouseX = event.clientX;
    const mouseY = event.clientY;
    const { id } = this;

    event.preventDefault();

    const moveHandle = (moveEvent: MouseEvent): void => {
      const leftX = handleX + moveEvent.clientX - mouseX + handle.offsetWidth / 2;
      const leftY = handleY + moveEvent.clientY - mouseY + handle.offsetHeight / 2;
      this.emit(`drag_${id}`, { leftX, leftY, id });
    };

    window.addEventListener('mousemove', moveHandle);

    const handleMouseUp = (): void => {
      window.removeEventListener('mousemove', moveHandle);
      window.removeEventListener('mouseup', handleMouseUp);
    };

    window.addEventListener('mouseup', handleMouseUp);
  }

  private touchHandle(event: TouchEvent): void {
    const handle = event.target as HTMLElement;
    const handleX = handle.className === 'slider__handle'
      ? handle.offsetLeft
      : handle.parentElement!.offsetLeft;
    const handleY = handle.className === 'slider__handle'
      ? handle.offsetTop
      : handle.parentElement!.offsetTop;
    const mouseX = event.touches[0].clientX;
    const mouseY = event.touches[0].clientY;
    const { id } = this;

    event.preventDefault();

    const moveHandle = (moveEvent: TouchEvent): void => {
      const leftX = handleX
        + moveEvent.touches[0].clientX
        - mouseX
        + handle.offsetWidth / 2;
      const leftY = handleY
        + moveEvent.touches[0].clientY
        - mouseY
        + handle.offsetHeight / 2;
      this.emit(`drag_${id}`, { leftX, leftY, id });
    };

    window.addEventListener('touchmove', moveHandle);

    const handleMouseUp = (): void => {
      window.removeEventListener('touchmove', moveHandle);
      window.removeEventListener('touchend', handleMouseUp);
    };

    window.addEventListener('touchend', handleMouseUp);
  }
}

export default Handle;
