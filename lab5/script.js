  var formArray = [
    { label: 'Name', elemtype: 'text1line', name: 'name', width: 200 },
    { label: 'Date', elemtype: 'date', name: 'date' },
    { label: 'Time', elemtype: 'time', name: 'time' },
    { label: 'Game Room', elemtype: 'select', name: 'gameRoom', options: ['Room 1', 'Room 2', 'Room 3', 'Room 4'] },
    { label: 'Number of Players', elemtype: 'text1line', name: 'numberOfPlayers', width: 100 },
    { label: 'VIP', elemtype: 'checkbox', name: 'vip' },
    { label: 'Submit', elemtype: 'button', value: 'Submit' }
  ];

  function handleFormArrayElement(field, form) {
    var label = document.createElement('label');
    label.textContent = field.label;

    var element;

    switch (field.elemtype) {
        case 'text1line':
          element = document.createElement('input');
          element.type = 'text';
          element.style.width = field.width + 'px';
          break;
        case 'checkbox':
          element = document.createElement('input');
          element.type = 'checkbox';
          break;
        case 'select':
          element = document.createElement('select');
          field.options.forEach(function (option) {
            var optionElem = document.createElement('option');
            optionElem.value = option;
            optionElem.textContent = option;
            element.appendChild(optionElem);
          });
          break;
        case 'date':
          element = document.createElement('input');
          element.type = 'date';
          break;
        case 'time':
          element = document.createElement('input');
          element.type = 'time';
          break;
        case 'button':
          element = document.createElement('input');
          element.type = 'button';
          element.value = field.value;
          element.addEventListener('click', function() {
            validateForm(form);
          });
          break;
        default:
          return;
  }
  element.addEventListener("change", function () {
        validateChangedForm(form, element.name);       
        });
  element.name = field.name;
  if(field.elemtype!='button'){
    form.appendChild(label);
  }
  form.appendChild(element);
  form.appendChild(document.createElement('br'));
  }
  
  
  function createFormFields(formArray, formName) {
    var form = document.getElementById(formName);
    formArray.forEach(function(field) {
        handleFormArrayElement(field, form);
    });
  }

  function validateForm(form) {
    console.log('starting validateForm function');
    var inputs = form.getElementsByTagName('input');
    var isValid = true;

    for (var i = 0; i < inputs.length; i++) { 
    switch (inputs[i].name) {
      case 'name':
        if(!validateText(inputs[i])){
          isValid=false;
        }
      break;
      case 'date':
        if(!validateDate(inputs[i])){
          isValid=false;
        }
      break;
      case 'time':
        if(!validateTime(inputs[i])){
          isValid=false;
        }
      break;
      case 'numberOfPlayers':
        if(!validateNumber(inputs[i])){
          isValid=false;
        }
      break;
      default:
        break;
    }
  }
  validateAction(isValid);
}

  function showError(input, message) {
    var errorContainer = document.createElement('span');
    errorContainer.className = 'error';
    errorContainer.textContent = message;
  
    var nextElement = input.nextElementSibling;
    console.log('start show error');
    console.log('next sibling', input.nextSibling);
    console.log('error container',errorContainer);

    if (nextElement && nextElement.className === 'error') {
      nextElement.textContent = message;
      console.log('if error have been existed yet');
    } else {
      input.parentNode.insertBefore(errorContainer, input.nextSibling);
    }
  }
  
  function validateChangedForm(form,name){
    console.log('START CHANGED FUNCTION');
    var inputs = form.getElementsByTagName('input');
    var index;
    var isValid = true;
    for(var i = 0; i < inputs.length; i++)
    {
      if(inputs[i].name === name){
        index =i;
        break;
      }
    }
    switch (inputs[index].name) {
      case 'name':
        if(!validateText(inputs[index])){
          isValid=false;
        }
      break;
      case 'date':
        if(!validateDate(inputs[index])){
          isValid=false;
        }
      break;
      case 'time':
        if(!validateTime(inputs[index])){
          isValid=false;
        }
      break;
      case 'numberOfPlayers':
        if(!validateNumber(inputs[index])){
          isValid=false;
        }
      break;
      default:
        break;
    }
  }

  function hideError(input) {
    var nextElement = input.nextElementSibling;
    console.log('hide error');
    console.log('input',input);
    console.log('next element',nextElement);
    if (nextElement && nextElement.className === 'error') {
      nextElement.parentNode.removeChild(nextElement);
    }
  }
  
function validateAction(isValid){
  if (isValid) {
    alert('The form is valid. You can submit the data.');
    // some code
  } else {
    alert('The form has errors. Please fix all the fields with errors.');
  }
}

function validateDate(input){
  var isValid = true;
  var value = input.value;
  var date = new Date(value);
  var now = new Date();
    if (date < now) {
    showError(input, 'The date must not be in the past!');
    isValid = false;
  }
  if (input.value.trim() === '' && isValid ===true) {
    showError(input, 'This field is required');
    isValid = false;
  }
  if (isValid) {
    hideError(input);
  }
  return isValid;
}

function validateTime(input) {
  var isValid = true;
  var value = input.value;
  var timeParts = value.split(':');
  var now = new Date();
  var selectedTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), timeParts[0], timeParts[1]);
  if (selectedTime < now) {
    showError(input, 'The time must not be in the past and must be after the current time!');
    isValid = false;
  }
  if (input.value.trim() === '' && isValid ===true) {
    showError(input, 'This field is required');
    isValid = false;
  }
  if (isValid) {
    hideError(input);
  }
  return isValid;
}

function validateNumber(input) {
  var isValid = true;
  var value = input.value;
  for (var j = 0; j < value.length; j++) {
    if (isNaN(Number(value[j]))) {
      showError(input, 'Wrong format!');
      isValid = false;
      break;
    }
  }
  if (input.value.trim() === '' && isValid ===true) {
    showError(input, 'This field is required');
    isValid = false;
  }
  if (isValid) {
    hideError(input);
  }
  return isValid;
}

function validateText(input){
  var isValid = true;

  if (input.value.trim() === '') {
    showError(input, 'This field is required');
    isValid = false;
  }
  if(isValid){
    hideError(input);
  }
  return isValid;
}

window.addEventListener('DOMContentLoaded', function () {
  createFormFields(formArray, 'myForm');
});