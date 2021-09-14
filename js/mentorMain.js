// xxxxxxxxxx Working For Sign Up Form xxxxxxxxxx
// xxxxxxxxxx Full Name Validation xxxxxxxxxx
function checkMentorFullName() {
    var userFullName = document.getElementById("mentorFullName");
    var flag = false;
    if (mentorFullName === "") {
        flag = true;
    }
    if (flag) {
        document.getElementById("userFullNameError").style.display = "block";
    } else {
        document.getElementById("userFullNameError").style.display = "none";
    }
}
// xxxxxxxxxx Email Validation xxxxxxxxxx
function checkMentorEmail() {
    var userEmail = document.getElementById("mentorEmail");
    var userEmailFormate = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    var flag;
    if (userEmail.value.match(userEmailFormate)) {
        flag = false;
    } else {
        flag = true;
    }
    if (flag) {
        document.getElementById("userEmailError").style.display = "block";
    } else {
        document.getElementById("userEmailError").style.display = "none";
    }
}
// xxxxxxxxxx Password Validation xxxxxxxxxx
function checkMentorPassword() {
    var userPassword = document.getElementById("mentorPassword");
    var userPasswordFormate = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{10,}/;
    var flag;
    if (userPassword.value.match(userPasswordFormate)) {
        flag = false;
    } else {
        flag = true;
    }
    if (flag) {
        document.getElementById("userPasswordError").style.display = "block";
    } else {
        document.getElementById("userPasswordError").style.display = "none";
    }
}
// xxxxxxxxxx Limiting check box selection xxxxxxxxxx
function checkBoxLimit() {
    var checkBoxGroup = document.forms['form_name']['check[]'];
    var limit = 3;
    for (var i = 0; i < checkBoxGroup.length; i++) {
        checkBoxGroup[i].onclick = function () {
            var checkedcount = 0;
            for (var i = 0; i < checkBoxGroup.length; i++) {
                checkedcount += (checkBoxGroup[i].checked) ? 1 : 0;
            }
            if (checkedcount > limit) {
                console.log("You can select maximum of " + limit + " checkboxes.");
                alert("You can select maximum of " + limit + " checkboxes.");
                this.checked = false;
            }
        }
    }
}
// xxxxxxxxxx Limiting check box selection xxxxxxxxxx
function checkCheckbox() {
    var yes = document.getElementById("myCheck1");
    var no = document.getElementById("myCheck2");
    if (yes.checked == true && no.checked == true) {
        return document.getElementById("error").innerHTML = "Please mark only one checkbox either Yes or No";
    } else if (yes.checked == true) {
        var y = document.getElementById("myCheck1").value;
        return document.getElementById("result").innerHTML = y;
    } else if (no.checked == true) {
        var n = document.getElementById("myCheck2").value;
        return document.getElementById("result").innerHTML = n;
    } else {
        return document.getElementById("error").innerHTML = "*Please mark any of checkbox";
    }
}
// xxxxxxxxxx Getting Data from checkboxes xxxxxxxxxx

