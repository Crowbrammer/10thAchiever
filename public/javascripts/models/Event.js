class Event {
    #name;
    #startTime;
    #endTime;
    constructor(task, startTime) {
      this.#name = task.name;
      this.#startTime = startTime;
      // this.#endTime = startTime;
    }
    
    get name() {
      return this.#name;
    }
    
    set name(_val) {
      this.#name = _val
    }
    
    get startTime() {
      return this.#startTime;
    }
    
    set startTime(_val) {
      this.#startTime = _val
    }
    
    get endTime() {
      return this.#endTime;
    }
    
    set endTime(_val) {
      this.#endTime = _val
    }
  }