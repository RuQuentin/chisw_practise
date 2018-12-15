// import MyArray from "./MyArray";

// window.MyArray = MyArray;

// class MyArr {
//   constructor() {
//     this.args = arguments;
//   }

//   print(n) {
//     console.log(this.args);
//   }
// }

// Запрещено - использовать настоящий массив в любом его виде, а так же классы Map, Set

// 1. создать класс myArray, который будет работать следующим образом -

//   const arr = new myArray(1 ,4, [2,4], { name: 'ivan' });
//   arr[0] === 1; // true
//   arr[3].name === 'ivan'; // true
//   arr.length === 4; // true

// 2. добавить следующие методы:
//   push,pop - добавление, удаление в конец
//   from - создает массив из чего то итеррируемого, например arguments,
//   map - перебирает все элементы массива применяя функцию колбэк(3 аргумента как и у оригинальной) и возвращая новый массив,
//   forEach - перебирает все элементы массива применяя функцию колбэк(3 аргумента как и у оригинальной) и ничего не возвращая,
//   reduce - перебирает все элементы массива применяя функцию колбэк(4 аргумента как и у оригинальной) и начальное значение, а возвращая то что вернет последняя функция,
//   filter - перебирает все элементы массива применяя функцию колбэк(3 аргумента как и у оригинальной) и возвращая новый отфильтрованный массив,
//   sort - сортирует так же как и настоящий сорт, и может принимать компаратор
//   toString -это тот случай когда мы его переопределим:)
//  будет возвращать строку вида "1,4,2,4,[object Object]"
// 3. ну и конечно же задание со звездочкой :)
//  куда без него!
//    хочу чтоб можно было сделать так:
//  const realArr = [...arr]; // результат - настоящий массив [1 ,4, [2,4], { name: 'ivan' }]

class MyArr {
  constructor() {
    // + добавить проверку на пустое значение - возвращать undefined
    for (let i = 0, argLength = arguments.length; i < argLength; i += 1) {
      this[String(i)] = arguments[i];
    }
  }

  get length() {
    let counter = 0;
    for (let key in this) {
      counter = this.hasOwnProperty(key) ? counter + 1 : counter;
    }
    return counter;
  }
}

// ==================== lENGTH ====================
// Object.defineProperty(MyArr.prototype, "length", {
//   get: function() {
//     let counter = 0;
//     for (let key in this) {
//       counter++;
//     }
//     return counter;
//   }
// });

// ===================== PUSH =====================
MyArr.prototype.push = function() {
  let i = 0;
  for (i = 0, argLength = arguments.length; i < argLength; i += 1) {
    this[String(this.length)] = arguments[i];
  }
  return this.length;
};

// ===================== POP =====================
MyArr.prototype.pop = function() {
  const lastItem = this[String(this.length - 1)];
  delete this[String(this.length - 1)];
  return lastItem;
};

// ===================== FROM =====================
MyArr.from = function() {
  const newArray = new MyArr();
  if (arguments.length > 1)
    return console.log("You should't pass more that 1 argument to this method");

  for (let i = 0, argLength = arguments[0].length; i < argLength; i += 1) {
    newArray.push(arguments[0][i]);
  }

  return newArray;
};

// ===================== MAP =====================
MyArr.prototype.map = function(callback) {
  // + проверка, чтобы аргумент был функцией, и только один
  // + как поступает оригинальный MAP, когда не может обработать элемент
  const newArray = new MyArr();
  for (let i = 0, arrLength = this.length; i < arrLength; i++) {
    newArray.push(callback(this[String(i)], i, this));
  }
  return newArray;
};

// =================== forEach ===================
MyArr.prototype.forEach = function(callback) {
  // + проверка, чтобы аргумент был функцией, и только один
  // + как поступает оригинальный MAP, когда не может обработать элемент
  for (let i = 0, arrLength = this.length; i < arrLength; i++) {
    callback(this[String(i)], i, this);
  }
  return undefined;
};

