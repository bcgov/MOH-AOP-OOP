
// Stuff to do when page loads
$(function () {

  $("#logout").on("click", logout);
  loadInfo();
});

const logout = function () {
  $.post("/api/logout")
    .then(res => {
      window.location.replace("/test/login");
    });
};

const loadInfo = function () {
  $.get("/api/userinfo")
    .then(res => {
      if (!res.display_name) {
        return window.location.replace("/test/login");
      }
      console.log(res.display_name);
      console.log(res.birthdate);
      $("#name").text(res.display_name);
      $("#dob").text(res.birthdate);
    })
    .catch(err => {
      console.log(err);
    });
};
