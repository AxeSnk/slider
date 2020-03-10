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

  setState(options: Partial<IOptions>) {
    let isValue = (key: string) =>
      ["val", "minVal", "maxVal", "valStart", "valEnd", "step"].indexOf(key) !==
      -1;

    function convOptions(obj: Object): void {
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

  setVal(left: number, sliderLenght: number, id: number): void {
    if (id === 0) {
      let val =
      Math.round(Math.round((left * (this.state.maxVal - this.state.minVal)) / sliderLenght)/this.state.step) * this.state.step + this.state.minVal;
      this.state.val = val;
    } else {
      let valEnd =
        Math.round(Math.round((left * (this.state.maxVal - this.state.minVal)) / sliderLenght)/this.state.step) * this.state.step + this.state.minVal;
      this.state.valEnd = valEnd;
    }
  }

  getState(): IOptions {
    return this.state;
  }

  getDifference(): number {
    const difference = this.state.maxVal - this.state.minVal;
    return difference;
  }

  getVal(): number {
    return this.state.val;
  }

  getValStart(): number {
    return this.state.valStart;
  }

  getValEnd(): number {
    return this.state.valEnd;
  }

  getMinVal(): any {
    return this.state.minVal;
  }

  getMaxVal(): any {
    return this.state.maxVal;
  }

  getStep(): number {
    return this.state.step;
  }

  getRangeMask(): boolean {
    return this.state.range;
  }

  getTooltipMask(): boolean {
    return this.state.tooltip;
  }

  getVerticalMask(): boolean {
    return this.state.vertical;
  }
}

export default Model;
