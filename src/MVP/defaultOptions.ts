export default interface IOptions {
  val: number; // положение одиночного ползунка
  valStart: number; // положение начального ползунка, при слайдере с диапазоном
  valEnd: number; // положение конечного ползунка, при слайдере с диапазоном
  minVal: number; // минимальное значение слайдера
  maxVal: number; // максимальное значение слайдера
  step: number; // шаг ползунка
  range: boolean; // вкл/выкл диапазон слайдера
  tooltip: boolean; // вкл/выкл подсказку над ползунком
  vertical: boolean; // вкл/выкл вертикальный слайдер
  scale: boolean; // шкала значений
}

const defaultOptions: IOptions = {
  val: 0,
  valStart: 0,
  valEnd: 100,
  minVal: 0,
  maxVal: 100,
  step: 1,
  range: false,
  tooltip: true,
  vertical: false,
  scale: true
};

export { defaultOptions };
