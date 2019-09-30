window.onclick = function(event) {
    $(".ajaxSuggestion").css("visibility", "hidden");
};


function submitComment(postIndex,user_id,name,image_path) {

    image_path=image_path.replace("/assetsimagesprofile", "/assets/images/profile/");

    var form = $('.commentSubmit').eq(postIndex);

    // $(document).on('submit',form,function(ev){

    $(document).unbind('submit').bind('submit',form,function(ev) {
        // do stuff here...

        ev.preventDefault();

            var formData = form.serialize();
            $.ajax({
                method: 'POST',
                url: form.attr('action'),
                data: formData
            }).done(function (data) {

                $.ajax({
                    url: '/ajax/getLastInsertedCommentAndUserDetails',
                    data: formData
                }).done(function (data) {


                    var newCommment = "<tr id='singleComment"+data[0].id+"'>" +

                        "<td style='width: 40px'><a href=" + 'profile/' + data[0].user_id + "><img  style='height: 40px;width: 40px; border-radius: 50%; margin-left: 10px;' src='"+data[0].imagePath+"'><p style='text-align: center'>"+data[0].name+"</p> </a> </td>" +

                        "<td>" + data[0].comment + "</td>" +

                        "<td style='width: 60px; font-size: smaller'>" + data[0].time + "</td>"

                        +"<td style='width: 25px'><button onclick='commentEdit("+""+data[0].id+""+")' id='commentEdit"+data[0].id+"'   style='width: 74px' class='button is-info'>Edit</button>" +
                        "<button id='deleteComment"+data[0].id+"' onclick='deleteCommentModal("+'"'+data[0].comment+'"'+","+'"'+data[0].id+'"'+")'    class='button is-danger'>Delete</button>" +
                        "</td>"
                        + " </tr> ";



                    var commentModal=

                    "<div class='modal commentDeleteModal' id='commentDeleteModal"+data[0].id+"'>"+
                    "<div class='modal-content'>"+
                    "<div class='modal-header commentDeleteHeader'>"+

                    "<span class='closeCommentDelete' id='closeCommentDelete"+data[0].id+"'>&times;</span>"+

                    "<h2 style='background-color: red; color: white; height: 40px; width: 100%'>Delete Post</h2>"+

                    "<p class='deleteConfirmation' style='color: black'>Do u want to delete this comment?</p>"+

                    "<h2 id='showCommentToDelete"+data[0].id+"'  style='color: green; margin-top: -40px; padding-bottom: 20px; text-align: center'></h2>"+

                    " <li class='confirmButton'><input  class='postSubmit button is-danger' type='submit' onclick='submitDeleteComment("+""+data[0].id+""+")' value='Confirm'></li>"+

                    "</div>";


              var commentEditBox=

                        "<div id='commentEditBox"+data[0].id+"'  style='display: none;'>"+
                        "<form id='commentEditForm"+data[0].id+"' action='/ajax/submitEditedComment' onsubmit='submitEditedComment("+""+data[0].id+""+")'>"+
                        "<td colspan='4'><input class='is-fullwidth' id='commentInputBox"+data[0].id+"' style='width: 900%; height: 40px; font-size: large; background-color: lightcoral' name='editedComment' type='text'></td>"+
                        "</div>";


                    $('#ajaxNewCommentInsert' + postIndex).append(newCommment);
                    $('#ajaxNewCommentInsert' + postIndex).append(commentEditBox);
                    $('#ajaxNewCommentInsert' + postIndex).append(commentModal);


                    $('input[name="comment"]').eq(postIndex).val("");

                });

            });

    });


}

function react(post_id) {


    $.ajax({
        url: '/react/'+post_id
    }).done(function (data) {
        // alert(data);
    });

}

function hideShow(post_react) {

    var post_id= post_react.replace(/[^\d.-]/g, '');

    var postReactedId = 'postReactedId'+post_id;
    var postUnreactedId= 'postUnreactedId' +post_id;

    var reaction = 'reaction'+post_id;



    var unlike = '<a id='+postUnreactedId+' onclick="react('+"'"+post_id+"'"+'),hideShow('+"'"+postUnreactedId+"'"+')" style="color: red"><i class="fa fa-heart-o" aria-hidden="true"></i></a>';
    var like = '<a id='+postReactedId+' onclick="react('+"'"+post_id+"'"+'),hideShow('+"'"+postReactedId+"'"+')" style="color: red"><i class="fa fa-heart" aria-hidden="true"></i></a>';



    if (post_react.includes("postReactedI")){
        $("#"+reaction).html(unlike);
        $("#totalLikes"+post_id).html(parseInt($("#totalLikes"+post_id).text())-1);
    }else{
        $("#"+reaction).html(like);
        $("#totalLikes"+post_id).html(parseInt($("#totalLikes"+post_id).text())+1);
    }

}

function searchUserByName(name) {

    if (name.length != 0) {

        var searchResult = "";

        $.ajax({
            url: '/ajax/searchByname/' + name
        }).done(function (data) {

            if (data.length != 0) {

                for (var i = 0; i < data.length; i++) {

                    if (i < 5) {

                        searchResult += "<tr>" +

                            "<td><a href=" + '/profile/' + data[i].id + ">" + "<img src=" + data[i].imagePath + ">" + "</a></td>" +

                            "<td><a href=" + '/profile/' + data[i].id + ">" + data[i].name + "</a></td>"

                            + " </tr> ";
                    } else {
                        break;
                    }
                }
            } else {

                searchResult += "<tr style='color: red'>" +

                    "<td colspan='2' style='text-align: center'>No Result Found</td>" +

                    +" </tr> ";

            }

            $('.ajaxSuggestionTable').html(searchResult);


            $(".ajaxSuggestion").css("visibility", "visible");

        });

    }

}

