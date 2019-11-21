import IOptions, { defaultOptions } from './defaultOptions';

export interface IModel {
  getVal(): any
  getMinVal(): any;
  getMaxVal(): any;
}

export default class Model implements IModel {
  private val: any;
  private minVal: any;
  private maxVal: any;

  constructor(options: IOptions) {
    this.val = options.val;
    this.minVal = options.minVal;
    this.maxVal = options.maxVal;  
  }

  getVal(): any {
    return this.val;
  }

  getMinVal(): any {
    return this.minVal;
  }

  getMaxVal(): any {
    return this.maxVal;
  }


}