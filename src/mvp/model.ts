import IOptions from './defaultOptions';

export interface IModel {
  setVal(newVal: number): void;

  getVal(): any;
  getMinVal(): any;
  getMaxVal(): any;
  getStep(): number;
  getRange(): number;

  getRangeMask(): boolean;
  getTooltipMask(): boolean;
  getVerticalMask(): boolean;
}

export default class Model implements IModel {
  private val: any; // первоначальное положение одиночного ползунка
  private minVal: any; // минимальное значение диапазона, при слайдере с диапазоном
  private maxVal: any; // маскимальное значение диапазона, при слайдере с диапазоном
  private step: number; // шаг ползунка
  private range: boolean; // диапазон слайдера
  private tooltip: boolean; // подсказка над ползунком
  private vertical: boolean; // вертикальный слайдер

  constructor(options: IOptions) {
    this.val = options.val;
    this.minVal = options.minVal;
    this.maxVal = options.maxVal;  
    this.step = options.step;
    this.range = options.range;
    this.tooltip = options.tooltip;
    this.vertical = options.vertical;
  }

  setVal(newVal: number): void {
    this.val = newVal;
  }

  getRange(): number {
    let range = this.maxVal-this.minVal;
    return range;
  }

  getVal(): any {
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

  getVerticalMask(): boolean{
    return this.vertical
  }

}