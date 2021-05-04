const { Socket } = require("dgram");
const express = require("express");
const app = express();
const port = 3000;
const http = require("http");
const socketIo = require("socket.io");
const { CLIENT_RENEG_LIMIT } = require("tls");
app.set("view engine", "ejs");
app.use(express.static("public"));
const server = http.createServer(app);
const io = socketIo(server);

let arrayUser = [];
io.on("connection", (socket) => {
  console.log(socket.id + " vừa kết nối !");
  // io.sockets.emit("server-send", data); // gửi cho tất cả
  // socket.emit()  // gửi cho người gửi
  // socket.broadcast.emit()  // gửi cho tất cả trừ người gửi
  // io.to('socketID').emit()  // gửi riêng cho người có socketID
  // });
  socket.on("client-send-username", function (data) {
    if (arrayUser.indexOf(data) >= 0) {
      socket.emit("server-send-failLogin");
    } else {
      arrayUser.push(data);
      socket.userName = data;
      console.log(socket.id + " đăng nhập thành công");
      socket.emit("server-send-thanhcong", data);
      io.sockets.emit("server-send-arrayUser", arrayUser);
    }
  });
  socket.on("client-send-tinNhan", function (data) {
    io.sockets.emit("server-send-tinNhan", { nd: data, name: socket.userName });
  });
  socket.on("client-send-out", function () {
    arrayUser.splice(socket.userName, 1);
    io.sockets.emit("server-send-out", arrayUser);
  });
  socket.on("disconnect", function () {
    console.log(socket.id + " Vừa ngắt kết nối !");
  });
});

app.get("/", (req, res) => {
  res.render("chat.ejs");
});
server.listen(port, () => {
  console.log(`start server with port ${port}`);
});
