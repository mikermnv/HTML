import { fromEvent } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import { map, switchMap } from 'rxjs/operators';

const showDataButton = document.getElementById('showData');
const deleteDataButton = document.getElementById('deleteData');
const dataContainer = document.getElementById('dataContainer');

fromEvent(showDataButton, 'click').pipe(
  switchMap(() => ajax.getJSON('http://localhost:3000/download/game.json')),
  map(gameData => Object.entries(gameData)),
  map(gameEntries => {
    const tableRows = gameEntries.map(([title, description]) => `<tr><td>${title}</td><td>${description}</td></tr>`);
    const tableHTML = `<table class='table'><thead><tr><th id='title-cell'>Title</th><th id='description-cell'>Description</th></tr></thead><tbody>${tableRows.join('')}</tbody></table>`;
    return tableHTML;
  })
).subscribe(tableHTML => {
  dataContainer.innerHTML = tableHTML;
});

fromEvent(deleteDataButton, 'click').subscribe(() => {
  const table = dataContainer.getElementsByClassName('table')[0];
  if (table) {
    const rows = table.getElementsByTagName('tr');
    if (rows.length > 1) {
      const lastRow = rows[rows.length - 1];
      if (table.contains(lastRow)) {
        lastRow.remove();
      }
    }
  }
});