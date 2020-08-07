new Vue({
    el:"#app",
  })
  
  function afterLoading() {
    addEventListeners();
    
    new Sortable(qs('#list-area'), {
      animation: 150,
      ghostClass: 'blue-background-class'
    });
    
    
    let task = addTaskToScreen('', '#list-area');
    task.childNodes[2].remove();
    window.setTimeout(function ()
      {
          qs('input').focus();
      }, 0);
   
    
    
  }
  
  afterLoading();
  
  
  function addEventListeners() {
    
    
    aEL('#retrieve-last-tasks', 'click', displayLastTaskList);
    qs('#save-tasks').addEventListener('click', saveTasks);
    qs('#new-list').addEventListener('click', newTaskList);
    qs('#schedule-tasks').addEventListener('click', scheduleTasks);
    aEL('#bulk-lister', 'click', addBulkTasks);
  }
  
  function textAreaAdjust(o) {
    o.style.height = "1px";
    o.style.height = (10+o.scrollHeight)+"px";
  }
  
  function preventLettersInTheDuration(e) {
    if (e.target.className.includes('duration')) {
      if (e.keyCode < 48 || e.keyCode > 57 && e.keyCode < 96 || e.keyCode > 105) {
        if (e.ctrlKey && e.keyCode === 65 || e.key === 'Backspace' || e.key === 'Enter') { // Handle Ctrl + A
          // Do nothing
        } else {
          e.preventDefault();  
        }
      }
    }
  }
  
  function handleInputPresses(e) {
    
    // Prevent letters in the duration.
    preventLettersInTheDuration(e);
    
    if (e.key === 'Enter') {
      if (e.target.className.includes('name')) {
        e.target.nextSibling.focus(); 
      } else {
        // Only create a task if the current duration isn't empty. Might change later.
        if (e.target.value.trim() !== '') {
          let task = createTaskComponent('');
          // We code computers with the same symbols the Romans
          // used to write letters to each other.
          insertAfter(task, e.target.parentNode);
          task.childNodes[0].focus();
          e.target.parentNode.parentNode.childNodes.forEach(task => {
            if (task.childNodes.length !== 4) {
              insertAfter(addX(), task.childNodes[1]);
            }
          });
        } else {
          //
        }
        
      }
      
    } else if (e.key === 'Backspace') {
      if (e.target.className.includes('duration') && e.target.value.trim() === '') {
        console.log(e.target);
        e.target.previousSibling.focus();
      } else if (e.target.className.includes('name') && e.target.value.trim() === '') {
        if (e.target.parentNode.parentNode.childNodes.length > 1) {
          e.target.parentNode.remove();
        }
      }
    }
  }
  
  function addTaskToScreen(text, location, duration = 0) {
    let task = createTaskComponent(text, duration);
    qs(location).appendChild(task);
    return task;
  }
  
  
  
  function createTaskComponent(name, duration = 0) {
    let taskDiv = ce('div');
    taskDiv.className = 'task'
    
    // Name
    let nameInput = ce('input');
    nameInput.style.width = '150px';
    nameInput.style.height = '30px';
    nameInput.className = 'name';
    nameInput.value = name;
    nameInput.addEventListener('keydown', handleInputPresses);
    
    // Duration
    
    let durationInput = ce('input');
    durationInput.style.height = '30px';
    durationInput.style.width = '40px'
    durationInput.className = 'duration';
    durationInput.style.borderLeftWidth = '0';
    durationInput.value = duration;
    durationInput.addEventListener('keydown', handleInputPresses);
    
    // Delete
    let x = addX();
    
    let copy = cp('📄');
    copy.addEventListener('click', function(e) {
      addTaskToScreen(e.target.parentNode.childNodes[0].value, '#list-area', e.target.parentNode.childNodes[1].value);
    });
    taskDiv.appendChild(nameInput);
    taskDiv.appendChild(durationInput);
    taskDiv.appendChild(x);
    taskDiv.appendChild(copy);
    return taskDiv;
  }
  function addX() {
    let x = cp('X');
    x.addEventListener('click', function(e) {
      let list = e.target.parentNode.parentNode; 
      e.target.parentNode.remove()
      if (list.childNodes.length === 1) {
        console.log(list.childNodes);
        list.childNodes[0].childNodes[2].remove();
      }
    });
    return x;
  }
  
  function saveTasks() {
    let db = {}
    db.tasks = [];
    qsa('.task > p:first-child').forEach(function(name) {
      db.tasks.push(name.textContent);
    });
    let dbString = JSON.stringify(db);
    localStorage.setItem('db', dbString);
    
  }
  
  function retrieveLastTaskList() {
    let dbString = localStorage.getItem('db');
    let db = JSON.parse(dbString);
    if (dbString) {
      console.log('Executed...')
      return db.tasks;
    }
    // Should delete
  }
  
  function newTaskList() {
    qsa('#list-area > .task').forEach(function(task) {
      task.remove();
    });
  }
  
  function displayLastTaskList() {
    retrieveLastTaskList().forEach(function(taskName) {
      addTaskToScreen(taskName, '#list-area');
    });
  }
  
  function scheduleTasks() {
    // Collect the tasks
    // Put them into Schedule-friendly format
    let tasks = []
    qsa('.task').forEach(task => {
      let t = {}
      t.name = task.children[0].value;
      t.duration = task.children[1].value;
      tasks.push(t);
    });
    // Put them into a Schedule
    let schedule = new Schedule(tasks);
    // Make the task lists disappear
    // toggleView('schedule');
    // Use the Schedule to lists the tasks
    // List the first task
    const firstEvent = schedule.events[0];
    let startTime = new Date(firstEvent.start.posix).toLocaleTimeString('en-US');
    const myNode = qs('#schedule-area');
    while (myNode.firstChild) {
      myNode.removeChild(myNode.lastChild);
    }
    qs('#schedule-area').appendChild(cp(startTime));
    // List all tasks after
    schedule.events.forEach(event => {
      qs('#schedule-area').appendChild(cp(event.summary));
      let eventEndTime = new Date(event.end.posix).toLocaleTimeString('en-US');
      qs('#schedule-area').appendChild(cp(eventEndTime));
    });
  }
  
  function toggleView(view) {
    switch (view) {
      case 'tasks':
        qs('#list-area').style.display = 'block';
        qs('#schedule-area').style.display = 'none';
        break;
      case 'schedule':
        qs('#list-area').style.display = 'none';
        qs('#schedule-area').style.display = 'block';
        break;
      default:
        throw new Error('The view, ' + view + ', isn\'t registered');
  }
  }
  
  
  
  