function getLikeDetails(post_id) {




    var likeDetails="";

    $.ajax({
        url: '/ajax/totalLikeDetails/'+post_id
    }).done(function (data) {
        for(var i=0;i<data.length;i++){

        likeDetails += "<tr>" +

                    "<td><a href=" + 'profile/' + data[i].user_id + ">" + "<img src=" + data[i].imagePath + ">" + "</a></td>" +

                    "<td><a href=" + 'profile/' + data[i].user_id+ ">" + data[i].name + "</a></td>"

                    + " </tr> ";
        }

            $("#totalLikeDetails"+post_id).html(likeDetails);

            $("#totalLikeDetails"+post_id).toggle(500);
    });



}

function reportSubmit(post_id) {

    var form = $('#reportPost'+post_id);


    $(document).unbind('submit').bind('submit',form,function(ev) {
        // do stuff here...

        ev.preventDefault();

        var formData = form.serialize();
        $.ajax({
            method: 'POST',
            url: form.attr('action'),
            data: formData
        }).done(function (data) {
            // alert(data);
        });

    });

    $("#modal"+post_id).hide();


}

function commentEdit(comment_id) {

    $('#commentEditBox'+comment_id).toggle(500);

    var commentForEdit= "";
    $.ajax({
        url: '/ajax/getCommentByCommentId/'+comment_id
    }).done(function (data) {
        commentForEdit=data[0].comment;

        $("#commentInputBox"+comment_id).val(commentForEdit);
    });

}

function submitEditedComment(comment_id) {




    var form = $('#commentEditForm'+comment_id);
    var editedComment= "";


    $(document).unbind('submit').bind('submit',form,function(ev) {
        // do stuff here...

        ev.preventDefault();

        var formData = form.serialize();
        $.ajax({
            method: 'POST',
            url: form.attr('action')+'/'+comment_id,
            data: formData
        }).done(function (data) {


            $.ajax({
                url: '/ajax/getUserAndCommentDetailsBycommentId/'+comment_id
            }).done(function (data) {


              editedComment ="<td style='width: 40px'><a href=" + 'profile/' + data[0].user_id + "><img  style='height: 40px;width: 40px; border-radius: 50%; margin-left: 10px;' src='"+data[0].imagePath+"'><p style='text-align: center'>"+data[0].name+"</p> </a> </td>" +

                    "<td>" + data[0].comment + "</td>" +

                    "<td style='width: 60px; font-size: smaller'>" + data[0].time + "</td>"

                    +"<td style='width: 25px'><button onclick='commentEdit("+""+data[0].id+""+")' id='commentEdit"+data[0].id+"'   style='width: 74px' class='button is-info'>Edit</button>" +
                  "<button id='deleteComment"+data[0].id+"' onclick='deleteCommentModal("+'"'+data[0].comment+'"'+","+'"'+data[0].id+'"'+")'    class='button is-danger'>Delete</button>" +

                  "</td>"

                  ;


              $("#singleComment"+comment_id).html(editedComment);


            });


        });
    });

    $('#commentEditBox'+comment_id).toggle();

}

function submitDeleteComment(comment_id) {
    $.ajax({
        url: '/ajax/deleteComment/'+comment_id
    }).done(function (data) {

        $("#singleComment"+comment_id).hide();
        $("#commentDeleteModal"+comment_id).hide();
        $("#commentEditBox"+comment_id).hide();

    });
}


function getOnlineStatus(id) {
    $.ajax({
        url: '/ajax/getOnlineStatus/'+id
    }).done(function (data) {

        if(data === "false"){
            $('#online-status').css('display','none');
            console.log("false");
        }else if(data === 'true'){
            $('#online-status').css('display','inline-block');
            console.log("true");
        }

    });
}



//
// function mentionInComment(name,post_id) {
//
//     if (name.length > 1) {
//
//        if (name.includes("@")){
//
//
//            name=name.split("@").pop();
//
//
//            var searchResult = "";
//
//            $.ajax({
//                url: '/ajax/searchByname/' + name
//            }).done(function (data) {
//
//
//
//                for (var i = 0; i < data.length; i++) {
//
//                    if (i < 5) {
//                        searchResult +=
//
//                            "<li id='mentionUser"+data[i].id+"' style='color: white' onclick='mentionName("+data[i].id+","+post_id+")'><span href=" + '/profile/' + data[i].id + ">" +
//                            "<img style='height: 40px; width: 40px; margin-right: 20px;' ' src=" + data[i].imagePath + ">" +
//                            "</span><span href="+'/profile/'+data[i].id+">"+data[i].name+"</span></li>";
//
//                    } else {
//                        break;
//                    }
//                }
//
//
//
//                $('#menTionInComment'+post_id).html(searchResult);
//
//                $('#menTionInComment'+post_id).css("display", "block");
//
//
//            });
//
//        }
//
//        }
//     }
//
// function mentionName(userId,post_id) {
//     var name = "<span style='background-color: red'>"+$('#mentionUser'+userId).text()+"</span>";
//
//
//     // var mention = "<a href=" + 'profile/' + userId + ">"+name+"</a>";
//
//
//     // $('#mentionInCmnt'+post_id).val($('#mentionInCmnt'+post_id).val()+name);
//     $('#mentionInCmnt'+post_id).val(name);
//     $('#menTionInComment'+post_id).hide();
//
//
// }


