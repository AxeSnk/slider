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

  public setState(options: Partial<IOptions>) {

    let validOptions: Partial<IOptions> = this.validation(options);

    const isValue = (key: string) =>
      ["val", "minVal", "maxVal", "valEnd", "step"].indexOf(key) !== -1;

    for (let key in validOptions) {
      if (isValue(key)) {
        validOptions[key] = Number(validOptions[key]);
      } else {
        validOptions[key] = Boolean(validOptions[key]);
      }
    }

    const newOptions = { ...this.state, ...validOptions };
    this.state = newOptions;

    this.emit("updateState", newOptions);
  }

  public setVal(left: number, sliderLength: number, id: number): void {
    const { val, valEnd, maxVal, minVal, step, range } = this.state;
    let newVal =
      Math.round(Math.round((left * (maxVal - minVal)) / sliderLength) / step) * step +
      minVal;
    let newValEnd =
      Math.round(Math.round((left * (maxVal - minVal)) / sliderLength) / step) * step +
      minVal;

    const isFirstHandle = id === 0;
    const isLimitValRange = minVal <= newVal && newVal < valEnd;
    const isLimitValEnd = maxVal > newValEnd && newValEnd > val;
    const isExceededValEnd = maxVal <= newValEnd;
    const isLimitVal = minVal <= newVal && newVal < maxVal;
    const iExceededVal = newVal >= maxVal;

    if (range) {
      if (isFirstHandle) {
        if (isLimitValRange) {
          this.state.val = newVal;
        }
      } else {
        if (isLimitValEnd) {
          this.state.valEnd = newValEnd;
        } else if (isExceededValEnd) {
          this.state.valEnd = maxVal;
        }
      }
    } else {
      if (isLimitVal) {
        this.state.val = newVal;
        this.state.valEnd = maxVal
      } else if (iExceededVal) {
        this.state.val = maxVal;
      }
    }
  }

  public findNearHandle(
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

  public getState(): IOptions {
    return this.state;
  }

  private validation(options: Partial<IOptions>): Partial<IOptions> {
    let { val, valEnd, minVal, maxVal, step, range, tooltip, vertical, scale } = options;

    const isNotValidRangeVal =
      val >= this.state.valEnd ||
      val < this.state.minVal ||
      val > this.state.maxVal ||
      val == undefined;
    const isNotValidRangeValEnd = valEnd > this.state.maxVal || valEnd == undefined;
    const isNotValidRangeMaxVal = maxVal < this.state.valEnd || maxVal == undefined;
    const isNotValidVal =
      val < this.state.minVal || val > this.state.maxVal || val == undefined;
    const isNotValidMaxVal = maxVal < this.state.val || maxVal == undefined;
    const isNotValidMinVal = minVal > this.state.val || minVal == undefined;
    const isNotValidStep = step < 1 || step > this.state.maxVal || step == undefined;
    const isNotValidRange = range == undefined;
    const isNotValidTooltip = tooltip == undefined;
    const isNotValidVertical = vertical == undefined;
    const isNotValidScale = scale == undefined;

    if (range) {
        if (isNotValidRangeVal) {
        val = this.state.val;
      }

      if (isNotValidRangeValEnd) {
        valEnd = this.state.valEnd;
      }

      if (isNotValidRangeMaxVal) {
        maxVal = this.state.maxVal;
      }

      if (this.state.val == this.state.valEnd) {
        val = minVal
      }

    } else {
      if (isNotValidVal) {
        val = this.state.val;
      }

      if (isNotValidMaxVal) {
        maxVal = this.state.maxVal;
      }
    }

    if (isNotValidMinVal) {
      minVal = this.state.minVal;
    }

    if (isNotValidStep) {
      step = this.state.step;
    }

    if (isNotValidRange) {
      range = this.state.range;
    }

    if (isNotValidTooltip) {
      tooltip = this.state.tooltip;
    }

    if (isNotValidVertical) {
      vertical = this.state.vertical;
    }

    if (isNotValidScale) {
      scale = this.state.scale;
    }

    const validOptions: Partial<IOptions> = {
      val,
      valEnd,
      minVal,
      maxVal,
      step,
      range,
      tooltip,
      vertical,
      scale,
    };

    return validOptions;
  }
}

export default Model;
