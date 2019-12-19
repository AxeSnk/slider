export interface IObservable {

    addObserver(func: () => void): void;
    removeObserver(func: () => void): void;
    notifyObservers(): void;

}

export default class Observable {

    private observers: {(): void}[] = [];

    addObserver(func: () => void): void {
        this.observers.push(func);
    }

    removeObserver(func: () => void): void {
        this.observers = this.observers.filter(observer => observer !== func);
    }

    notifyObservers(): void {
        this.observers.forEach(observer => observer);
    }
    
}