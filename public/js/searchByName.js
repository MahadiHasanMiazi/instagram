window.onclick = function(event) {
    $(".ajaxSuggestion").css("visibility", "hidden");
};



function searchUserByName(name) {

    if (name.length!=0) {

        var searchResult = "";

        $.ajax({
            url: '/ajax/searchByname/' + name
        }).done(function (data) {

            if (data.length!=0) {

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
            }else{

                searchResult += "<tr style='color: red'>" +

                    "<td colspan='2' style='text-align: center'>No Result Found</td>" +

                    + " </tr> ";

            }

            $('.ajaxSuggestionTable').html(searchResult);


            $(".ajaxSuggestion").css("visibility", "visible");

        });

    }

}