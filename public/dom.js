const anyRadio = $("#anyCatagory");
const customRadio = $("#cusomeCatagory");
const multiCheckbox = $(".catagories");
const blacklist = $(".blacklist");
const dropdown = $("#dropdown");

let selectedCatagories = [];
let colecBlacklist = [];
let language = dropdown.val();

anyRadio.prop("checked", true);
multiCheckbox.prop({ checked: false, disabled: true });

anyRadio.change(() => {
  if (anyRadio.prop("checked")) {
    multiCheckbox.prop({ checked: false, disabled: true });
  }
  selectedCatagories = [];
});

customRadio.change(() => {
  if (customRadio.prop("checked")) {
    multiCheckbox.prop({ checked: false, disabled: false });
  }
  console.log(selectedCatagories);
});

multiCheckbox.change(function () {
  if ($(this).prop("checked")) {
    selectedCatagories.push($(this).attr("value"));
  } else {
    var i = selectedCatagories.indexOf($(this).attr("value"));
    selectedCatagories.splice(i, 1);
  }
  console.log(selectedCatagories);
});

blacklist.change(function () {
  if ($(this).prop("checked")) {
    colecBlacklist.push($(this).attr("value"));
  } else {
    var i = colecBlacklist.indexOf($(this).attr("value"));
    colecBlacklist.splice(i, 1);
  }
  console.log(colecBlacklist);
});

dropdown.change(function () {
  language = dropdown.val();
});

$("#submit").click(function () {
  $("#selectedCatagories").val(JSON.stringify(selectedCatagories));
  $("#colecBlacklist").val(JSON.stringify(colecBlacklist));
  $("#language").val(language);
});

setTimeout(() => {
  $("#delivery").css("display", "block");
}, 4000);
// $("#submit").click(function () {
//   $.ajax({
//     url: "/joke",
//     method: "POST",
//     contentType: "application/json",
//     data: JSON.stringify({
//       selectedCatagories: selectedCatagories,
//       colecBlacklist: colecBlacklist,
//       language: language,
//     }),
//     success: function (data) {
//       console.log("Success:", data);
//     },
//     error: function (error) {
//       console.error("Error:", error);
//     },
//   });
// });
