/**
 * Created by axetroy on 16-10-28.
 */

const expect = require('chai').expect;
import Queue from '../index';

describe('test queue synchronize', function () {

  let queue;

  beforeEach(function () {
    queue = new Queue();
  });

  it('run success', function () {
    expect(queue.tasks).to.be.deep.equal([]);
    expect(queue.tasks.length).to.be.equal(0);

    let temp = 0;

    let next2 = queue.push(function (value, next) {
      temp = 1;
    });

    let next3 = queue.push(function (value, next) {
      temp = 3;
    });

    queue.push(function (value, next) {
      temp = 2;
    });

    expect(temp).to.be.equal(0);
    queue.start();
    expect(temp).to.be.equal(1);
    next2();
    expect(temp).to.be.equal(3);
    next3();
    expect(temp).to.be.equal(2);
  });

});

describe('test queue next value', function () {
  let queue;

  beforeEach(function () {
    queue = new Queue();
  });

  it('first task must be undefined', function (done) {
    queue.push(function (value, next) {
      expect(value).to.be.undefined;
      done();
    });
    queue.start();
  });

  it('next task value must be last task next agm', function (done) {
    queue.push(function (value, next) {
      expect(value).to.be.undefined;
      next(233);
    });
    queue.push(function (value, next) {
      expect(value).to.be.equal(233);
      done();
    });
    queue.start();
  });

  it('verify multiple task value', function (done) {
    queue.push(function (value, next) {
      expect(value).to.be.undefined;
      next(1);
    });
    queue.push(function (value, next) {
      expect(value).to.be.equal(1);
      next(2);
    });
    queue.push(function (value, next) {
      expect(value).to.be.equal(2);
      next(3);
    });
    queue.push(function (value, next) {
      expect(value).to.be.equal(3);
      done();
    });
    queue.start();
  });

});

describe('test queue asynchronous', function () {
  let queue;
  beforeEach(function () {
    queue = new Queue();
  });

  this.timeout(3000);

  it('run async', function (done) {
    let temp = 0;

    let next2 = queue.push(function (value, next) {
      setTimeout(function () {
        temp = 1;
        next();
      }, 200)
    });

    let next3 = queue.push(function (value, next) {
      setTimeout(function () {
        temp = 3;
      }, 1000);
    });

    queue.push(function (value, next) {
      temp = 2;
    });

    expect(temp).to.be.equal(0);
    queue.start();

    setTimeout(function () {
      expect(temp).to.be.equal(0);
    }, 190);

    setTimeout(function () {
      expect(temp).to.be.equal(1);
    }, 205);

    setTimeout(function () {
      expect(temp).to.be.equal(3);
      done();
    }, 1205);

  })
});

describe('if not call next() method', function () {
  let queue;
  beforeEach(function () {
    queue = new Queue();
  });

  this.timeout(3000);

  it('it should not call next task and task pause here', function (done) {
    let temp = 0;

    expect(temp).to.be.equal(0);

    queue.push(function (value, next) {
      temp = 1;
    });

    queue.push(function (value, next) {
      temp = 2;
      next();
    });

    queue.push(function (value, next) {
      temp = 3;
      next();
    });

    queue.push(function (value, next) {
      temp = 4;
      next();
    });

    queue.start();
    expect(temp).to.be.equal(1);

    setTimeout(function () {
      expect(temp).to.be.equal(1);
      done();
    }, 500)

  });

  it('you can call next task manually', function () {
    let temp = 0;

    expect(temp).to.be.equal(0);

    let runNextTask = queue.push(function (value, next) {
      temp = 1;   // not call next task here
    });

    queue.push(function (value, next) {
      temp = 2;
      next();
    });

    queue.push(function (value, next) {
      temp = 3;
      next();
    });

    queue.push(function (value, next) {
      temp = 4;
      next();
    });

    queue.start();
    expect(temp).to.be.equal(1);

    // continue the task
    runNextTask();
    expect(temp).to.be.equal(4);

  })

});