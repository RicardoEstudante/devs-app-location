import socketio from 'socket.io-client';

const socket = socketio('https://dev-location-backend.herokuapp.com', {
    autoConnect: false,
});

function subscribeToNewDevs(subcribeFunction){
    socket.on('new-dev', subcribeFunction);
}

function connect(latitude, longitude, techs) {
    socket.io.opts.query = {
        latitude,
        longitude,
        techs,
    };

    socket.connect();
}

function disconect() {
    if(socket.connected){
        socket.disconect();
    }
}

export {
    connect,
    disconect,
    subscribeToNewDevs
}