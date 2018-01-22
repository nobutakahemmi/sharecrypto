(function() {
    var config = {
    apiKey: "AIzaSyDIJrMpR-Cu_wNg1mdDusRXQ7BaxcF7IgM",
    authDomain: "sharecrypto-2f276.firebaseapp.com",
    databaseURL: "https://sharecrypto-2f276.firebaseio.com",
    projectId: "sharecrypto-2f276",
    storageBucket: "sharecrypto-2f276.appspot.com",
    messagingSenderId: "939587229372"
  };
  firebase.initializeApp(config);
})();

function fetchReferralLink() {
     var childCount = 0
     var dbRef = firebase.database().ref().child('referralLinks');
     dbRef.on("value", function(snapshot) {
                   childCount = snapshot.numChildren();
                   const randomIndex = Math.floor(Math.random() * childCount);
                   var i = 0;
                   snapshot.forEach(function(data){
                            if (i === randomIndex) {
                                referralLinkTextBox.value = data.val();
                            }
                       i++;
                    });
              });
};

fetchReferralLink();

function submitReferralLink() {
   const submitLinkTextBox = document.getElementById("submitLinkTextBox") 
   
   var dbRef = firebase.database().ref().child('referralLinks');
   // Get a key for a new Post.
   if(ValidURL(submitLinkTextBox.value)) {
     var newLinkRef = dbRef.push();
     newLinkRef.set(submitLinkTextBox.value);
     submitLinkTextBox.value = "";
     swal("Good job!", "Your Referral has been submitted successfully!", "success");   
   }else {
       swal("Try Again!", "Please submit a valid Referral Link!", "error");
   }
};

function ValidURL(str) {
  var pattern = new RegExp('^http(s?)\:\/\/[0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*(:(0-9)*)*(\/?)([a-zA-Z0-9\-\.\?\,\'\/\\\+&amp;%\$#_]*)?$');
  if(!pattern.test(str)) {
    return false;
  } else {
    return true;
  }
};

function referMe() {
    const submitLinkTextBox = document.getElementById("referralLinkTextBox");
    window.open(submitLinkTextBox.value);
}

function sendMail() {
    window.location.href = "mailto:sharecrypto@protonmail.com";
}