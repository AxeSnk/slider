import IOptions, { defaultOptions } from './defaultOptions';

export interface IModel {
  getWidth(): string;
  getVal(): any 
  getMinVal(): any;
  getMaxVal(): any;
  getStep(): any;
  getRange(): boolean;
  getTooltipMask(): boolean;
  getVerticalMask(): boolean;
}

export default class Model implements IModel {
  private width: string; // ширина слайдера
  private val: any; // первоначальное положение одиночного ползунка
  private minVal: any; // минимальное значение диапазона, при слайдере с диапазоном
  private maxVal: any; // маскимальное значение диапазона, при слайдере с диапазоном
  private step: any; // шаг ползунка
  private range: boolean; // диапазон слайдера
  private tooltip: boolean; // подсказка над ползунком
  private vertical: boolean; // вертикальный слайдер


  constructor(options: IOptions) {
    this.width = options.width;
    this.val = options.val;
    this.minVal = options.minVal;
    this.maxVal = options.maxVal;  
    this.step = options.step;
    this.range = options.range;
    this.tooltip = options.tooltip;
    this.vertical = options.vertical;
  }

  getWidth(): string {
    return this.width
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

  getStep(): any {
    return this.step
  }

  getRange(): boolean {
    return this.range
  }

  getTooltipMask(): boolean {
    return this.tooltip
  }

  getVerticalMask(): boolean{
    return this.vertical
  }

}