// xxxxxxxxxx Submitting and Creating new user in firebase authentication xxxxxxxxxx
function MentorSignUp() {
    var mentorFullName = document.getElementById("mentorFullName").value;
    var mentorEmail = document.getElementById("mentorEmail").value;
    var mentorPassword = document.getElementById("mentorPassword").value;
    var userFullNameFormate = /^([A-Za-z.\s_-])/;
    var userEmailFormate = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    var userPasswordFormate = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{10,}/;

    var checkUserFullNameValid = mentorFullName.match(userFullNameFormate);
    var checkUserEmailValid = mentorEmail.match(userEmailFormate);
    var checkUserPasswordValid = mentorPassword.match(userPasswordFormate);

    var markedCheckbox = document.querySelectorAll('input[type="checkbox"]:checked');
    var skillList = [];
    var skillstring = "";

    if (checkUserFullNameValid == null) {
        return checkMentorFullName();
    } else if (checkUserEmailValid == null) {
        return checkMentorEmail();
    } else if (checkUserPasswordValid == null) {
        return checkMentorPassword();
    } else {
        auth.createUserWithEmailAndPassword(mentorEmail, mentorPassword).then((success) => {
            var user = auth.currentUser;
            var uid;
            if (user != null) {
                uid = user.uid;
            }
            var firebaseRef = firebase.database().ref();
            var userData = {
                userFullName: mentorFullName,
                userEmail: mentorEmail,
                userPassword: mentorPassword,
            }
            //var mentorRef = database.ref("/MentorSkills/" + uid).push
            // console.log(mentorRef);
            // firebase.database().ref("/MentorSkills/" + uid).set({name: "dummystring"});
            // for (var checkbox of markedCheckbox) {
            //     //skillList.push(checkbox.value);
            //     mentorRef.push({
            //         skillName: checkbox.value
            //     })
            //     console.log(checkbox.value);
            // }
            function chkBoxSubmit() {
                var selChkBox = document.querySelectorAll("input[type=checkbox]:checked");
                console.log(selChkBox);
                for (var c of selChkBox) {
    
                    firebase.database().ref("Skills/" + "111").push({
                        name: c.value
                    });
                    firebaseRef.child("Skills").child("222").push({
                        name: c.value
                    });
                }
            }
            firebaseRef.child("Mentor").child(uid).set(userData);
            swal('Your Account Created', 'Your account was created successfully, you can log in now.', ).then((value) => {
                setTimeout(function () {
                    window.location.replace("../pages/SignIn.html");
                }, 1000)
            });
        }).catch((error) => {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            swal({
                icon: 'error',
                title: 'Error',
                text: errorMessage,
            })
        });
    }
}
// xxxxxxxxxx Working For Profile Page xxxxxxxxxx
// xxxxxxxxxx Get data from server and show in the page xxxxxxxxxx
// auth.onAuthStateChanged((user) => {
//     if (user) {
//         //   User is signed in.
//         let user = auth.currentUser;
//         let uid
//         if (user != null) {
//             uid = user.uid;
//         }
//         let firebaseRefKey = firebase.database().ref().child(uid);
//         firebaseRefKey.on('value', (dataSnapShot) => {
//             document.getElementById("userPfFullName").innerHTML = dataSnapShot.val().userFullName;
//             // userEmail = dataSnapShot.val().userEmail;
//             // userPassword = dataSnapShot.val().userPassword;
//             document.getElementById("userPfFb").setAttribute('href', dataSnapShot.val().userFb);
//             document.getElementById("userPfTw").setAttribute('href', dataSnapShot.val().userTw);
//             document.getElementById("userPfGp").setAttribute('href', dataSnapShot.val().userGp);
//             document.getElementById("userPfBio").innerHTML = dataSnapShot.val().userBio;
//         })
//     } else {
//         //   No user is signed in.
//     }
// });
// // xxxxxxxxxx Show edit profile form with detail xxxxxxxxxx
// function showEditProfileForm() {
//     document.getElementById("profileSection").style.display = "none"
//     document.getElementById("editProfileForm").style.display = "block"
//     var userPfFullName = document.getElementById("userPfFullName").innerHTML;
//     var userPfSurname = document.getElementById("userPfSurname").innerHTML;
//     var userPfFb = document.getElementById("userPfFb").getAttribute("href");
//     var userPfTw = document.getElementById("userPfTw").getAttribute("href");
//     var userPfGp = document.getElementById("userPfGp").getAttribute("href");
//     var userPfBio = document.getElementById("userPfBio").innerHTML;
//     document.getElementById("userFullName").value = userPfFullName;
// }
// // xxxxxxxxxx Hide edit profile form xxxxxxxxxx
// function hideEditProfileForm() {
//     document.getElementById("profileSection").style.display = "block";
//     document.getElementById("editProfileForm").style.display = "none";
// }
// // xxxxxxxxxx Save profile and update database xxxxxxxxxx
// function saveProfile() {
//     let userFullName = document.getElementById("userFullName").value
//     let userFacebook = document.getElementById("userFacebook").value
//     let userTwitter = document.getElementById("userTwitter").value
//     let userGooglePlus = document.getElementById("userGooglePlus").value
//     let userBio = document.getElementById("userBio").value
//     var userFullNameFormate = /^([A-Za-z.\s_-])/;
//     var checkUserFullNameValid = userFullName.match(userFullNameFormate);
//     if (checkUserFullNameValid == null) {
//         return checkUserFullName();
//     } else {
//         let user = auth.currentUser;
//         let uid;
//         if (user != null) {
//             uid = user.uid;
//         }
//         var firebaseRef = firebase.database().ref();
//         var userData = {
//             userFullName: userFullName,
//         }
//         firebaseRef.child(uid).set(userData);
//         swal({
//             icon: 'success',
//             title: 'Update successfull',
//             text: 'Profile updated.',
//         }).then((value) => {
//             setTimeout(function () {
//                 document.getElementById("profileSection").style.display = "block";

//                 document.getElementById("editProfileForm").style.display = "none";
//             }, 1000)
//         });
//     }
// }
// xxxxxxxxxx Working For Sign Out xxxxxxxxxx
function signOut() {
    auth.signOut().then(function () {
        // Sign-out successful.
        swal({
            icon: 'success',
            title: 'Signed Out',
        }).then((value) => {
            setTimeout(function () {
                window.location.replace("../index.html");
            }, 1000)
        });
    }).catch(function (error) {
        // An error happened.
        let errorMessage = error.message;
        swal({
            icon: 'error',
            title: 'Error',
            text: errorMessage,
        })
    });
}