// =================== REDUCE ====================
MyArr.prototype.reduce = function(callback, initValue) {
  // + проверка, чтобы аргумент был функцией, и только один
  // + как поступает оригинальный REDUCE, когда не может обработать элемент
  let accumulator = initValue ? initValue : 0;
  const arrLength = this.length;
  if (arrLength > 0) {
    for (let i = 0; i < arrLength; i++) {
      console.log(i);
      accumulator = callback(accumulator, this[String(i)], i, this);
    }
  }
  return accumulator;
};

// ===================== FILTER =====================
MyArr.prototype.filter = function(callback) {
  // + проверка, чтобы аргумент был функцией, и только один
  // + как поступает оригинальный MAP, когда не может обработать элемент
  // + добавить возможность использования параметра thisArg
  const newArray = new MyArr();
  for (let i = 0, arrLength = this.length; i < arrLength; i++) {
    if (callback(this[String(i)], i, this)) {
      newArray.push(this[String(i)]);
    }
  }
  return newArray;
};

// =================== sort ===================
MyArr.prototype.sort = function(callback) {
  // + проверка, чтобы аргумент ...
  let arrLength = this.length;
  let buffer = this[String(0)];
  for (let j = 0; j < arrLength; j++) {
    let flag = 0;

    for (let i = 0; i < arrLength - 1; i++) {
      if (this[String(i)] > this[String(i + 1)]) {
        buffer = this[String(i)];
        this[String(i)] = this[String(i + 1)];
        this[String(i + 1)] = buffer;
        flag++;
      }
    }

    if (flag == 0) break;
  }
  return this;
};

// ===================== toString =====================
MyArr.prototype.toString = function() {
  const arrLength = this.length;
  if (arrLength === 0) return "";

  let newString = String(this[String(0)]);
  for (let i = 1; i < arrLength; i++) {
    newString = newString + "," + this[String(i)];
  }

  return newString;
};

// === Test INPUT DATA
const arr1 = new MyArr("sdfs", 5, { name: "ivan" }, [15, 12]);

// === Test LENGTH
// console.log(arr1.length);
// console.log(arr1);

// === Test PUSH
// arr1.push(6, 12);
// console.log(arr1.push(6, 12));
// console.log(arr1);

// === Test POP
// console.log(arr1.pop());
// console.log(arr1);

// === Test FROM
// const arr2 = MyArr.from([[2, 1], { 0: 1, 1: "654" }, 3, "dsfsdf"]);
// const arr2 = MyArr.from("sdfsdfs");
// const arr2 = MyArr.from(123);
// console.log(arr2);

// === Test MAP
// const arr2 = new MyArr(1, 2, "abc", 4, 5);
// function someFunction(item, index, array) {
//   return `${item} is an element #${index}  in array ${array}`;
//   // return item;
// }
// // const arr3 = arr2.map(item => item * 2);
// const arr3 = arr2.map(someFunction);
// console.log(arr3);
// // console.log(arr3[1] === arr2[1]);

// === Test forEach
// const arr2 = new MyArr(1, 2, "abc", 4, 5);
// const arr3 = new MyArr();
// function someFunction(item, index, array) {
//   // console.log(`${item} is an element #${index}  in array ${array}`);
//   arr3[index] = item;
// }
// arr2.forEach(someFunction);
// console.log(arr2[1] === arr3[1]);

// === Test REDUCE
// function callback(accumulator, item) {
//   return accumulator + item;
// }
// function callback(accumulator, item) {
//   return accumulator.concat(item);
// }
// const initValue = 52;
// const arr2 = new MyArr([0, 1], [2, 3], [4, 5]);
// let b = arr2.reduce(callback, [-2, -1]);
// console.log(b);

// const initValue = 52;
// const arr2 = [2, 3, 5];
// let b = arr2.reduce(callback, initValue);
// console.log(b);

// === Test FILTER
// const arr2 = new MyArr(1, 256, "abc", 4, 51.56);
// function someFunction(item, index, array) {
//   return Number.isInteger(item);
// }
// const arr3 = arr2.filter(someFunction);
// console.log(arr3);

// === Test SORT
// const arr2 = new MyArr(5, 2, 3, 8, 6, 0, 89, 7, 90);
// arr2.sort();
// console.log(arr2);

// === Test ToString
// const arr2 = new MyArr([2, 1], { 0: 1, 1: "654" }, 3, "dsfsdf");
// const arr3 = arr2.toString();
// console.log(arr3);
