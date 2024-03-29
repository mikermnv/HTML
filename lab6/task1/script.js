var MenuA = [
  {
    name: 'Attraction',
    submenu: [
      {
        name: 'Console',
        submenu: [
          { name: 'Xbox', url: 'http://www.example.com' },
          { name: 'Playstation',
            submenu: [
              { name: 'PS 4', url: 'http://www.example.com' },
              { name: 'PS 5', url: 'http://www.example.com' }
            ]
          }
        ]
      },
      {name: 'Game', url: 'http://www.example.com'},
      {name : 'Toy', url: 'http://www.example.com'},
      {name: 'Disc', url: 'http://www.example.com'},
      { name: 'TV', url: 'http://www.example.com' },
      {
        name: 'Computer',
        submenu: [
          { name: 'Dell', url: 'http://www.example.com' },
          { name: 'Hp', url: 'http://www.example.com' },
          { name: 'Lenovo', url: 'http://www.example.com' },
          { name: 'Asus', url: 'http://www.example.com' }
        ]
      }
    ]
  },
  { name: 'Room', url: 'http://www.example.com' },
  {
    name: 'Emporium',
    submenu: [
      { name: 'A', url: 'http://www.example.com' },
      { name: 'B', url: 'http://www.example.com' }
    ]
  }
];

function createMenuItem(item) {
  var menuItem = document.createElement('div');
  menuItem.classList.add('menu-item');
  menuItem.textContent = item.name;

  if (item.submenu) {
    menuItem.addEventListener('click', function (event) {
      event.stopPropagation(); // Остановка всплытия события, чтобы не скрывать меню
      showMenu(item.submenu, menuItem);
    });
    menuItem.classList.add('has-submenu');
  } else if (item.url) {
    menuItem.addEventListener('click', function () {
      window.location.href = item.url;
    });
  }

  return menuItem;
}

function showMenu(menuItems, parentElement) {
  var submenu = parentElement.querySelector('.submenu');
  if (!submenu) {
    submenu = document.createElement('div');
    submenu.classList.add('submenu');
    parentElement.appendChild(submenu);
  } else {
    submenu.style.display = submenu.style.display === 'block' ? 'none' : 'block';
    return;
  }

  submenu.innerHTML = '';

  menuItems.forEach(function (item) {
    var submenuItem = document.createElement('div');
    submenuItem.classList.add('submenu-item');
    submenuItem.textContent = item.name;

    if (item.submenu) {
      submenuItem.addEventListener('click', function (event) {
        event.stopPropagation(); // Остановка всплытия события, чтобы не скрывать меню
        showMenu(item.submenu, submenuItem);
      });
      submenuItem.classList.add('has-submenu');
    } else if (item.url) {
      submenuItem.addEventListener('click', function () {
        window.location.href = item.url;
      });
    }

    submenu.appendChild(submenuItem);
  });

  submenu.style.display = 'block';
}

document.addEventListener('DOMContentLoaded', function () {
  var menuContainer = document.getElementById('menu-container');
  var menu = document.createElement('ul');
  menu.classList.add('menu');

  MenuA.forEach(function (item) {
    var menuItem = createMenuItem(item);
    menu.appendChild(menuItem);
  });

  menuContainer.appendChild(menu);

  // Обработчик для скрытия меню при клике вне его
  document.addEventListener('click', function (event) {
    var targetElement = event.target;
    var isMenuClicked = targetElement.classList.contains('menu-item') || targetElement.classList.contains('submenu-item');
    if (!isMenuClicked) {
      var submenus = document.querySelectorAll('.submenu');
      submenus.forEach(function (submenu) {
        submenu.style.display = 'none';
      });
    }
  });
});