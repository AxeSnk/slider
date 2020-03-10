# Slider plugin

[DEMO](https://axesnk.github.io/slider/)

Настраиваемый Слайдер. Плагин для JQuery.

## Содержание
- [Установка](#Установка)
- [Использование](#Использование)
- [Опции](#Опции)
- [Архитектура](#Архитектура)

## Установка

1. __git clone https://github.com/AxeSnk/slider__ - клонировать репозитрорий
2. __npm install__ - установить зависимости
3. __npm run build__ - запустить сборку(development)
4. __npm run prod__ - запустить сборку(production)
5. __npm run test__ - запуск тестов(предварительно закомментировать import .scss)

## Использование
Default:
```html
<div class='myNameSlider'></div>
```
```js
$('.myNameSlider').slider();
```
Options:
```html
<div class='myNameSlider'></div>
```
```js
$('.myNameSlider').slider({
	vertical: true,
	step: 2
});
```

## Опции
```ts
val: number = 0; // положение одиночного ползунка
valStart: number = 0; // положение начального ползунка, при слайдере с диапазоном
valEnd: number = 100; // положение конечного ползунка, при слайдере с диапазоном
minVal: number = 0; // минимальное значение слайдера
maxVal: number = 100; // максимальное значение слайдера
step: number = 1; // шаг ползунка
range: boolean = false; // вкл/выкл диапазон слайдера
tooltip: boolean = true; // вкл/выкл подсказку над ползунком
vertical: boolean = false; // вкл/выкл вертикальный слайдер
```

## Архитектура
Плагин реализован по паттерну проектирования MVP(Model View Presenter)

### Model
Хранит данные, устанавливает новые значения и оповещает при изменении состояния.

### View
Отрисовывает слайдер, ползунок, подсказку, заполнение между ползунками.
Оповещает о перемещении ползунка. 

### Presenter
Слой для обновлении Model и View.
- Реагирует на оповещения от View и обновляет Model.
- Реагирует на оповещение о обновлении Model и обновляет View.

### UML