window.onhashchange=switchToStateFromURLHash;

var SPAState={};

function switchToStateFromURLHash() {
  var URLHash=window.location.hash;

  var stateStr=URLHash.substr(1);

  if ( stateStr!="" ) {
    var parts=stateStr.split("_")
    SPAState={ pagename: parts[0] };
  }
  else
    SPAState={pagename:'Main'};

  var pageHTML="";
  switch ( SPAState.pagename ) {
    case 'Main':
      pageHTML+="<h3>Main page</h3>";
      pageHTML+="<p>Top game - Gamecenter</p>";         
      break;
    case 'About':
      pageHTML+="<h3>About</h3>";
      pageHTML+="<p>Information about our company</p>";
      break;
  }
  document.getElementById('IPage').innerHTML=pageHTML;
}

function switchToState(newState) {
  location.hash=newState.pagename;
}

function switchToMainPage() {
  switchToState( { pagename:'Main' } );
}

function switchToAboutPage() {
  switchToState( { pagename:'About' } );
}

switchToStateFromURLHash();