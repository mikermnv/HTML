window.addEventListener('DOMContentLoaded', function() {
    var div1 = document.getElementById('D1');
    div1.innerHTML += 'добавлена новая строка';
  
    var div2 = document.createElement('div');
    div2.textContent = 'строка 2';
  
    document.body.appendChild(div2);
  });