const chain = require("../");

class A {
  test1() {
    console.log("test 1");
    return this;
  }
  
  async test2() {
    console.log("test 2");
    return new B();
  }
  
  exec() {
    console.log("test exec");
    return this;
  }
}

A.prototype.chain = chain;

class B {
  async test3() {
    console.log("test 3");
    return {
      test4: {
        test5() {
          console.log("Success!");
        }
      }
    }
  }
}


const a = new A();
a.chain().test1().exec(true).test2().test3().test4.test5().exec(); //.test1().test2().test3().test4.test5().exec();