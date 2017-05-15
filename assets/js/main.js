function initTabs(){
  var tabs = document.getElementsByClassName("tabs__tab");
  for (var i=0; i<tabs.length; i++) {
    var tab = tabs[i];
    // add the active class to the first tab by default
    // TODO: let's implement URL hashes and make this show the correct hash
    if (i == 0) {
      tab.classList.add("active");
    }
    tab.addEventListener('click', function(e) {
      showActiveTab(e, this);
    }, false);
  };
};

function initTabContent(){
  var contentPanels = document.getElementsByClassName("tabs__content");
  //hide h2
  contentPanels[0].children.item('h2').classList.add('hidden');
  // skip the first panel so it shows by default -- elem 0 is a text node
  // TODO: let's implement URL hashes and make this show the correct hash
  for (var i=1; i<contentPanels.length; i++) {
    contentPanels[i].classList.add("hidden");
  };
};

function showActiveTab(e, tab) {
  e.preventDefault();

  var nodes = tab.parentNode.children;
  for (var i in nodes){
    var node = nodes[i];
    // if it's not a text node and not the current node and has the active class
    if(node.nodeType === 1 && node != tab && node.classList.contains("active")){
      node.classList.remove("active");
    }
  };

  tab.classList.add("active");
  showActivePanel(tab.getAttribute('href'));
};

function showActivePanel(href) {
  // remove the pound sign from the front of the ID
  var currentPanel = document.getElementById(href.slice(1));
  var nodes = document.getElementsByClassName("tabs__content");
  for (var i in nodes){
    var node = nodes[i];
    // explicitly hide the panels with JS so all of them show if JS isn't active
    if(node.nodeType === 1 && node != currentPanel){
      node.classList.add("hidden");
    }
  };
  currentPanel.classList.remove("hidden");
  // hide the h2 so the nav functions as a label instead
  currentPanel.children.item('h2').classList.add('hidden');
}

initTabs();
initTabContent();
