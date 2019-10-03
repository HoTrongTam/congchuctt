var socket;
var notifyMessages = [];
var notifyMessagesCount = 0;
var fpt_notification = {
    connection: function(url, userid, appcode, appdevice) {
        socket = io.connect(url, {
            transports: ['websocket', 'polling', 'flashsocket']
        });
        socket.on('connect', function(data) {
            //var browserName = fpt_notification.getBrowser();
            socket.emit('storeClientInfo', {
                UserId: userid,
                AppCode: appcode,
                AppDevice: appdevice
            });
            socket.on('connected', function(msg) {
                console.log(msg);
            });
        });
    },
    getItem: function() {
        socket.on('push_item', function(msg) {
            notifyMessages.push(msg);
            //console.log(notifyMessages);
        });
    },
    getItemCount: function() {
        socket.on('push_count', function(msg) {
            console.log(msg.count);
            return msg.count;
        });
    },
    archive: function(userid, appcode, appdevice) {
        socket.emit('archive_message', {
            UserId: userid,
            AppCode: appcode,
            AppDevice: appdevice
        });
    },
    sendGetListItem: function(userid, appcode, appdevice, pageno, pagesize){
        socket.emit('get_list_item', {
            UserId: userid,
            AppCode: appcode,
            AppDevice: appdevice,
            PageNo: pageno,
            PageSize: pagesize
        });
    }

};