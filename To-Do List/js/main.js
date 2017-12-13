let submit = $("#submit");
let newtaskfield = $("#newtask");
let pendingcontainer = $("#pending-container");
let completedcontainer = $("#completed-container");

$(submit).click(function(event) {
  let taskTitle = $(newtaskfield).val();
  $("<div>")
    .attr("class", "task")
    .append(
      $("<div>")
        .attr("class", "ui-checkbox")
        .append(
          $("<input>")
            .attr("type", "checkbox")
            .attr("class", "")
        )
    )
    .append(
      $("<li>")
        .attr("class", "task-title")
        .html(taskTitle)
    )
    .append(
      $("<button>")
        .attr("class", "remove ui-btn ui-shadow ui-corner-all")
        .html("Remove")
    )
    .appendTo($(pendingcontainer));

  $(newtaskfield).val("");
  event.preventDefault();
});

$(document).on("click", ".remove", function() {
  $(this)
    .parent()[0]
    .remove();
});

$(document).on("click", ":checkbox", function() {
  let taskdiv = $(this).parents()[1];
  let containerdiv = $(this).parents()[2].id;
  if (containerdiv == "pending-container") {
    $(taskdiv)
      .addClass("completed")
      .appendTo($(completedcontainer));
  } else {
    $(taskdiv)
      .addClass("pending")
      .appendTo($(pendingcontainer));
  }
});
