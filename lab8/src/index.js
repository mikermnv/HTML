import { fromEvent } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import { map, switchMap } from 'rxjs/operators';

const showDataButton = document.getElementById('showData');
const deleteDataButton = document.getElementById('deleteData');
const dataContainer = document.getElementById('dataContainer');

fromEvent(showDataButton, 'click').pipe(
  switchMap(() => ajax.getJSON('http://localhost:3000/download/game.json')),
  map(gameData => {
    var tableHTML = "<table class='table'><thead><tr><th id='title-cell'>Title</th><th id='description-cell'>Description</th></tr></thead><tbody>";
    for (const [title, description] of Object.entries(gameData)) {
      tableHTML += `<tr><td>${title}</td><td>${description}</td></tr>`;
    }  
    tableHTML += "</tbody></table>";   
    return tableHTML;
  })
).subscribe(tableHTML => dataContainer.innerHTML = tableHTML);

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