

function AdminpassCheck() {
  
    var userPass = document.getElementById("password").value;
    var oldPass = document.getElementById("oldPassword").value;
    var newPass = document.getElementById("newPassword").value;
    var confirmPass = document.getElementById("confirmPassword").value;
    var oldError = document.getElementById("oldError");
    var newError = document.getElementById("newError");

    var confirmError = document.getElementById("confirmError");

   var form=document.getElementById("form");
  
   if(userPass !=oldPass){
    oldError.innerHTML="Old password does not match";
     
   }else{
   if(newPass==null || newPass.length==0){

   newError.innerHTML="field can not be null";
    oldError.innerHTML="";
   }else{
     if(newPass != confirmPass ){
      confirmError.innerHTML="Password does not match with new password";

oldError.innerHTML="";
      newError.innerHTML="";
     }
     else{
      form.submit();
     }
   }
   }

}
/*oldError.innerHTML="Old password does not match";
if(newPass !=null && newPass==confirmPass){

        //form.submit();
     }else{
        confirmError.innerHTML="Password does not match";
    }  alert("new pass can not be null");
 */