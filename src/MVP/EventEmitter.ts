type Observer = (...args: any[]) => void;

class EventEmitter {
  private events: { [key: string]: any[] };

  constructor() {
    this.events = {};
    this.on = this.on.bind(this);
    this.emit = this.emit.bind(this);
  }

  public on(type: string, callback: Observer): void {
    this.events[type] = this.events[type] || [];
    this.events[type].push(callback);
  }

  public emit(type: string, arg?: any): void {
    if (this.events[type]) {
      this.events[type].forEach((callback) => callback(arg));
    }
  }
}

export default EventEmitter;
