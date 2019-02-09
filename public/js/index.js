// Get references to page elements
var $username = $("#input-username");
var $balance = $("#input-balance");
var $income = $("#input-income");
var $goaldescr = $("#input-goaldescr");
var $goalamount = $("#input-goalamount");

var $submitBtn = $("#submit");
var $financialsList = $("#financials-list");

// The API object contains methods for each kind of request we'll make
var API = {
  getUsers: function() {
    return $.ajax({
      url: "api/users",
      type: "GET"
    });
  },
  saveUsers: function(users) {
    // console.log("\n\n Running API.saveUsers function.\n");
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "api/users",
      data: JSON.stringify(users)
    });
  },
  saveFinancials: function(financials) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "api/financials",
      data: JSON.stringify(financials)
    });
  },
  getFinancials: function() {
    return $.ajax({
      url: "api/financials/" + id,
      type: "GET"
    });
  },
  deleteFinancials: function(id) {
    return $.ajax({
      url: "api/financials/" + id,
      type: "DELETE"
    });
  }
};

// refreshUsers gets new financials from the db and repopulates the list
var refreshUsers = function() {
  API.getUsers().then(function(data) {
    var $users = data.map(function(users) {
      var $a = $("<a>")
        .text(users.id + " " + users.username + " " + users.balance)
        .attr("href", "/users/" + users.id);

      var $li = $("<li>")
        .attr({
          class: "list-group-item",
          "data-id": users.id
        })
        .append($a);

      var $button = $("<button>")
        .addClass("btn btn-danger float-right delete")
        .text("ｘ");

      $li.append($button);

      return $li;
    });

    $financialsList.empty();
    $financialsList.append($users);
  });
};

// handleFormSubmit is called whenever we submit a new financials
// Save the new financials to the db and refresh the list
var handleFormSubmit = function(event) {
  event.preventDefault();

  var users = {
    username: $username.val().trim(),
    goaldescr: $goaldescr.val().trim(),
    goalamount: $goalamount.val().trim()
  };

  var financials = {
    balance: $balance.val().trim(),
    income: $income.val().trim(),
    userid: 0
  };

  if (!(users.username && financials.balance)) {
    alert("You must enter your username and balance!");
    return;
  }

  var newID;
  API.saveUsers(users).then(function(x) {
    newID = x.id;
    console.log("new user ID is " + newID);

    financials.userid = newID;
    console.log(financials.userid);

    API.saveFinancials(financials).then(function(x) {
      console.log("Running API.saveFinancials(financials)");
      console.log("new financial entry ID is " + x.id);
    });

  });

  $username.val("");
  $balance.val("");
  $income.val("");
  $goaldescr.val("");
  $goalamount.val("");

  // SOMEHOW GO TO HOME PAGE OR BETTER YET, THE NEW PERSON'S PAGE
};

// handleDeleteBtnClick is called when an financials's delete button is clicked
// Remove the financials from the db and refresh the list
var handleDeleteBtnClick = function() {
  var idToDelete = $(this)
    .parent()
    .attr("data-id");

  API.deleteFinancials(idToDelete).then(function() {
    refreshUsers();
  });
};

// Add event listeners to the submit and delete buttons
$submitBtn.on("click", handleFormSubmit);
$financialsList.on("click", ".delete", handleDeleteBtnClick);

<<<<<<< HEAD
=======

>>>>>>> 1b5dcdd5f3e42655f45d84bf9e9ecd2bcdef8a1a
// Input field
var $updatebalance = $("#update-balance");

// Button
var $submitBtnUpdateBudget = $("#submit-update-budget");

var handleFormSubmit = function(event) {
  event.preventDefault();

  var newBalance = {
    balance: $updatebalance.val().trim()
  };

  console.log("newbal is !!!!!!!!!!!" + newBalance.balance);

  // if (!newBalance) {
  //   alert("You must enter your username and balance!");
  //   return;
  // }

<<<<<<< HEAD
=======

>>>>>>> 1b5dcdd5f3e42655f45d84bf9e9ecd2bcdef8a1a
  API.saveUsers(users).then(function(x) {
    newID = x.id;
    console.log("new user ID is " + newID);

    financials.userid = newID;
    console.log(financials.userid);

    API.saveFinancials(financials).then(function(x) {
      console.log("Running API.saveFinancials(financials)");
      console.log("new financial entry ID is " + x.id);
      refreshUsers();
    });
  });

  $updatebalance.val("");

  location.reload();
};

$submitBtnUpdateBudget.on("click", handleFormSubmit);
