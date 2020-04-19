import IOptions, { defaultOptions } from "../defaultOptions";
import EventEmitter from "../EventEmitter";

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
      ["val", "minVal", "maxVal", "valStart", "valEnd", "step"].indexOf(key) !== -1;

    this.convertOptions(isValue, options);

    let state = this.state;
    let newOptions = { ...state, ...options };
    this.state = newOptions;

    this.emit("updateState", newOptions);
  }

  setVal(left: number, sliderLength: number, id: number): void {
    let val = Math.round(Math.round((left * (this.state.maxVal - this.state.minVal)) / sliderLength) / this.state.step) * this.state.step + this.state.minVal;
    let valEnd = Math.round(Math.round((left * (this.state.maxVal - this.state.minVal)) / sliderLength) / this.state.step) * this.state.step + this.state.minVal;

    if(this.state.range) {
      if (id === 0) {
        if (this.state.minVal <= val && val < this.state.valEnd) {
          this.state.val = val;
        }
      } else {
        if (this.state.maxVal > valEnd && valEnd > this.state.val) {
          this.state.valEnd = valEnd;
        } else if (this.state.maxVal <= valEnd) {
          this.state.valEnd = this.state.maxVal
        }
      }
    } else {
      if (this.state.minVal <= val && val < this.state.maxVal) {
        this.state.val = val;
      } else if (val >= this.state.maxVal) {
        this.state.val = this.state.maxVal
      }
    }
  }

  convertOptions(isValue: Function, obj: Object): void {
    for (let key in obj) {
      if (isValue(key)) {
        obj[key] = Number(obj[key]);
      } else {
        obj[key] = Boolean(obj[key]);
      }
    }
  }

  getState(): IOptions {
    return this.state;
  }
}

export default Model;
