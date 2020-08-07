// Minimize Core

function ce(element) {
    return document.createElement(element);
  }
  
  function cp(text) {
    let p = ce('p');
    p.textContent = text;
    return p;
  }
  
  function qs(query) {
    return document.querySelector(query);
  }
  
  function qsa(query) {
    return document.querySelectorAll(query);
  }
  
  function aEL(query, event, cb) {
    qs(query).addEventListener(event, cb);
  }
  
  function insertAfter(newNode, referenceNode) {
      referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
  }