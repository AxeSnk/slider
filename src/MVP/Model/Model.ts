import EventEmitter from '../utils/EventEmitter';
import defaultOptions from '../utils/defaultOptions';

import { IOptions } from '../utils/IOptions';
import { IData } from '../utils/IData';

class Model extends EventEmitter {
  private state: IOptions;

  constructor(options: IOptions) {
    super();

    this.state = options ? { ...defaultOptions, ...options } : defaultOptions;

    this.emit('initState', this.state);

    this.setState = this.setState.bind(this);
  }

  public setState(options: Partial<IOptions>): void {
    const validOptions: Partial<IOptions> = this.validation(options);

    const isValue = (key: string): boolean => ['val', 'minVal', 'maxVal', 'valEnd', 'step'].indexOf(key) !== -1;

    Object.keys(validOptions).forEach((key) => {
      if (isValue(key)) {
        // @ts-ignore
        validOptions[key] = Number(validOptions[key]);
      } else {
        // @ts-ignore
        validOptions[key] = Boolean(validOptions[key]);
      }
    });

    const newOptions = { ...this.state, ...validOptions };
    this.state = newOptions;

    this.emit('updateState', newOptions);
  }

  public setVal(arg: Partial<IData>): void {
    const { left, sliderLength, idHandle } = arg;
    const {
      val, valEnd, maxVal, minVal, step, range,
    } = this.state;
    const newVal = Math.round(Math.round((left! * (maxVal - minVal)) / sliderLength!) / step)
        * step + minVal;
    const newValEnd = Math.round(Math.round((left! * (maxVal - minVal)) / sliderLength!) / step)
        * step + minVal;

    const isFirstHandle = idHandle === 0;
    const isLimitValRange = minVal <= newVal && newVal < valEnd;
    const isLimitValEnd = maxVal > newValEnd && newValEnd > val;
    const isExceededValEnd = maxVal <= newValEnd;
    const isLimitVal = minVal <= newVal && newVal < maxVal;
    const iExceededVal = newVal >= maxVal;

    if (range) {
      if (isFirstHandle) {
        if (isLimitValRange) {
          this.state.val = Number(newVal.toFixed(2));
        }
      } else if (isLimitValEnd) {
        this.state.valEnd = Number(newValEnd.toFixed(2));
      } else if (isExceededValEnd) {
        this.state.valEnd = maxVal;
      }
    } else if (isLimitVal) {
      this.state.val = Number(newVal.toFixed(2));
      this.state.valEnd = maxVal;
    } else if (iExceededVal) {
      this.state.val = maxVal;
    }
  }

  public findNearHandle = (arg: Partial<IData>): number => {
    const {
      left, sliderPos, handleFirstPos, handleSecondPos,
    } = arg;
    const handleFirstLeft = handleFirstPos! - sliderPos!;
    const handleSecondLeft = handleSecondPos! - sliderPos!;

    const currentFirstDelta = Math.abs(handleFirstLeft - left!);
    const currentSecondDelta = Math.abs(handleSecondLeft - left!);

    if (currentFirstDelta < currentSecondDelta) return 0;
    return 1;
  };

  public getState(): IOptions {
    return this.state;
  }

  private validation(options: Partial<IOptions>): Partial<IOptions> {
    let {
      val,
      valEnd,
      minVal,
      maxVal,
      step,
      range,
      tooltip,
      vertical,
      scale,
    } = options;

    const isMultipleStartStep = (val! - minVal!) % step! === 0;
    const isMultipleEndStep = (valEnd! - minVal!) % step! === 0;
    const isEqualMaxVal = Number(valEnd) === this.state.maxVal;
    const isNotValidRangeVal = val! >= this.state.valEnd
      || val! < this.state.minVal
      || val! > this.state.maxVal
      || (!isMultipleStartStep)
      || val === undefined;
    const isNotValidRangeValEnd = valEnd! < this.state.val!
      || valEnd! > this.state.maxVal
      || (!isMultipleEndStep)
      || valEnd === undefined;
    const isNotValidRangeMaxVal = maxVal! < this.state.valEnd || maxVal === undefined;
    const isNotValidVal = val! < this.state.minVal || val! > this.state.maxVal || val === undefined;
    const isNotValidMaxVal = maxVal! < this.state.val || maxVal === undefined;
    const isNotValidMinVal = minVal! > this.state.val || minVal === undefined;
    const isNotValidStep = step! < 1 || step! > this.state.maxVal || step === undefined;
    const isNotValidRange = range === undefined;
    const isNotValidTooltip = tooltip === undefined;
    const isNotValidVertical = vertical === undefined;
    const isNotValidScale = scale === undefined;

    if (range) {
      if (val === valEnd) {
        val = this.state.minVal;
      }
    }

    if (this.state.range) {
      if (isNotValidRangeVal) {
        val = this.state.val;
      }

      if (isNotValidRangeValEnd) {
        valEnd = this.state.valEnd;
      }

      if (isEqualMaxVal) {
        valEnd = this.state.maxVal;
      }

      if (isNotValidRangeMaxVal) {
        maxVal = this.state.maxVal;
      }
    } else {
      if (isNotValidVal) {
        val = this.state.val;
      }

      if (isNotValidRangeValEnd) {
        valEnd = this.state.valEnd;
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
