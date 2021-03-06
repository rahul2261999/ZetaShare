// // facebook user auth
// window.fbAsyncInit = function () {
//     // FB JavaScript SDK configuration and setup
//     FB.init({
//         appId: '243240056787926', // FB App ID
//         cookie: true,  // enable cookies to allow the server to access the session
//         xfbml: false,  // parse social plugins on this page
//         version: 'v6.0' // use graph api version 2.8
//     });

//     // Check whether the user already logged in
//     FB.getLoginStatus(function (response) {
//         if (response.status === 'connected') {
//             //display user data
//             console.log(response.authResponse.accessToken)
//             getFbUserData();
//         }
//     });
// };

// // Load the JavaScript SDK asynchronously
// (function (d, s, id) {
//     var js, fjs = d.getElementsByTagName(s)[0];
//     if (d.getElementById(id)) return;
//     js = d.createElement(s); js.id = id;
//     js.src = "//connect.facebook.net/en_US/sdk.js";
//     fjs.parentNode.insertBefore(js, fjs);
// }(document, 'script', 'facebook-jssdk'));

// // Facebook login with JavaScript SDK
// function facebookauth() {
//     FB.login(function (response) {
//         if (response.authResponse) {
//             // Get and display the user profile data
//             const accessToken = response.authResponse.accessToken
//             console.log(accessToken)
//             getFbUserData();
//         } else {
//             console.log('user not log')
//         }
//     }, { scope: 'gender,email' });
// }

// // Fetch the user profile data from facebook
// function getFbUserData() {
//     FB.api('/me', { locale: 'en_US', fields: 'id,first_name,last_name,email,link,gender' },
//         function (response) {
//             console.log(response)
//         });
// }

// function fbLogout() {
//     FB.logout(function (response) {

//     });
// }

// // google api

// function onSignIn(googleUser) {
//     var profile = googleUser.getBasicProfile();
//     console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
//     console.log('Name: ' + profile.getName());
//     console.log('Image URL: ' + profile.getImageUrl());
//     console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
// }
function statusChangeCallback(response) {  // Called with the results from FB.getLoginStatus().
    console.log('statusChangeCallback');
    console.log(response);                   // The current login status of the person.
    if (response.status === 'connected') {   // Logged into your webpage and Facebook.
        fetchdata();
        $('.auth-button').css('display', 'none')
        $('#user-info').css('display', 'block')
        $('.glog').attr('onclick', 'fbLogout()')
        $('.login-sidebar').hide()

    }
    else {
        $('#user-info').css('display', 'none')
        $('.auth-button').css('display', 'block')                         // Not logged into your webpage or we are unable to tell.
    }
}


function checkLoginState() {               // Called when a person is finished with the Login Button.
    FB.getLoginStatus(function (response) {   // See the onlogin handler
        statusChangeCallback(response);
    });
}


window.fbAsyncInit = function () {
    FB.init({
        appId: '243240056787926',
        cookie: true,                     // Enable cookies to allow the server to access the session.
        xfbml: true,                     // Parse social plugins on this webpage.
        version: 'v6.0'           // Use this Graph API version for this call.
    });


    FB.getLoginStatus(function (response) {   // Called after the JS SDK has been initialized.
        statusChangeCallback(response);        // Returns the login status.
    });
};


(function (d, s, id) {                      // Load the SDK asynchronously
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s); js.id = id;
    js.src = "https://connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));


function fetchdata() {                      // Testing Graph API after login.  See statusChangeCallback() for when this call is made.
    console.log('Welcome!  Fetching your information.... ');
    FB.api('/me', function (response) {

        document.getElementById('username').innerHTML = response.name

    });
}

function fbLogout() {
    FB.logout(function (response) {
        console.log('logout successfully')
        $('#user-info').css('display', 'none')
        $('.auth-button').css('display', 'block')
        location.reload()
    })
}

function gLogout() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
        console.log('User signed out.');
        console.log('logout successfully')
        $('#user-info').css('display', 'none')
        $('.auth-button').css('display', 'block')
        location.reload()
    });
}

// google auth
function onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();
    document.getElementById('username').innerHTML = profile.getName()
    console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    console.log('Name: ' + profile.getName());
    console.log('Image URL: ' + profile.getImageUrl());
    console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
    console.log(googleUser)
    $('#user-info').css('display', 'block')
    $('.auth-button').css('display', 'none')
    $('.glog').attr('onclick', 'gLogout()')
    $('.login-sidebar').hide()
}

function onFailure() {
    alert('not able to SignIn')
    location.reload()
}


function renderButton() {
    gapi.signin2.render('googleauth', {
        'scope': 'profile email',
        'width': '250',
        'height': '40',
        'longtitle': true,
        'onsuccess': onSignIn,
        'onfailure': onFailure

    });
}




