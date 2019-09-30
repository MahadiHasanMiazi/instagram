function followerlistModal(){

var modal = document.getElementById('followerlistModal');
var modal2 = document.getElementById('followinglistModal');
// Get the button that opens the modal
   // var btn = document.getElementById("postEditButton");

// Get the <span> element that closes the modal
    var span = document.getElementById("close2");
    
        // alert("ASDasd");
        // return;
// When the user clicks the button, open the modal
 modal2.style.display = "none";
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
function followinglistModal(){

var modal = document.getElementById('followinglistModal');
var modal2 = document.getElementById('followerlistModal');
// Get the button that opens the modal
   // var btn = document.getElementById("postEditButton");

// Get the <span> element that closes the modal
    var span = document.getElementById("close3");

        // alert("ASDasd");
        // return;
// When the user clicks the button, open the modal
 modal2.style.display = "none";
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