import IOptions from '../defaultOptions';

export interface IModel {
  setVal(leftX: number, width: number): void;

  getVal(): number;
  getValStart(): number;
  getValEnd(): number;
  getMinVal(): number;
  getMaxVal(): number;
  getStep(): number;
  getDifference(): number;
  getScaleMask(): boolean;
  getRangeMask(): boolean;
  getTooltipMask(): boolean;
  getVerticalMask(): boolean;

  getArrayDivisions(): number[];
}

export default class Model implements IModel {
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
      this.val = this.valStart
    } else {
      this.val = options.val;
    }

    this.arrrayDivisions = this.createArrayDivisions();
  }

  // создать массив делений для шкалы
  private createArrayDivisions(): number[] {    
    let arr: number[] = [];
    let i: number;
    for(i = this.minVal; i < this.maxVal; i = i + 1) {
      arr.push(i);
    }
    arr.push(this.maxVal);

    return arr;
  }

  public getArrayDivisions(): number[] {
    return this.arrrayDivisions
  }

  public setVal(left: number, width: number): void {
    let val = Math.round(left * (this.maxVal-this.minVal)/width) + this.minVal;
    this.val = val;
  }

  public getDifference(): number {
    let difference = this.maxVal-this.minVal;
    return difference;
  }

  public getVal(): number {
    return this.val
  }

  public getValStart(): number {
    return this.valStart
  }

  public getValEnd(): number {
    return this.valEnd
  }

  public getMinVal(): any {
    return this.minVal
  }

  public getMaxVal(): any {
    return this.maxVal
  }

  public getStep(): number {
    return this.step
  }

  public getRangeMask(): boolean {
    return this.range
  }

  public getTooltipMask(): boolean {
    return this.tooltip
  }

  public getVerticalMask(): boolean {
    return this.vertical
  }

  public getScaleMask(): boolean {
    return this.scale
  }
  
}