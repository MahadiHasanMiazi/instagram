var db = require('./db');

module.exports = {
    getConversation: function(user, user2, callbackFromController){
        var sql = "SELECT * FROM `inbox` WHERE sender_id=? AND receiver_id=? UNION SELECT * FROM `inbox` WHERE sender_id=? AND receiver_id=? ORDER BY time";
        db.execute(sql, [user.sender, user.receiver, user2.sender, user2.receiver], function (result){
            callbackFromController(result);
        });

    },
    insert: function(msg, from, to, callbackFromController){
        var sql = "INSERT INTO `inbox` ( `sender_id`, `receiver_id`, `message`, `time`) VALUES (?, ?, ?, NOW())";
        db.execute(sql, [from, to, msg], function (result){
            callbackFromController(result);
        });
    }
};