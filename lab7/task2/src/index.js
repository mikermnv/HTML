window.onhashchange=switchToStateFromURLHash;

var SPAState={};

function switchToStateFromURLHash() {
  var URLHash=window.location.hash;

  var stateStr=URLHash.substr(1);

  if ( stateStr!="" ) {
    SPAState = { pagename: stateStr };
  }
  else{
    SPAState={pagename:'Main'};
  }
  var pageHTML="";
  switch ( SPAState.pagename ) {
    case 'Main':
      pageHTML+="<h3>News</h3>";
      pageHTML+="<p>Top console - Xbox 360</p>";         
      break;
    case 'Games':
      pageHTML+="<h3>Games</h3>";
      LoadGameData();
      break;
  }
  document.getElementById('IPage').innerHTML =pageHTML;
}

function switchToState(newState) {
  location.hash=newState.pagename;
}

function switchToMainPage() {
  switchToState( { pagename:'Main' } );
}

function switchToGamesPage() {
  switchToState( { pagename:'Games' } );
}

function LoadGameData() {
  $.ajax("http://localhost:3000/download/game.json",
      { 
       type:'GET', 
        dataType:'json', 
        success: DataLoaded,
        error:ErrorHandler 
      }
    );
  }

function DataLoaded(gameData)
{
  var tableHTML = "<table><thead><tr><th>Title</th><th>Description</th></tr></thead><tbody>";
  for (var gameName in gameData) {
    if (gameData.hasOwnProperty(gameName)) {
      tableHTML += "<tr><td>" + gameName + "</td><td>" + gameData[gameName] + "</td></tr>";
    }
  }
  tableHTML += "</tbody></table>";
  document.getElementById('IPage').innerHTML += tableHTML;
}

function ErrorHandler(qXHR,StatusStr,ErrorStr)
{
  alert(StatusStr+' '+ErrorStr);
}

switchToStateFromURLHash();