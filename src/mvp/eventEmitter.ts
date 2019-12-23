export default class EventEmitter {
  events: {};

  constructor() {
    this.events = {};
  }

  on(type: string, callback: Function): void {
    this.events[type] = this.events[type] || [];
    this.events[type].push(callback);
  }

  emit(type: string, arg: any): void {
    if (this.events[type]) {
      this.events[type].forEach(callback => callback(arg));
    }
  }
    
}