import IOptions, { defaultOptions } from "../defaultOptions";
import EventEmitter from "../eventEmitter";

class Model extends EventEmitter {
  private state: IOptions;

  constructor(options: IOptions) {
    super();

    this.state = options ? { ...defaultOptions, ...options } : defaultOptions;

    if (this.state.range) {
      this.state.val = this.state.valStart;
    }

    this.emit("initState", this.state);

    this.setState = this.setState.bind(this);
  }

  public setState(options: Partial<IOptions>) {
    let isValue = (key: string) =>
      ["val", "minVal", "maxVal", "valStart", "valEnd", "step"].indexOf(key) !==
      -1;

    function convOptions(obj): void {
      for (let key in obj) {
        if (isValue(key)) {
          obj[key] = Number(obj[key]);
        } else {
          obj[key] = Boolean(obj[key]);
        }
      }
    }

    convOptions(options);

    let state = this.state;
    let newOptions = { ...state, ...options };
    this.state = newOptions;

    this.emit("updateState", newOptions);
  }

  public getState(): IOptions {
    return this.state;
  }

  public setVal(left: number, sliderLenght: number, id: number): void {
    if (id === 0) {
      let val =
        Math.round(
          (left * (this.state.maxVal - this.state.minVal)) / sliderLenght
        ) + this.state.minVal;
      this.state.val = val;
    } else {
      let valEnd =
        Math.round(
          (left * (this.state.maxVal - this.state.minVal)) / sliderLenght
        ) + this.state.minVal;
      this.state.valEnd = valEnd;
    }
  }

  public getDifference(): number {
    const difference = this.state.maxVal - this.state.minVal;
    return difference;
  }

  public getVal(): number {
    return this.state.val;
  }

  public getValStart(): number {
    return this.state.valStart;
  }

  public getValEnd(): number {
    return this.state.valEnd;
  }

  public getMinVal(): any {
    return this.state.minVal;
  }

  public getMaxVal(): any {
    return this.state.maxVal;
  }

  public getStep(): number {
    return this.state.step;
  }

  public getRangeMask(): boolean {
    return this.state.range;
  }

  public getTooltipMask(): boolean {
    return this.state.tooltip;
  }

  public getVerticalMask(): boolean {
    return this.state.vertical;
  }
}

export default Model;
