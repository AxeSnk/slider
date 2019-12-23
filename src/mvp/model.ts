import IOptions from './defaultOptions';

export interface IModel {
  setVal(leftX, width): void;

  getVal(): number;
  getMinVal(): number;
  getMaxVal(): number;
  getStep(): number;
  getRange(): number;

  getScaleMask(): boolean;
  getRangeMask(): boolean;
  getTooltipMask(): boolean;
  getVerticalMask(): boolean;

  getArrayOfDivisions(): number[];

}

export default class Model implements IModel {
  private val: number; // первоначальное положение одиночного ползунка
  private minVal: any; // минимальное значение диапазона, при слайдере с диапазоном
  private maxVal: any; // маскимальное значение диапазона, при слайдере с диапазоном
  private step: number; // шаг ползунка
  private range: boolean; // диапазон слайдера
  private tooltip: boolean; // подсказка над ползунком
  private vertical: boolean; // вертикальный слайдер
  private scale: boolean; // шкала
  private arrrayOfDivisions: number[]; // массив делений

  constructor(options: IOptions) {
    this.val = options.val;
    this.minVal = options.minVal;
    this.maxVal = options.maxVal;  
    this.step = options.step;
    this.range = options.range;
    this.tooltip = options.tooltip;
    this.vertical = options.vertical;
    this.scale = options.scale;
    this.arrrayOfDivisions = this.createArrayOfDivisions(options);
  }

  // создать массив делений
  createArrayOfDivisions(options: IOptions): number[] {    
    let arr: number[] = [];
    let i: number;
    for(i = options.minVal; i < options.maxVal; i = i + options.step) {
      arr.push(i);
    }
    arr.push(options.maxVal);

    return arr;
  }
  getArrayOfDivisions(): number[] {

    return this.arrrayOfDivisions

  }

  setVal(leftX, width): void {
    let val = Math.round(leftX * (this.maxVal-this.minVal)/width) + this.minVal;

    this.val = val;
  }

  getRange(): number {
    let range = this.maxVal-this.minVal;
    return range;
  }

  getVal(): number {
    return this.val
  }

  getMinVal(): any {
    return this.minVal
  }

  getMaxVal(): any {
    return this.maxVal
  }

  getStep(): number {
    return this.step
  }

  getRangeMask(): boolean {
    return this.range
  }

  getTooltipMask(): boolean {
    return this.tooltip
  }

  getVerticalMask(): boolean {
    return this.vertical
  }

  getScaleMask(): boolean {
    return this.scale
  }
}