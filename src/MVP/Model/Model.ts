import IOptions, { defaultOptions } from "../defaultOptions";
import EventEmitter from "../EventEmitter";

class Model extends EventEmitter {
  private state: IOptions;

  constructor(options: IOptions) {
    super();

    this.state = options ? { ...defaultOptions, ...options } : defaultOptions;

    this.emit("initState", this.state);

    this.setState = this.setState.bind(this);
  }

  setState(options: Partial<IOptions>) {
    let validOptions: Partial<IOptions> = this.validation(options);

    let isValue = (key: string) =>
      ["val", "minVal", "maxVal", "valEnd", "step"].indexOf(key) !== -1;

    this.convertOptions(isValue, validOptions);

    let state = this.state;
    let newOptions = { ...state, ...validOptions };
    this.state = newOptions;

    this.emit("updateState", newOptions);
  }

  setVal(left: number, sliderLength: number, id: number): void {
    let val =
      Math.round(
        Math.round(
          (left * (this.state.maxVal - this.state.minVal)) / sliderLength
        ) / this.state.step
      ) *
        this.state.step +
      this.state.minVal;
    let valEnd =
      Math.round(
        Math.round(
          (left * (this.state.maxVal - this.state.minVal)) / sliderLength
        ) / this.state.step
      ) *
        this.state.step +
      this.state.minVal;

    if (this.state.range) {
      if (id === 0) {
        if (this.state.minVal <= val && val < this.state.valEnd) {
          this.state.val = val;
        }
      } else {
        if (this.state.maxVal > valEnd && valEnd > this.state.val) {
          this.state.valEnd = valEnd;
        } else if (this.state.maxVal <= valEnd) {
          this.state.valEnd = this.state.maxVal;
        }
      }
    } else {
      if (this.state.minVal <= val && val < this.state.maxVal) {
        this.state.val = val;
      } else if (val >= this.state.maxVal) {
        this.state.val = this.state.maxVal;
      }
    }
  }

  findNearHandle(
    leftX: number,
    leftY: number,
    sliderPos: number,
    handleFirstPos: number,
    handleSecondPos: number
  ): number {
    let id: number;
    let handleFirstLeft: number = handleFirstPos - sliderPos;
    let handleSecondLeft: number = handleSecondPos - sliderPos;

    let currentFirstDelta: number = this.state.vertical
      ? Math.abs(handleFirstLeft - leftY)
      : Math.abs(handleFirstLeft - leftX);

    let currentSecondDelta: number = this.state.vertical
      ? Math.abs(handleSecondLeft - leftY)
      : Math.abs(handleSecondLeft - leftX);

    return currentFirstDelta < currentSecondDelta ? (id = 0) : (id = 1);
  }

  getState(): IOptions {
    return this.state;
  }

  private convertOptions(isValue: Function, obj: Object): void {
    for (let key in obj) {
      if (isValue(key)) {
        obj[key] = Number(obj[key]);
      } else {
        obj[key] = Boolean(obj[key]);
      }
    }
  }

  private validation(options: Partial<IOptions>): Partial<IOptions> {
    let { val, valEnd, minVal, maxVal, step, range, tooltip, vertical, scale } = options;

    if (this.state.range) {
      if (
        val >= this.state.valEnd ||
        val < this.state.minVal ||
        val > this.state.maxVal
      ) {
        val = this.state.val;
      }  

      if (valEnd > this.state.maxVal) {
        valEnd = this.state.valEnd;
      }
  
      if (maxVal < this.state.valEnd) {
        maxVal = this.state.maxVal
      }  
    } else {
      if (
        val < this.state.minVal ||
        val > this.state.maxVal
      ) {
        val = this.state.val;
      }  

      if (maxVal < this.state.val) {
        maxVal = this.state.maxVal
      }
    }

    if (minVal > this.state.val) {
      minVal = this.state.minVal;
    }

    if (
      step < 1 ||
      step > this.state.maxVal
      ) {
      step = this.state.step
    }

    let validOptions: Partial<IOptions> = { val, valEnd, minVal, maxVal, step, range, tooltip, vertical, scale };
    return validOptions;
  }
}

export default Model;
