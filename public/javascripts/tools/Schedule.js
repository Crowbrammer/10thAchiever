
/** Note: This schedule models the GCal API.**/
class Schedule {
    tasks;
    startTime;
    events = [];
    constructor(tasks, start = Date.now()) {
      this.tasks = tasks;
      this.startTime = start;
      this.buildEvents();
    }
    
    buildEvents() {
      this.events[0] = this.buildEvent(this.startTime, this.tasks[0]);
      for (let i = 1; i < this.tasks.length; i++) {
        const task = this.tasks[i];
        const startPosixTime = this.events[i-1].end.posix;
        const event = this.buildEvent(startPosixTime, task);
        this.events.push(event);
      }
    }
    
    buildEvent(startTime, task) {
      let event = {};
      event.start = {};
      event.start.posix = startTime;
      event.start.dateTime = new Date(event.start.posix).toISOString();
      event.end = {};
      event.end.posix = startTime + task.duration * 60 * 1000;
      event.end.dateTime = new Date(event.end.posix).toISOString();
      event.summary = task.name;
      return event;
    }
    
    
    
  }