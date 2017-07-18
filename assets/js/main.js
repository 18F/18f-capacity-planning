function initTabs(year){
  var tabs = document.getElementsByClassName("tabs__tab");
  for (var i=0; i<tabs.length; i++) {
    var tab = tabs[i];
    // activate the tab indicated in the URL
    if (tab.getAttribute('href') == year) {
      tab.classList.add("active");
    }
    tab.addEventListener('click', function(e) {
      showActiveTab(e, this);
    }, false);
  };
};

function initTabContent(year){
  var selectedYear = year;
  var contentPanels = document.getElementsByClassName("tabs__content");
  for (var i=0; i<contentPanels.length; i++) {
    if (contentPanels[i].id != year.substr(1)) {
      contentPanels[i].classList.add("hidden");
    }
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
  // remove the pound sign from the front of the ID
  showActivePanel(tab.getAttribute('href').substr(1));
};

function showActivePanel(id) {
  var currentPanel = document.getElementById(id);
  var nodes = document.getElementsByClassName("tabs__content");
  for (var i in nodes){
    var node = nodes[i];
    // explicitly hide the panels with JS so all of them show if JS isn't active
    if(node.nodeType === 1 && node != currentPanel){
      node.classList.add("hidden");
    }
  };
  currentPanel.classList.remove("hidden");
  updateHash(id);
}

function updateHash(id) {
  if(history.pushState) {
      history.pushState(null, null, `#${id}`);
  }
  else {
      location.hash = `#${id}`;
  };
  resetRows();
}

function resetRows() {
  var people = document.getElementsByClassName("person");
  var totals = document.getElementsByClassName("filtered-total");
  for (var i in totals) {
    totals[i].innerText = ""
  }
  for (var i in people) {
    var person = people[i];
    person.classList.remove("hidden");
  }
}

function toggleOption(option) {
  var team = option.value;
  var people = document.getElementsByClassName("person");
  for (var i in people) {
    var person = people[i];
    try {
      if (!(person.classList.contains(team))){
        person.classList.add("hidden");
      } else {
        person.classList.remove("hidden")
      }
      if(team == 'all'){
        resetRows();
      }
  } catch (e) {
      console.log(e)
    }
  }
  if(team != 'all'){
    updateCount(team);
  } else {

  }
}

function updateCount(team) {
  var months = document.getElementsByClassName("monthsummary");
  for (var i in months) {
    try {
      var hidden = months[i].getElementsByClassName("hidden");
      var total = months[i].getElementsByClassName("person");
      var count = total.length - hidden.length;
      var total = months[i].getElementsByClassName("filtered-total")[0];
      var teamdisplay = displayNameFor(team);
      total.innerText = " - Including " + count + " in " + teamdisplay
    } catch (e) {
      console.log(e)
    }
  }
}

function displayNameFor(team) {
  var displaynames = {
    "strategy-branch": "the Strategy Chapter",
    "engineering-branch": "the Engineering Chapter",
    "product-branch": "the Product Chapter",
    "design-experience-branch": "the Design Chapter",
    "18f-products-&-platforms": "Products and Platforms",
    "learn-division": "Learn",
    "smarter-it-solutions-portfolio-division": "the Smarter IT portfolio division",
    "18f-infrastructure": "Infrastructure",
    "agency-partnerships-division": "Agency Partnerships",
    "18f-custom-partner-solutions": "Custom Partner Solutions",
    "18f-team-operations": "18F Tea Mops",
    "transformation-services-division": "Transformation Services"
  };
  try {
    return displaynames[team];
  } catch (e) {
    return team;
  }
}

domready(function(){
  if (window.location.hash == ''){
    var yearToggles = document.getElementsByClassName("tabs__tab");
    var oldestYear = yearToggles[0].getAttribute('href').substr(1);
    updateHash(oldestYear);
  }
  initTabs(window.location.hash);
  initTabContent(window.location.hash);
});
