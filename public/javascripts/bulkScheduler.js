function addBulkTasks(e) {
    let tasks = qs('#bulk-list').value.split('\n');
    console.log('hi');
    tasks.forEach(task => {
      addTaskToScreen(task, '#list-area');
    });
  }