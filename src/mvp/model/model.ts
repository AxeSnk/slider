import IOptions from "../defaultOptions";

export default class Model {
  private state: IOptions;
  private val: number; // значение ползунка
  private valStart: number; // положение начального ползунка (range = true)
  private valEnd: number; // положение конечного ползунка (range = true)
  private minVal: number; // минимальное значение
  private maxVal: number; // маскимальное значение
  private step: number; // шаг ползунка
  private range: boolean; // вкл/выкл диапазон слайдера
  private tooltip: boolean; // вкл/выкл подсказку над ползунком
  private vertical: boolean; // вкл/выкл слайдер вертикально
  private scale: boolean; // вкл/выкл шкалу значений
  private arrrayDivisions: number[]; // массив делений шкалы

  constructor(options: IOptions) {
    if (options.range) {
      this.state = options;
      this.state.val = options.valStart
    } else this.state = options;


    this.valStart = options.valStart;
    this.valEnd = options.valEnd;
    this.minVal = options.minVal;
    this.maxVal = options.maxVal;
    this.step = options.step;
    this.range = options.range;
    this.tooltip = options.tooltip;
    this.vertical = options.vertical;
    this.scale = options.scale;

    if (this.range) {
      this.val = this.valStart;
    } else {
      this.val = options.val;
    }

    this.arrrayDivisions = this.createArrayDivisions();
  }

  public getState(): {} {
    return this.state;
  }

  // создать массив делений для шкалы
  private createArrayDivisions(): number[] {
    let arr: number[] = [];
    let i: number;
    for (i = this.minVal; i < this.maxVal; i = i + 1) {
      arr.push(i);
    }
    arr.push(this.maxVal);

    return arr;
  }

  public getArrayDivisions(): number[] {
    return this.arrrayDivisions;
  }

  public setVal(left: number, width: number, id: number): void {
    if (id === 0) {
      let val =
        Math.round((left * (this.maxVal - this.minVal)) / width) + this.minVal;
      this.val = val;
    } else {
      let valEnd =
        Math.round((left * (this.maxVal - this.minVal)) / width) + this.minVal;
      this.valEnd = valEnd;
    }
  }

  public setValue(value: number): void {
    this.val = value;
  }

  public getDifference(): number {
    let difference = this.maxVal - this.minVal;
    return difference;
  }

  public getVal(): number {
    return this.val;
  }

  public getValStart(): number {
    return this.valStart;
  }

  public getValEnd(): number {
    return this.valEnd;
  }

  public getMinVal(): any {
    return this.minVal;
  }

  public getMaxVal(): any {
    return this.maxVal;
  }

  public getStep(): number {
    return this.step;
  }

  public getRangeMask(): boolean {
    return this.range;
  }

  public getTooltipMask(): boolean {
    return this.tooltip;
  }

  public getVerticalMask(): boolean {
    return this.vertical;
  }

  public getScaleMask(): boolean {
    return this.scale;
  }
}
