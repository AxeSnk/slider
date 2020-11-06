export default interface IOptions {
  val: number; // положение одиночного ползунка
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
  val: 4,
  valEnd: 6,
  minVal: 0,
  maxVal: 10,
  step: 1,
  range: false,
  tooltip: true,
  vertical: false,
  scale: true,
};

export { defaultOptions };
