function    postEdit(index) {
    var postEditMenu = document.getElementsByClassName("postEditMenu")[index];


   if (postEditMenu.style.visibility!="visible"){
        postEditMenu.style.visibility = "visible";
   }
   else{
       postEditMenu.style.visibility = "hidden";
   }

    hideOthers(index);

}

    function hideOthers(index) {
        var postEditMenu = document.getElementsByClassName("postEditMenu");
        for(var i=0;i<postEditMenu.length;i++){
            if (i!=index){
                postEditMenu[i].style.visibility = "hidden";
            }
        }
    }



function editPostModal(index) {
    var modal = document.getElementsByClassName('postEditModal')[index];

// Get the button that opens the modal
    var btn = document.getElementsByClassName("postEditButton")[index];

// Get the <span> element that closes the modal
    var span = document.getElementsByClassName("exit")[index];

        // alert("ASDasd");
        // return;
// When the user clicks the button, open the modal

   modal.style.display = "block";


// When the user clicks on <span> (x), close the modal
    span.onclick = function() {
        modal.style.display = "none";
    }

// When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
}


function deletePost(index){

    var modal = document.getElementsByClassName('postDeleteModal')[index];

// Get the button that opens the modal
    var btn = document.getElementsByClassName("postDeleteButton")[index];

// Get the <span> element that closes the modal
    var span = document.getElementsByClassName("closeDelete")[index];

    // var deletePostForm = document.getElementsByClassName("deletePost")[index];

// When the user clicks the button, open the modal

        modal.style.display = "block";


// When the user clicks on <span> (x), close the modal
    span.onclick = function() {
        modal.style.display = "none";
    }
    // deletePostForm.submit();

// When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }

}


function reportPost(index){

    var modal = document.getElementsByClassName('postReportModal')[index];

// Get the button that opens the modal
    var btn = document.getElementsByClassName("postReportButton")[index];

// Get the <span> element that closes the modal
    var span = document.getElementsByClassName("closeReport")[index];

    // var deletePostForm = document.getElementsByClassName("deletePost")[index];

// When the user clicks the button, open the modal

    modal.style.display = "block";


// When the user clicks on <span> (x), close the modal
    span.onclick = function() {
        modal.style.display = "none";
    }
    // deletePostForm.submit();

// When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }

}


function deleteCommentModal(comment,comment_id) {




    // var modal = document.getElementsByClassName('commentDeleteModal')[index];
    var modal = $('#commentDeleteModal'+comment_id);



// Get the <span> element that closes the modal
    var span = $('#closeCommentDelete'+comment_id);


    // var deletePostForm = document.getElementsByClassName("deletePost")[index];

// When the user clicks the button, open the modal


    $("#showCommentToDelete"+comment_id).html(comment);

    modal.css("display", "block");


// When the user clicks on <span> (x), close the modal

    $(span).click(function(){
        modal.css("display", "none");
    });

    // deletePostForm.submit();

// When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }

}