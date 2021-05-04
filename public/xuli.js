const socket = io("http://localHost:3000");

$(document).ready(function () {
  $("#giaodiendk").show(1000);
  $("#chat").hide(1000);
});
function dangNhap() {
  const userName = document.getElementById("userName").value;
  socket.emit("client-send-username", userName);
}
socket.on("server-send-failLogin", function () {
  alert("Tên đăng nhập đã tồn tại");
});
socket.on("server-send-thanhcong", function (data) {
  $("#giaodiendk").hide(1000);
  $("#chat").show(2000);
  $("#tenNguoiDung").html("Xin Chào , " + data);
});
socket.on("server-send-arrayUser", function (data) {
  $("#tenNguoiOn").html(" ");
  data.forEach((i) => {
    $("#tenNguoiOn").append("<div id='on'>" + i + "</div>");
  });
});

function send() {
  let tinNhan = document.getElementById("msg").value;
  socket.emit("client-send-tinNhan", tinNhan);
}
socket.on("server-send-tinNhan", function (data) {
  $("#hopDungThu").append(
    "<p id='vanBan'>" + data.name + ": " + data.nd + "</p>"
  );
});

function logout() {
  $("#giaodiendk").show(2000);
  $("#chat").hide(1000);
  socket.emit("client-send-out");
}
socket.on("server-send-out", function (data) {
  $("#tenNguoiOn").html(" ");
  data.forEach((i) => {
    $("#tenNguoiOn").append("<div id='on'>" + i + "</div>");
  });
});
