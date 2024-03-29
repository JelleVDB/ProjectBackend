/**
 * Created by Jelle on 15/01/2016.
 */

module.exports = function (io) {
    io.sockets.on('connection', function (socket) {
        console.log("sockets.js connected");

        socket.on('newMapPin', function () {
            io.sockets.emit("refreshMap");
        });

        socket.on('message', function (message, sender) {
            io.sockets.emit("newMessage", message, sender);
        });
    });
};