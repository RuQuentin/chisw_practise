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
      this[i] = arguments[i];
    }

    return;
  }

  get length() {
    let counter = 0;
    for (let key in this) {
      counter = this.hasOwnProperty(key) ? counter + 1 : counter;
    }
    return counter;
  }

  *[Symbol.iterator]() {
    for (let key in this) {
      if (this.hasOwnProperty(key)) yield this[key];
    }
  }
}

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
MyArr.from = function(arrayLike, callback, thisArg) {
  const newArray = new MyArr();

  if (thisArg) {
    for (let i = 0, argLength = arrayLike.length; i < argLength; i += 1) {
      newArray.push(callback.call(thisArg, arrayLike[i], i, arrayLike));
    }
  }

  if (callback && !thisArg) {
    for (let i = 0, argLength = arrayLike.length; i < argLength; i += 1) {
      newArray.push(callback(arrayLike[i], i, arrayLike));
    }
  }

  if (!callback && !thisArg) {
    for (let i = 0, argLength = arrayLike.length; i < argLength; i += 1) {
      newArray.push(arrayLike[i]);
    }
  }

  return newArray;
};

// ===================== MAP =====================
MyArr.prototype.map = function(callback, thisArg) {
  const newArray = new MyArr();

  if (thisArg) {
    for (let i = 0, argLength = this.length; i < argLength; i += 1) {
      newArray.push(callback.call(thisArg, this[i], i, this));
    }
  } else {
    for (let i = 0, arrLength = this.length; i < arrLength; i++) {
      newArray.push(callback(this[i], i, this));
    }
  }

  return newArray;
};

// =================== forEach ===================
MyArr.prototype.forEach = function(callback, thisArg) {
  if (thisArg) {
    for (let i = 0, argLength = this.length; i < argLength; i += 1) {
      callback.call(thisArg, this[i], i, this);
    }
  } else {
    for (let i = 0, arrLength = this.length; i < arrLength; i++) {
      callback(this[i], i, this);
    }
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
      accumulator = callback(accumulator, this[i], i, this);
    }
  }
  return accumulator;
};

// ===================== FILTER =====================
MyArr.prototype.filter = function(callback, thisArg) {
  const newArray = new MyArr();

  if (thisArg) {
    for (let i = 0, argLength = this.length; i < argLength; i += 1) {
      if (callback.call(thisArg, this[i], i, this)) newArray.push(this[i]);
    }
  } else {
    for (let i = 0, arrLength = this.length; i < arrLength; i++) {
      if (callback(this[i], i, this)) newArray.push(this[i]);
    }
  }

  return newArray;
};

// =================== SORT ===================
MyArr.prototype.sort = function(callback) {
  let arrLength = this.length;
  let buffer = this[String(0)];

  switch (callback) {
    case undefined:
      for (let j = 0; j < arrLength; j++) {
        let flag = 0;

        for (let i = 0; i < arrLength - 1; i++) {
          if (String(this[i]) > String(this[String(i + 1)])) {
            buffer = this[i];
            this[i] = this[String(i + 1)];
            this[String(i + 1)] = buffer;
            flag++;
          }
        }
        if (flag == 0) break;
      }
      return this;
      break;

    default:
      for (let j = 0; j < arrLength; j++) {
        let flag = 0;

        for (let i = 0; i < arrLength - 1; i++) {
          if (callback(this[i], this[String(i + 1)]) < 0) {
            buffer = this[i];
            this[i] = this[String(i + 1)];
            this[String(i + 1)] = buffer;
            flag++;
          }
        }
        if (flag == 0) break;
      }
      return this;
  }
};

// ===================== toString =====================
MyArr.prototype.toString = function() {
  const arrLength = this.length;
  if (arrLength === 0) return "";

  let newString = String(this[String(0)]);
  for (let i = 1; i < arrLength; i++) {
    newString = newString + "," + this[i];
  }

  return newString;
};

// ===================== REST =====================
// MyArr.prototype[Symbol.iterator] = function() {
//   let i = 0;
//   const arrLength = this.length;
//   const that = this;

//   return {
//     next(arr1) {
//       if (i < arrLength) {
//         return {
//           done: false,
//           value: that[String(i++)]
//         };
//       } else {
//         return {
//           done: true
//         };
//       }
//     }
//   };
// };

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
// const objectAside = Object.create({ 0: 2 });
// const arr2 = MyArr.from([[2, 1], { 0: 1, 1: "654" }, 3, "dsfsdf"]);
// const arr2 = MyArr.from("sdfsdfs");
// const arr2 = MyArr.from([1, 2, 3], someFunction, objectAside);
// console.log(arr2);
// const arr3 = Array.from([1, 2, 3], someFunction, objectAside);
// console.log(arr3);

// === Test MAP
// const arr2 = new MyArr(1, 2, "abc", 4, 5);
// function someFunction(item, index, array) {
//   return `${item} is an element #${index}  in array ${array} and!!! ${this[0]}`;
// return item;
// }
// const objectAside = Object.create({ 0: 2 });
// const arr3 = arr2.map(item => item * 2);
// const arr3 = arr2.map(someFunction, objectAside);
// console.log(arr3);
// // console.log(arr3[1] === arr2[1]);

// === Test forEach
// const objectAside = Object.create({ 0: 2 });
// const arr2 = new MyArr(1, 2, "abc", 4, 5);
// const arr3 = new MyArr();
// function someFunction(item, index, array) {
// console.log(
// `${item} is an element #${index}  in array ${array} and!!! ${this[0]}`
// );
//   arr3[index] = item;
// }
// arr2.forEach(someFunction, objectAside);
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
// const objectAside = Object.create({ 0: 2 });
// const arr2 = new MyArr(1, 256, "abc", 4, 51.56);
// function someFunction(item, index, array) {
//   if (this[0] == 2) return Number.isInteger(item);
// }
// const arr3 = arr2.filter(someFunction);
// console.log(arr3);

// === Test SORT
// const arr2 = new MyArr(5, 2, 3, 8, 6, 0, 89, 7, 90, 100, 2000);
// arr2.sort((a, b) => a - b);
// console.log(arr2);

// === Test ToString
// const arr2 = new MyArr([2, 1], { 0: 1, 1: "654" }, 3, "dsfsdf");
// const arr3 = arr2.toString();
// console.log(arr3);

// === Test REST
// const realArr = [...arr1];
// console.log(arr1.length);
// console.log(realArr);
