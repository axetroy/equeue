interface Task {
  done: boolean,
  func(value: any, next: {<T>(val?: any): any}): any
}

/**
 * @class
 * @classdesc a lib to build async task queue
 * @property tasks  {Array<Function>}  Task queue array
 * @author Axetroy <troy450409405@gmail.com>
 */
class Queue {
  private tasks: Task[] = [];

  private startCallBack(): any {

  }

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
    this.tasks.push({done: false,func: task});
    let length: number = this.tasks.length;
    return (val?: any)=> {
      this.run(val, length);
    };
  }

  /**
   * run the task
   * @private
   * @param value {*} value which is the previous task next(value)' argument,if the fist task, it should be undefined
   * @param index {Number} the current task index
   * @returns {void}
   */
  run(value?: any, index: number = 0): void {
    let current = this.tasks[index];
    if (!current) {   // if task has all done
      this.startCallBack.call(this, null, value);
      return;
    }
    current.func.call(this, value, (val)=> {
      current.done = true;
      this.run(val, index + 1);
    });
  }

  /**
   * The queue start callback
   * @callback init
   * @param err {Error|null} if an error occurs
   */

  /**
   * start the queue task
   * @param [callback] {init} callback function
   * @example
   * let queue = new Queue();
   * queue.push(function(undefined,next){
   *  console.log('run first task');
   *  next();
   * });
   * queue.start(function(err, data){
   *   console.log(err);    // null
   *   console.log(data);   // undefined
   * });
   *
   * // output 'run first task';
   * @returns {void}
   */
  start(callback?): void {
    try {
      this.run();
    } catch (err) {
      callback.call(this, err, null);
    }
    typeof callback === 'function' && (this.startCallBack = callback.bind(this));
  }

}

export default Queue;