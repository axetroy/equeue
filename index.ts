
/**
 * @class
 * @classdesc a lib to build async task queue
 * @property tasks  {Array<Function>}  Task queue array
 * @author Axetroy <troy450409405@gmail.com>
 */
class Queue {
  private tasks: {(value: any, next: {<T>(val?: any): any}): any}[] = [];

  /**
   * Constructor
   * @example
   * let queue = new Queue();
   * queue.start();
   * @param [options] {Object} not support any config now
   */
  constructor(options?) {

  }


  /**
   * The task
   * @callback task
   * @param value {*} value which is the previous task next(value)' argument,if the fist task, it should be undefined
   * @param next {Function} The function call next task
   */

  /**
   * push the task into the queue
   * @param task {task} task
   * @example
   * queue.push(function (value, next) {
   *    // do something
   *    next();
   * });
   * @returns {task} next task
   */
  push(task: {(value: any, next: {<T>(val: any): any}): any}): {(val?: any): any} {
    this.tasks.push(task);
    let length: number = this.tasks.length;
    return (val?: any)=> {
      this.run(val, length);
    };
  }

  /**
   * 运行任务
   * @private
   * @param value {*} value which is the previous task next(value)' argument,if the fist task, it should be undefined
   * @param index {Number} the current task index
   * @returns {void}
   */
  run(value?: any, index: number = 0): void {
    let current: {(value: any, next: {<T>(val?: any): any}): any} = this.tasks[index];
    if (!current) return;
    current.call(this, value, (val)=> {
      this.run(val, index + 1);
    });
  }

  /**
   * start the queue task
   * @example
   * let queue = new Queue();
   * queue.push(function(undefined,next){
   *  console.log('run first task');
   *  next();
   * });
   * queue.start();
   *
   * // output 'run first task';
   * @returns {void}
   */
  start(): void {
    this.run();
  }

}

export default Queue;