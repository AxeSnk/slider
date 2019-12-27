import createElement from '../../utility';
import EventEmitter from '../../eventEmitter';

export default class Scale extends EventEmitter {
	private scale: HTMLElement;
	private parent: HTMLElement;

	constructor(parent: HTMLElement) {
		super();

		this.parent = parent;

		this.scale = createElement('div', { class: 'slider__scale' });
		this.parent.appendChild(this.scale);
  }
  
  private createDivisionScale(arrrayOfDivisions: number[]): void {
    for(let i: number = 0; i < arrrayOfDivisions.length; i++) {
      let division: HTMLElement = document.createElement('div');
      division.classList.add('slider__scale-division');
      division.id = `slider__scale-division-${i}`;
      this.scale.appendChild(division);

      let division__text: HTMLElement = document.createElement('div');
      division__text.classList.add('division__text');
      division.appendChild(division__text);
    };
  }

  private arrangeValuesOnTheScale(arrrayOfDivisions: number[]): void { 
    // расставить значения на шкале
    for( let i: number = 0; i < arrrayOfDivisions.length; i++ ) {
      document.getElementById(`slider__scale-division-${i}`)!.firstElementChild!.innerHTML = `${arrrayOfDivisions[i]}`;
    }
  }

  public renderScale(arrrayOfDivisions: number[], sliderWidth: number, handleWidth: number): void {
    this.createDivisionScale(arrrayOfDivisions);
    this.arrangeValuesOnTheScale(arrrayOfDivisions);

    this.scale.style.width = (sliderWidth - handleWidth) + 'px';
		this.scale.style.left = (handleWidth / 2) + 'px';
  }

}
