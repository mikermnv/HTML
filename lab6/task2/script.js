class TLocalStorage {
    constructor() {
      this.storage = window.localStorage;
    }

    getValue(key) {
      return this.storage.getItem(key);
    }

    setValue(key, value) {
      this.storage.setItem(key, value);
    }

    deleteItem(key) {
      this.storage.removeItem(key);
    }

    resetData() {
      this.storage.clear();
    }
  }

  class THashStorage extends TLocalStorage {
    roomsHash;

    constructor() {
      super();
      this.roomsHash = {};
    }

    addValue(key, value) {
      this.roomsHash[key] = value;
      this.setValue(key, value);
    }

    deleteValue(key) {
      if (this.roomsHash.hasOwnProperty(key)) {
        delete this.roomsHash[key];
        this.deleteItem(key);
        console.log("Информация о комнате удалена.");
      } else {
        console.log("Нет информации о такой комнате.");
      }
    }

    getValueInfo(key) {
      if (this.roomsHash.hasOwnProperty(key)) {
        console.log("Название комнаты: " + key);
        console.log(`Описание: ${this.roomsHash[key]}`);
      } else {
        console.log("Нет информации о такой комнате.");
      }
    }

    listValues() {
      let result = "";
      for (let key in this.roomsHash) {
        result += `Название комнаты: ${key}\n`;
        result += `Описание: ${this.roomsHash[key]}\n`;
        result += "\n";
      }
      if (Object.entries(this.roomsHash).length === 0) {
        console.log("Нет комнат для показа");
      } else {
        console.log(result);
      }
    }

    reset() {
      this.roomsHash = {};
      this.resetData();
      console.log("Хранилище очищено.");
    }
  }

  const Storage = new THashStorage();

  function addInfo() {
    let key = prompt("Введите название комнаты:");
    if (key !== null) {
      key = key.trim();
      if (key !== "") {
        let value = prompt("Введите описание данной комнаты:");
        if (value !== null && value !== "") {
          Storage.addValue(key, value);
        } else {
          console.log("Ошибка: Описание комнаты должно быть заполнено.");
        }
      } else {
        console.log("Ошибка: Название комнаты должно быть заполнено.");
      }
    }
  }

  function deleteInfo() {
    let key = prompt("Введите название комнаты для удаления:");
    if (key !== null) {
      key = key.trim();
      if (key !== "") {
        Storage.deleteValue(key.trim());
      } else {
        console.log("Ошибка: Название комнаты должно быть заполнено.");
      }
    }
  }

  function getInfo() {
    let key = prompt("Введите название комнаты для получения информации:");
    if (key !== null) {
      key = key.trim();
      if (key !== "") {
        Storage.getValueInfo(key.trim());
      } else {
        console.log("Ошибка: Название комнаты должно быть заполнено.");
      }
    }
  }

  function listValues() {
    Storage.listValues();
  }

  function resetInfo() {
    Storage.reset();
  }