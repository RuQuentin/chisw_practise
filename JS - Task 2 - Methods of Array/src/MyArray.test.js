class MyArray {
  constructor() {
    this.length = 0;
  }
  map() {}
}

describe("test custom class Array", () => {
  describe("test method map of class Array", () => {
    test("has method map", () => {
      const arr = new MyArray();
      expect(arr.map).toBeInstanceOf(Function);
    });

    test("doesn't have own method map", () => {
      const arr = new MyArray();
      expect(arr.hasOwnProperty("map")).toBeFalsy();
    });

    test("call with 3 arguments", () => {
      const arr = [1, 2, 3, 5];
      arr.map(cb);
      // expect(cb).toBeCalledWith(1, 0, arr);
      expect(cb).toBeGreaterThan(0);
      expect(cb).toHaveBeenLastCalledWith(4, 3, arr);
    });
  });
});
