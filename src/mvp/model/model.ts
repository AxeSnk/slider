import IOptions, { defaultOptions } from "../defaultOptions";
import EventEmitter from "../eventEmitter";

export default class Model extends EventEmitter {
  private state: IOptions;
  private arrrayDivisions: number[]; // массив делений шкалы

  constructor(options: IOptions) {
    super();

    if (defaultOptions.range) {
      options ? this.setState({ ...defaultOptions, ...options }) : this.setState(defaultOptions);
      this.state.val = defaultOptions.valStart;
    } else
      options ? this.setState({ ...defaultOptions, ...options }) : this.setState(defaultOptions);

    if (this.state.range) {
      this.state.val = this.state.valStart;
    } else {
      this.state.val = this.state.val;
    }
    this.arrrayDivisions = this.createArrayDivisions();

    this.setState = this.setState.bind(this)
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
    console.log(this.events)
  }

  public getState(): {} {
    return this.state;
  }

  // создать массив делений для шкалы
  private createArrayDivisions(): number[] {
    let arr: number[] = [];
    let i: number;
    for (i = this.state.minVal; i < this.state.maxVal; i = i + 1) {
      arr.push(i);
    }
    arr.push(this.state.maxVal);

    return arr;
  }

  public getArrayDivisions(): number[] {
    return this.arrrayDivisions;
  }

  public setVal(left: number, width: number, id: number): void {
    if (id === 0) {
      let val =
        Math.round((left * (this.state.maxVal - this.state.minVal)) / width) +
        this.state.minVal;
      this.state.val = val;
    } else {
      let valEnd =
        Math.round((left * (this.state.maxVal - this.state.minVal)) / width) +
        this.state.minVal;
      this.state.valEnd = valEnd;
    }
  }

  public getDifference(): number {
    let difference = this.state.maxVal - this.state.minVal;
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

  public getScaleMask(): boolean {
    return this.state.scale;
  }
}
