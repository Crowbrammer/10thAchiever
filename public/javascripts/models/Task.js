class Task {
    #duration;
    #id;
    #isDone;
    #name;
    
    
    
    get duration() {
      return this.#duration;
    }
    
    set duration(_duration) {
      this.#duration = _duration;
    }
    
    get id() {
      return this.#id;
    }
    
    set id(_id) {
      this.#id = _id;
    } 
    
    get isDone() {
      return this.#isDone;
    }
    
    set isDone(_isDone) {
      this.#isDone = _isDone;
    }
    
    get name() {
      return this.#name;
    }
    
    set name(_name) {
      this.#name = _name;
    }
    
    save() {
      
      if (typeof db === 'undefined') {
        throw new Error('No db defined');
      }
    }
  } 