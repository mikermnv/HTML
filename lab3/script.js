let roomsHash = {};

function addInfo() {
  let key = prompt("Введите название комнаты:");
  if (key !== null) {
    key = key.trim();
    if (key !== "") {
      let value = prompt("Введите описание данной комнаты:");
      if (value !== null && value !=="") {
        addValue(key, value);
      } else {
        console.log("Ошибка: Описание комнаты должно быть заполнено.");
      }
    } else {
      console.log("Ошибка: Название комнаты должно быть заполнено.");
    }
  }
}

function addValue(key,value) {
  roomsHash[key] = value;
}

function deleteInfo(){
  let key = prompt("Введите название комнаты для удаления:");
  if (key !== null) {
    key = key.trim();
    if (key !== "") {
      deleteValue(key.trim());
    } else {
      console.log("Ошибка: Название комнаты должно быть заполнено.");
    }
  }
}

function deleteValue(key) {
  if (roomsHash.hasOwnProperty(key)) {
    delete roomsHash[key];
    console.log("Информация о комнате удалена.");
  } else {
    console.log("Нет информации о такой комнате.");
  }
}

function getInfo(){
  let key = prompt("Введите название комнаты для получения информации:");
  if (key !== null) {
    key = key.trim();
    if (key !== "") {
      getValueInfo(key.trim());
    } else {
      console.log("Ошибка: Название комнаты должно быть заполнено.");
    }
  }
}

function getValueInfo(key) {
  
  if (roomsHash.hasOwnProperty(key)) {
    console.log("Название комнаты: " + key);
    console.log(`Описание: ${roomsHash[key]}`);
  } else {
    console.log("Нет информации о такой комнате.");
  }
}

function listValues() {
  let result="";
  for (let key in roomsHash) {
    result += `Название комнаты: ${key}\n`;
    result += `Описание: ${roomsHash[key]}\n`;
    result += "\n";
  }
  if(Object.entries(roomsHash).length==0){    /*result.trim() === ""*/
    console.log("Нет комнат для показа");
  }else{
    console.log(result);
  }
}