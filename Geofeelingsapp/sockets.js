/**
 * Created by Jelle on 15/01/2016.
 */

module.exports = function(io){
    io.sockets.on('connection', function(socket){
        console.log("sockets connected");

        socket.on('newMapPin', function(){
           io.sockets.emit("refreshMap");
        });
    });
};