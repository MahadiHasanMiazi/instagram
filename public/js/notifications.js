function showNotificaions(user_id) {

    $('#notification-latest').toggle();

    var notificationShow="";


    var unreadNotifications = [];


    $.ajax({
        url: '/notification/showNotification'
    }).done(function (data) {

        for(var i=0; i<data.length;i++){
            if (data[i].user_id==user_id){
            if (data[i].notified_by!=user_id){
            if (data[i].status==0){

                unreadNotifications.push(data[i].id);

                 notificationShow +=
                "<tr  class='notification-item' style='background-color: greenyellow'>" +
                "<td><a href='/profile/"+data[i].notified_by+"'><img style='height: 40px; width: 40px' src="+data[i].image+"></a></td>"+
                "<td><a style='color: blue' href='/profile/"+data[i].notified_by+"'>"+data[i].name+"</a></td>"+
                "<td> <a style='color: black' href='/post/"+data[i].post_id+"'>"+data[i].subject+"<span style='color: red; padding-left: 10px'>"+data[i].info+"</span></a></td>"+
                "<td>"+data[i].time+"</td>"+
                "</tr>";
            }else{
                notificationShow +=
                    "<tr  class='notification-item'>" +
                    "<td><a href='/profile/"+data[i].notified_by+"'><img style='height: 40px; width: 40px' src="+data[i].image+"></a></td>"+
                    "<td><a style='color: blue' href='/profile/"+data[i].notified_by+"'>"+data[i].name+"</a></td>"+
                    "<td> <a style='color: black' href='/post/"+data[i].post_id+"'>"+data[i].subject+"<span style='color: red; padding-left: 10px'>"+data[i].info+"</span></a></td>"+
                    "<td>"+data[i].time+"</td>"+
                    "</tr>";
            }
            }
            }
        }



        if (notificationShow.length==0){
            notificationShow =
            "<tr  style='color: blue' class='notification-item'>" +
            "<td style='text-align: center' colspan='3'>No Notifications</td>"+
            "</tr>";
        }

        $("#notification-latest-updated").html(notificationShow);

        console.log(unreadNotifications);

        if(unreadNotifications.length!=0) {

            for (var k = 0; k < unreadNotifications.length; k++) {

                $.ajax({
                    type: "POST",
                    data: {unReadNo: unreadNotifications},
                    url: "/notification/unreadNotifications" + unreadNotifications[k]
                }).done(function (data) {
                    // alert(data);
                });

            }
        }

        countNotifications();

    });


}

function countNotifications() {

    var user_id = $('#loggedUserId').val();
    var totalNotification=0;


    $.ajax({
        url: '/notification/countNotifications'
    }).done(function (data) {

        for(var i=0; i<data.length;i++){
            if (data[i].user_id==user_id){
                if (data[i].notified_by!=user_id){
                totalNotification+=1;
            }
            }
        }

        $("#notification-count").html(totalNotification);


    });


}

$(document).ready(function() {
        countNotifications();
});


// onclick='fromNotiToPost("+data[i].post_id+")'//