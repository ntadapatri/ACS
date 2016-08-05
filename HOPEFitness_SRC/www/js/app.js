var nameApp = angular.module('todo', ['ionic', 'appservices','ui.router','chart.js','ngCordova','appservicesgeo','locator','firebase']);

nameApp.run(function($ionicPlatform) {
  $ionicPlatform.ready(function () {
    if (window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if (window.StatusBar) {
      StatusBar.styleDefault();
    
    }

    window.plugin.notification.local.onadd = function (id, state, json) {
      var notification = {
        id: id,
        state: state,
        json: json
      };
      $timeout(function () {
        $rootScope.$broadcast("$cordovaLocalNotification:added", notification);
      });
    };
  });
});

nameApp.factory("Auth", ["$firebaseAuth",
  function($firebaseAuth) {
    var ref = new Firebase("https://27may-1.firebaseio.com/");
    return $firebaseAuth(ref);
  }
]);

nameApp.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider,$animateProvider,$logProvider) {

  /* PERFORMANCE TUNING*/
  $ionicConfigProvider.views.maxCache(5);
  $ionicConfigProvider.scrolling.jsScrolling(false);
  $animateProvider.classNameFilter(/\banimated\b/);
  $logProvider.debugEnabled(false);
//$ionicConfigProvider.views.transition('none');

  $stateProvider
    
    .state('login', {
      cache: false,
      url: '/login',
      templateUrl: 'templates/login.html',
      controller: 'LoginCtrl'
    })

   .state('register', {
      cache: false,
      url: '/register',
      templateUrl: 'templates/register.html',
      controller: 'registerCtrl'
    })

    .state('search', {
      cache: false,
      url: '/search',
      templateUrl: 'templates/search.html',
      controller: 'SearchCtrl'
    })

    .state('user-profile', {
      cache: false,
      url: '/user-profile',
      templateUrl: 'templates/user-profile.html',
      controller: 'ProfileCtrl'
    })

    .state('edit-user-profile', {
      cache: false,
      url: '/edit-user-profile',
      templateUrl: 'templates/edit-user-profile.html',
      controller: 'ProfileCtrl'
      
    })

    .state('trainer-profile', {
      cache: false,
      url: '/trainer-profile',
      templateUrl: 'templates/trainer-profile.html',
      controller: 'ProfileCtrl'
    })

    .state('edit-trainer-profile', {
      cache: false,
      url: '/edit-trainer-profile',
      templateUrl: 'templates/edit-trainer-profile.html',
      controller: 'ProfileCtrl'
      
    })

    .state('nutritionist-profile', {
      cache: false,
      url: '/nutritionist-profile',
      templateUrl: 'templates/nutritionist-profile.html',
      controller: 'ProfileCtrl'
    })

    .state('edit-nutritionist-profile', {
      cache: false,
      url: '/edit-nutritionist-profile',
      templateUrl: 'templates/edit-nut-profile.html',
      controller: 'ProfileCtrl'
      
    })

    .state('trainer_dashboard', {
      cache: false,
      url: '/trainer_dashboard',
      templateUrl: 'templates/trainer_dashboard.html',
      controller: 'TrainerDBCtrl'
    })

    .state('nutritionist_dashboard', {
      cache: false,
      url: '/nutritionist_dashboard',
      templateUrl: 'templates/nutritionist_dashboard.html',
      controller: 'NutritionistDBCtrl'
    })

    .state('post-ad-trainer', {
      cache: false,
      url: '/post-ad-trainer',
      templateUrl: 'post-ad-trainer.html',
      controller: 'NutritionistDBCtrl'
    })

    .state('post-ad-nut', {
      cache: false,
      url: '/post-ad-nut',
      templateUrl: 'post-ad-nut.html',
      controller: 'NutritionistDBCtrl'
    })

    .state('search-results-trainer', {
      cache: false,
      url: '/search-results-trainer',
      templateUrl: 'templates/search-results-trainer.html',
      controller: 'SearchCtrl'
    })

    .state('search-results-nutritionist', {
      cache: false,
      url: '/search-results-nutritionist',
      templateUrl: 'templates/search-results-nutritionist.html',
      controller: 'SearchCtrl'
    })

    .state('messages', {
      cache: false,
      url: '/messages',
      templateUrl: 'templates/messages.html',
      controller: 'MessagesCtrl'
    })

    .state('trainer_messages', {
      cache: false,
      url: '/trainer_messages',
      templateUrl: 'templates/trainer_messages.html',
      controller: 'TrainerDBCtrl'
    })

    .state('nut_messages', {
      cache: false,
      url: '/nut_messages',
      templateUrl: 'templates/nut_messages.html',
      controller: 'NutritionistDBCtrl'
    })

    .state('messages_list', {
      cache: false,
      url: '/messages_list',
      templateUrl: 'templates/messages_list.html',
      controller: 'MessagesCtrl'
    })

    .state('new_chat', {
      cache: false,
      url: '/new_chat',
      templateUrl: 'templates/new_chat.html',
      controller: 'SearchCtrl'
    })

    .state('subscriptions', {
      cache: false,
      url: '/subscriptions',
      templateUrl: 'templates/subscriptions.html',
      controller: 'SearchCtrl'
    })

    .state('datetime-modal', {
      cache: false,
      url: '/datetime-modal',
      templateUrl: 'datetime-modal.html',
      controller: 'SearchCtrl'
    })

    .state('appointment', {
      cache: false,
      url: '/appointment',
      templateUrl: 'templates/appointment.html',
      controller: 'SearchCtrl'
    })

    .state('sample', {
      cache: false,
      url: '/sample',
      templateUrl: 'templates/sample.html',
      controller: 'SampleCtrl'
    })
    
    /*
    .state('user-subscriptions', {
      cache: false,
      url: '/user-subscriptions',
      templateUrl: 'templates/user-subscriptions.html',
     // controller: 'histCtrl'
    })*/
    ;

  $urlRouterProvider.otherwise("/login");
});

nameApp.controller("LoginCtrl", ["$scope","$rootScope","$state", "$firebaseArray", "$cordovaGeolocation", function($scope,$rootScope, $state, $firebaseArray, $cordovaGeolocation) {
 
  $rootScope.loggedInUser = '';

  $scope.loginUser = function(email, password) {

    /*
    ##################################################################
    UNIT TEST 1: Username verification
    ##################################################################
    */
    if(email.indexOf("@") > -1 && email.indexOf(".") > -1)
    {
      console.log ("UNIT TEST 1 PASSED: VALID EMAIL ID");
    }
    else
    {
      console.log ("UNIT TEST 1 FAILED");
    }

    var ref = new Firebase("https://27may-1.firebaseio.com");

    ref.authWithPassword({
        email: email,
        password: password
    },function(error, authData) {
      /*
      ##################################################################
      UNIT TEST 2: User existence verification
      ##################################################################
      */
        if (error) {
          console.log("UNIT TEST 2 FAILED: Login Failed!", error);
        } else {
          console.log("UNIT TEST 2 PASSED: Authenticated successfully with payload:", authData);
          $state.go('search');
        }
      });

    var reff = new Firebase("https://27may-1.firebaseio.com/CreateUser");
    
    reff.orderByChild("email").equalTo(email).on("child_added", function(snapshot) {
      console.log("loged in as:",snapshot.val().email);
    });

    $rootScope.loggedInUser = snapshot.val().email;
    //console.log($rootScope.loggedInUser);
  } 

  $scope.loginTrainer = function(email, password) {

    var ref = new Firebase("https://27may-1.firebaseio.com");

    ref.authWithPassword({
        email: email,
        password: password
    },function(error, authData) {
        if (error) {
          console.log("Login Failed!", error);
        } else {
          console.log("Authenticated successfully with payload:", authData);
          $state.go('trainer_dashboard');
        }
      });

    var reff = new Firebase("https://27may-1.firebaseio.com/CreateTrainer");
    
    reff.orderByChild("email").equalTo(email).on("child_added", function(snapshot) {
      console.log("loged in as:",snapshot.val().email);
    });

    $rootScope.loggedInUser = snapshot.val().email;
  } 

  $scope.loginNutritionist = function(email, password) {

    var ref = new Firebase("https://27may-1.firebaseio.com");

    ref.authWithPassword({
        email: email,
        password: password
    },function(error, authData) {
        if (error) {
          console.log("Login Failed!", error);
        } else {
          console.log("Authenticated successfully with payload:", authData);
          $state.go('nutritionist_dashboard');
        }
      });

    var reff = new Firebase("https://27may-1.firebaseio.com/CreateNutritionist");
    
    reff.orderByChild("email").equalTo(email).on("child_added", function(snapshot) {
      console.log("loged in as:",snapshot.val().email);
    });

    $rootScope.loggedInUser = snapshot.val().email;
  } 
}]);

nameApp.controller("registerCtrl", ["$scope","$state", "$rootScope","$firebaseArray", "$cordovaGeolocation", function($scope, $state, $rootScope, $firebaseArray,$cordovaGeolocation) {

    //$rootScope.location='';

    $scope.create_message_sender = function() {
      var reff = new Firebase("https://27may-1.firebaseio.com/Messages");
      $scope.emps = $firebaseArray(reff);
      $scope.emps.$add({
        email: "nta@qmail.com",
      });
    }
    
    $rootScope.getLoc = function(){

      $rootScope.currLatitude='';
      $rootScope.currLongitude='';
      
      var geocoder,add;

      var posOptions = {timeout: 10000, enableHighAccuracy: false};

      $cordovaGeolocation.getCurrentPosition(posOptions).then(function (position) {
        $rootScope.currLatitude  = position.coords.latitude;
        $rootScope.currLongitude = position.coords.longitude;

        geocoder = new google.maps.Geocoder();
        var latlng = new google.maps.LatLng($rootScope.currLatitude, $rootScope.currLongitude);
        //alert("Else loop" + latlng);
        geocoder.geocode({
            'latLng': latlng
        }, function(results, status) {
            //alert("Else loop1");
            if (status == google.maps.GeocoderStatus.OK) {
                if (results[0]) {
                    add = results[0].formatted_address;
                    //console.log("Full address is: " + add);
                } else {
                    alert("address not found");
                }
            }
            $rootScope.location = add;
        });
      });
     // $rootScope.location = $scope.user_location();
      console.log("hereeeeeeeee",$rootScope.location);
    }

    
  

 $scope.registerUser = function(email,password,username,age,gender,location) {

    /*
    ##################################################################
    UNIT TEST 3: All fields are required during user registration
    ##################################################################
    */
    if(email == null || password == null || username== null || age == null || gender == null || location == null)
    {
      console.log("TEST CASE 3 FAILED: Required fields have been left empty");
    }

    var ref = new Firebase("https://27may-1.firebaseio.com");
    ref.createUser({
      email    : email,
      password : password
    }, function(error, userData) {
      if (error) {
        console.log("Error creating user:", error);
      } else {
        console.log("Successfully created user account with uid:", userData.uid);
      }
    });

    var reff = new Firebase("https://27may-1.firebaseio.com/CreateUser");
    $scope.emps = $firebaseArray(reff);
     $scope.emps.$add({
            email: email,
            username: username,
            age: age,
            gender: gender,
            height: height,
            weight: weight,
            location: location
         });
     $scope.create_message_sender();
     $state.go('login');
  }

  $scope.registerTrainer = function(email,password,username,specialization,type,location) {

    var ref = new Firebase("https://27may-1.firebaseio.com");
    ref.createUser({
      email    : email,
      password : password
    }, function(error, userData) {
      if (error) {
        console.log("Error creating user:", error);
      } else {
        console.log("Successfully created user account with uid:", userData.uid);
      }
    });

    var reff = new Firebase("https://27may-1.firebaseio.com/CreateTrainer");
    $scope.emps = $firebaseArray(reff);
     $scope.emps.$add({
            email: email,
            username: username,
            specialization: specialization,
            type: type,
            location: location
         });
     $state.go('login');
  }

  $scope.registerNutritionist = function(email,password,username,location) {
    var ref = new Firebase("https://27may-1.firebaseio.com");
    ref.createUser({
      email    : email,
      password : password
    }, function(error, userData) {
      if (error) {
        console.log("Error creating user:", error);
      } else {
        console.log("Successfully created user account with uid:", userData.uid);
      }
  });

  var reff = new Firebase("https://27may-1.firebaseio.com/CreateNutritionist");
  $scope.emps = $firebaseArray(reff);
   $scope.emps.$add({
          email: email,
          username: username,
          location: location
       });
   $state.go('login');
  }
}
]);

nameApp.controller("SearchCtrl", ["$scope","$state", "$rootScope","$firebaseArray", "$ionicModal", "$ionicPopup", "$cordovaGeolocation", function($scope, $state, $rootScope, $firebaseArray, $ionicModal, $ionicPopup, $cordovaGeolocation) {

  $rootScope.getLoc = function(){

    $rootScope.currLatitude='';
    $rootScope.currLongitude='';
   // $rootScope.location='';
   // $rootScope.add='';
    var geocoder,add;

    var posOptions = {timeout: 10000, enableHighAccuracy: false};

    $cordovaGeolocation.getCurrentPosition(posOptions).then(function (position) {
      $rootScope.currLatitude  = position.coords.latitude;
      $rootScope.currLongitude = position.coords.longitude;

      
      geocoder = new google.maps.Geocoder();
      var latlng = new google.maps.LatLng($rootScope.currLatitude, $rootScope.currLongitude);
      //alert("Else loop" + latlng);
      geocoder.geocode({
          'latLng': latlng
      }, function(results, status) {
          //alert("Else loop1");
          if (status == google.maps.GeocoderStatus.OK) {
              if (results[0]) {
                  add = results[0].formatted_address;
                  
              } else {
                  alert("address not found");
              }
          }
          $rootScope.location = add;
      });
    });
  }

  $scope.searchTrainer = function(location,specialization,Pchecked,Gchecked) {

    /*
    ##################################################################
    UNIT TEST 4: Provide results on atleast one successful match
    ##################################################################
    */

    if(location != null || specialization != null || Pchecked != null || Gchecked  != null)
    {
      console.log("TEST CASE 4: Atleast one field filled in by user");
    }

    if(location == null || specialization == null || Pchecked == null || Gchecked  == null)
    {
      console.log("TEST CASE 4: No field filled in by user, no results will be returned");
    }

    $rootScope.loc_TrainerSearch=[];
    $rootScope.spl_TrainerSearch=[];
    var type;
   
    if(Pchecked == true)
    {
       type = "Personal";
    }
    if(Gchecked == true)
    {
        type = "Group";
    }

    var ref = new Firebase("https://27may-1.firebaseio.com/CreateTrainer");
    
    ref.orderByChild("location").equalTo(location).on("child_added", function(snapshot) {
     $rootScope.loc_TrainerSearch.push(snapshot.val());
     $state.go('search-results-trainer');
    });

    ref.orderByChild("specialization").equalTo(specialization).on("child_added", function(snapshot) {
     $rootScope.spl_TrainerSearch.push(snapshot.val());
     $state.go('search-results-trainer');
    });

    ref.orderByChild("type").equalTo(type).on("child_added", function(snapshot) {
     $rootScope.spl_TrainerSearch.push(snapshot.val());
     $state.go('search-results-trainer');
    });
  }

  $scope.res_TrainerSearch = function(){
    var res = $rootScope.loc_TrainerSearch;
    return res;
  }

  $scope.searchNutritionist = function(location,specialization) {
    $rootScope.res_NutritionistSearch=[];
    console.log('hello');
    var ref = new Firebase("https://27may-1.firebaseio.com/CreateNutritionist");
    
    ref.orderByChild("location").equalTo(location).on("child_added", function(snapshot) {
    $rootScope.res_NutritionistSearch.push(snapshot.val());
     $state.go('search-results-nutritionist');
    });

    ref.orderByChild("specialization").equalTo(specialization).on("child_added", function(snapshot) {
    $rootScope.res_NutritionistSearch.push(snapshot.val());
     $state.go('search-results-nutritionist');
    });

  }

  $scope.res_NutritionistSearch = function(){
    console.log($rootScope.res_NutritionistSearch);
    var res = $rootScope.res_NutritionistSearch;
    return res;
    $state.go('search-results-nutritionist');
  }

  $scope.pass_subscribe = function(username,email,location) {

    var d = new Date();
    var date = d.getDate();
    var month = d.getMonth();
    var year = d.getFullYear();
    var startdate= date+"/"+month+"/"+year;
    
    var ref = new Firebase("https://27may-1.firebaseio.com/CreateUser");
    var user_email_raw,user_email;
    var authData = ref.getAuth();
    if (authData) {
      user_email_raw=authData.auth.token.email;
    }

    user_email_test = user_email_raw.toString();
    //console.log('Hereeeeeee', user_email_test);

    ref.orderByChild("email").equalTo(user_email_test).on("child_added", function(snapshot) {
      $scope.key=snapshot.key();
      var path0 = "https://27may-1.firebaseio.com/CreateUser/" + $scope.key;
      var path1 = path0.toString();
      var ref0 = new Firebase(path1);
      var ref1= ref0.child("subscription");
      var refMsgg = ref1.push();
      var emps = $firebaseArray(ref1);
        emps.$add({
              'email': email,
              'username': username,
              'location': location,
              'startdate': startdate
        });
    });

    ref.orderByChild("email").equalTo(user_email_test).on("child_added", function(snapshot) {
      $scope.key=snapshot.key();
      
      var user_data = snapshot.val();
      $rootScope.user_email_ins = user_data.email; 
      $rootScope.user_name_ins = user_data.username;
      $rootScope.user_loc_ins = user_data.location;

    });

    var ref = new Firebase("https://27may-1.firebaseio.com/CreateTrainer");

    var authData = ref.getAuth();
    if (authData) {
      //console.log("Hello!!! Authenticated user with uid:", authData.auth.token.email);
      user_email_raw=authData.auth.token.email;
    }

    user_email = user_email_raw.toString();



    ref.orderByChild("email").equalTo(email).on("child_added", function(snapshot) {
      $scope.key=snapshot.key();
      var path0 = "https://27may-1.firebaseio.com/CreateTrainer/" + $scope.key;
      var path1 = path0.toString();
      var ref0 = new Firebase(path1);
      var ref1= ref0.child("subscription");
      var refMsgg = ref1.push();
      var emps = $firebaseArray(ref1);
        emps.$add({
              'email': $rootScope.user_email_ins,
              'username': $rootScope.user_name_ins,
              'location': $rootScope.user_loc_ins,
              'startdate': startdate
        });
    });

    $state.go('subscriptions');
  }

  $scope.subscription_res = function(){

   $scope.subscriptionlist = [];
    var ref = new Firebase("https://27may-1.firebaseio.com/CreateUser");

    var authData = ref.getAuth();
    if (authData) {
      //console.log("Hello!!! Authenticated user with uid:", authData.auth.token.email);
      user_email_raw=authData.auth.token.email;
    }

    user_email_test = user_email_raw.toString();

    ref.orderByChild("email").equalTo(user_email_test).on("child_added", function(snapshot) {
    
      $scope.key=snapshot.key();

      var path0 = "https://27may-1.firebaseio.com/CreateUser/" + $scope.key + "/subscription";
      var path1 = path0.toString();
      
      var refff=new Firebase(path1);

      refff.orderByKey().on("child_added", function(snapshot) {  
        
        $scope.subscriptionlist.push(snapshot.val());
        
      });   
    });
    var res = $scope.subscriptionlist;
    return res;
  }

  $scope.pass_appointment = function(username,email,location) {
    $rootScope.username = username;
    $rootScope.email = email;
    $rootScope.location = location;
  }

  $scope.pass_appointment_1 = function(date,time) {

    var formatted_date = date.getDate();
    var formatted_month = date.getMonth();
    var formatted_year = date.getFullYear();
    var appdate = formatted_date+"-"+formatted_month+"-"+formatted_year;

    var formatted_hours = time.getHours();
    var formatted_minutes = time.getMinutes();
    var apptime = formatted_hours+":"+formatted_minutes;
    
    var ref = new Firebase("https://27may-1.firebaseio.com/CreateUser");
    ref.orderByChild("email").equalTo("ntadapatri@qmail.com").on("child_added", function(snapshot) {
      $scope.key=snapshot.key();
      var path0 = "https://27may-1.firebaseio.com/CreateUser/" + $scope.key;
      var path1 = path0.toString();
      var ref0 = new Firebase(path1);
      var ref1= ref0.child("appointment");
      var refMsgg = ref1.push();
      var emps = $firebaseArray(ref1);
        emps.$add({
              'email': $rootScope.email,
              'username': $rootScope.username,
              'location': $rootScope.location,
              'date': appdate,
              'time': apptime
        });
    });

    var ref = new Firebase("https://27may-1.firebaseio.com/CreateNutritionist");
    ref.orderByChild("email").equalTo($rootScope.email).on("child_added", function(snapshot) {

      $scope.key=snapshot.key();
      var path0 = "https://27may-1.firebaseio.com/CreateNutritionist/" + $scope.key;
      var path1 = path0.toString();
      var ref0 = new Firebase(path1);
      var ref1= ref0.child("appointment");
      var refMsgg = ref1.push();
      var emps = $firebaseArray(ref1);
        emps.$add({
              'email': "ntadapatri@qmail.com",
        });
    });
    $scope.closeNewTask();
    $state.go('appointment');
  }

  // Create and load the Modal
  $ionicModal.fromTemplateUrl('datetime-modal.html', function(modal) {
    $scope.taskModal = modal;
  }, {
    scope: $scope,
    animation: 'slide-in-up'
  })

  // Open our new task modal
  $scope.newTask_datetime = function() {
    $scope.taskModal.show();
  };

  // Close the new task modal
  $scope.closeNewTask = function() {
    $scope.taskModal.hide();
  };

  $scope.appointment_res = function(){

   $scope.appointmentlist = [];
    var ref = new Firebase("https://27may-1.firebaseio.com/CreateUser");

    ref.orderByChild("email").equalTo("ntadapatri@qmail.com").on("child_added", function(snapshot) {
    
      $scope.key=snapshot.key();

      var path0 = "https://27may-1.firebaseio.com/CreateUser/" + $scope.key + "/appointment";
      var path1 = path0.toString();
      
      var refff=new Firebase(path1);

      refff.orderByKey().on("child_added", function(snapshot) {  
        
        $scope.appointmentlist.push(snapshot.val());
        
      });   
    });

    var res1 = $scope.appointmentlist;
    console.log(res1);
    return res1;
  }

  $scope.new_chat = function(email){
    console.log(email);
    $rootScope.emailid = email;
    $state.go('new_chat');
  }

  $scope.showSender = function(){
    console.log($rootScope.emailid);
    return($rootScope.emailid);
  }

  $scope.create_newchat = function(newMsg)
  {
    var ref = new Firebase("https://27may-1.firebaseio.com/CreateUser");
    var authData = ref.getAuth();
    if (authData) {
      //console.log("Hello!!! Authenticated user with uid:", authData.auth.token.email);
      user_email_raw=authData.auth.token.email;
    }

    user_email_test = user_email_raw.toString();
    console.log('MU hereeeeeeeee',user_email_test);

    var reff = new Firebase("https://27may-1.firebaseio.com/Messages");
    reff.orderByChild("email").equalTo(user_email_test).on("child_added", function(snapshot) {

      //console.log('here111111111111',snapshot.val());
      /*if(snapshot == null)
      {
        var reff = new Firebase("https://27may-1.firebaseio.com/Messages");
        $scope.emps = $firebaseArray(reff);
        $scope.emps.$add({
          email: user_email_test,
        });
      }*/
      //console.log("hi");
      console.log(snapshot.key());
      $scope.key=snapshot.key();

      var path0 = "https://27may-1.firebaseio.com/Messages/" + $scope.key;
      var path1 = path0.toString();

      var ref0 = new Firebase(path1);
      var ref1= ref0.child("Messenger");
      var refMsgg = ref1.push();

      $scope.emps = $firebaseArray(ref1);
         $scope.emps.$add({
                'from': user_email_test,
                'to': $rootScope.emailid,
                'msg': newMsg
         }); 
    });

    var reffB = new Firebase("https://27may-1.firebaseio.com/Messages");
    reffB.orderByChild("email").equalTo($rootScope.emailid).on("child_added", function(snapshot) {
      //console.log("hi");
      console.log(snapshot.key());
      $scope.keyB=snapshot.key();

      var path0B = "https://27may-1.firebaseio.com/Messages/" + $scope.keyB;
      var path1B = path0B.toString();

      var ref0B = new Firebase(path1B);
      var ref1B= ref0B.child("Messenger");
      var refMsggB = ref1B.push();

      $scope.empsB = $firebaseArray(ref1B);
         $scope.empsB.$add({
                'from': user_email_test,
                'to': $rootScope.emailid,
                'msg': newMsg
         }); 
    });

    $state.go('messages_list');
  }
} 
]);

nameApp.controller("MessagesCtrl", ["$scope","$state", "$rootScope","$firebaseArray", function($scope, $state, $rootScope, $firebaseArray) {

 $scope.showMessage = function() {

    $scope.result = [];    

    //var ref = new Firebase("https://27may-1.firebaseio.com/CreateTrainer/tgn/messenger/tgl");

    var reff = new Firebase("https://27may-1.firebaseio.com/Messages");

    reff.orderByChild("email").equalTo("ntadapatri@qmail.com").on("child_added", function(snapshot) {
      $scope.key=snapshot.key();

      var path0 = "https://27may-1.firebaseio.com/Messages/" + $scope.key + "/Messenger";
      
      var path1 = path0.toString();

      var refff=new Firebase(path1);

      refff.orderByKey().on("child_added", function(snapshot) {
      console.log('in here');
      $scope.result.push(snapshot.val());
    });
  });
  console.log( $scope.result);
  return $scope.result;
  }

  $scope.firstMessage = function()
  {
    var reff = new Firebase("https://27may-1.firebaseio.com/Messages");
    $scope.emps = $firebaseArray(reff);
    $scope.emps.$add({
        'email':'nagashree@qmail.com'
    });
  }

  $scope.create_message = function(msg) {

    var reff = new Firebase("https://27may-1.firebaseio.com/Messages");
    reff.orderByChild("email").equalTo("ntadapatri@qmail.com").on("child_added", function(snapshot) {
      console.log("hi");
      console.log(snapshot.key());
      $scope.key=snapshot.key();

      var path0 = "https://27may-1.firebaseio.com/Messages/" + $scope.key;
      var path1 = path0.toString();

      var ref0 = new Firebase(path1);
      var ref1= ref0.child("Messenger");
      var refMsgg = ref1.push();

      $scope.emps = $firebaseArray(ref1);
         $scope.emps.$add({
                'from': 'ntadapatri@qmail.com',
                'to': 'nt@qmail.com',
                'msg': msg
         }); 
    });

    var chk_flag = 0;

    var reffB = new Firebase("https://27may-1.firebaseio.com/Messages");
    reffB.orderByChild("email").equalTo("nt@qmail.com").on("child_added", function(snapshot) {

      chk_flag = 1;
      console.log("hi");
      console.log(snapshot.key());
      $scope.keyB=snapshot.key();

      var path0B = "https://27may-1.firebaseio.com/Messages/" + $scope.keyB;
      var path1B = path0B.toString();

      var ref0B = new Firebase(path1B);
      var ref1B= ref0B.child("Messenger");
      var refMsggB = ref1B.push();

      $scope.empsB = $firebaseArray(ref1B);
         $scope.empsB.$add({
                'from': 'ntadapatri@qmail.com',
                'to': 'nt@qmail.com',
                'msg': msg
         }); 
    });

    /*
    ########################################################################
    UNIT TEST 5: Message recipient's existence in 'Messages' data structure
    ########################################################################
    */
    if(chk_flag == 1)
    {
      console.log("TEST CASE 5: Message recipient exists");
    }
    else
    {
        console.log("TEST CASE 5: Message recipient does not exist");
    }
    
  }

  $scope.showAllMessages = function() {

    $scope.result = [];    
    //var ref = new Firebase("https://27may-1.firebaseio.com/CreateTrainer/tgn/messenger");

    var reff = new Firebase("https://27may-1.firebaseio.com/Messages");

    reff.orderByChild("email").equalTo("ntadapatri@qmail.com").on("child_added", function(snapshot) {
      $scope.key=snapshot.key();
      var path0 = "https://27may-1.firebaseio.com/Messages/" + $scope.key + "/Messenger";
      var path1 = path0.toString();
      var refff=new Firebase(path1);

      refff.orderByChild("to").equalTo("nt@qmail.com").limitToFirst(1).on("child_added", function(snapshot) {
      
          
            $scope.result.push(snapshot.val());
      });
      refff.orderByChild("to").equalTo("nagashree@qmail.com").limitToFirst(1).on("child_added", function(snapshot) {
      
            //console.log(snapshot.val());
            $scope.result.push(snapshot.val());
      });
    //console.log($scope.result);
    //console.log($scope.result.length);
  });
  return $scope.result;
  }
}
]);

nameApp.controller("TrainerDBCtrl", ["$scope","$state", "$rootScope","$firebaseArray", "$ionicModal", "$ionicPopup", "$ionicPopover", function($scope, $state, $rootScope, $firebaseArray, $ionicModal,$ionicPopup, $ionicPopover) {

  $scope.create_ad_trainer = function(location) {
    
    var reff = new Firebase("https://27may-1.firebaseio.com/CreateTrainer");

    reff.orderByChild("email").equalTo("nt@qmail.com").on("child_added", function(snapshot) {
    console.log("hi");
    console.log(snapshot.key());
    $scope.key=snapshot.key();

    var path0 = "https://27may-1.firebaseio.com/CreateTrainer/" + $scope.key;

    console.log(path0);
    var path1 = path0.toString();

    var ref0 = new Firebase(path1);
    var ref1= ref0.child("advertisement");
    var refMsgg = ref1.push();

    var emps = $firebaseArray(ref1);
    emps.$add({
            'location': location.toString()
         });
    });
    $scope.taskModal.hide();
  }

  // Create and load the Modal
  $ionicModal.fromTemplateUrl('post-ad-trainer.html', function(modal) {
    $scope.taskModal = modal;
  }, {
    scope: $scope,
    animation: 'slide-in-up'
  })

  // Open our new task modal
  $scope.newTask = function() {
    $scope.taskModal.show();
  };

  // Close the new task modal
  $scope.closeNewTask = function() {
    $scope.taskModal.hide();
  };

  $scope.showAds = function(location) {
    $scope.result=[];
    
    var reff = new Firebase("https://27may-1.firebaseio.com/CreateTrainer");
    
    reff.orderByChild("email").equalTo("nt@qmail.com").on("child_added", function(snapshot) {
      $scope.key=snapshot.key();

      var path0 = "https://27may-1.firebaseio.com/CreateTrainer/" + $scope.key + "/advertisement";
      
      var path1 = path0.toString();

      var refff=new Firebase(path1);

      refff.orderByKey().on("child_added", function(snapshot) {  
        $scope.result.push(snapshot.val());
      });     
    });
    return $scope.result;
  }

  $scope.subscription_res = function(){

   $scope.subscriptionlist = [];
    var ref = new Firebase("https://27may-1.firebaseio.com/CreateTrainer");

    ref.orderByChild("email").equalTo("nt@qmail.com").on("child_added", function(snapshot) {
    
      $scope.key=snapshot.key();

      var path0 = "https://27may-1.firebaseio.com/CreateTrainer/" + $scope.key + "/subscription";
      var path1 = path0.toString();
      
      var refff=new Firebase(path1);

      refff.orderByKey().on("child_added", function(snapshot) {  
        $scope.subscriptionlist.push(snapshot.val());
      });   
    });
    var res = $scope.subscriptionlist;
    return res;
  }

  $scope.trainer_showAllMessages = function() {

    $scope.result = '';

    var reff = new Firebase("https://27may-1.firebaseio.com/Messages");

    reff.orderByChild("email").equalTo("nt@qmail.com").on("child_added", function(snapshot) {
      $scope.key=snapshot.key();
      var path0 = "https://27may-1.firebaseio.com/Messages/" + $scope.key + "/Messenger";
      var path1 = path0.toString();
      var refff=new Firebase(path1);

      refff.orderByChild("to").equalTo("ntadapatri@qmail.com").on("child_added", function(snapshot) {
      $scope.result = snapshot.val();
    });
    console.log($scope.result);  
  });
  return $scope.result;
  }

  $scope.trainer_showMessage = function() {

    $scope.result = [];    

    var reff = new Firebase("https://27may-1.firebaseio.com/Messages");

    reff.orderByChild("email").equalTo("nt@qmail.com").on("child_added", function(snapshot) {
      $scope.key=snapshot.key();

      var path0 = "https://27may-1.firebaseio.com/Messages/" + $scope.key + "/Messenger";
      
      var path1 = path0.toString();

      var refff=new Firebase(path1);
      
      refff.orderByKey().on("child_added", function(snapshot) {
      console.log('in here');
      $scope.result.push(snapshot.val());
    });
  });
    console.log( $scope.result);
    return $scope.result;
  }

 
  $scope.trainer_create_message = function(msg) {

    var reff = new Firebase("https://27may-1.firebaseio.com/Messages");
    reff.orderByChild("email").equalTo("nt@qmail.com").on("child_added", function(snapshot) {
      console.log("hi");
      console.log(snapshot.key());
      $scope.key=snapshot.key();

      var path0 = "https://27may-1.firebaseio.com/Messages/" + $scope.key;
      var path1 = path0.toString();

      var ref0 = new Firebase(path1);
      var ref1= ref0.child("Messenger");
      var refMsgg = ref1.push();

      $scope.emps = $firebaseArray(ref1);
         $scope.emps.$add({
                'from': 'nt@qmail.com',
                'to': 'ntadapatri@qmail.com',
                'msg': msg
         }); 
    });

    var reffB = new Firebase("https://27may-1.firebaseio.com/Messages");
    reffB.orderByChild("email").equalTo("ntadapatri@qmail.com").on("child_added", function(snapshot) {
      console.log("hi");
      console.log(snapshot.key());
      $scope.keyB=snapshot.key();

      var path0B = "https://27may-1.firebaseio.com/Messages/" + $scope.keyB;
      var path1B = path0B.toString();

      var ref0B = new Firebase(path1B);
      var ref1B= ref0B.child("Messenger");
      var refMsggB = ref1B.push();

      $scope.empsB = $firebaseArray(ref1B);
         $scope.empsB.$add({
                'from': 'nt@qmail.com',
                'to': 'ntadapatri@qmail.com',
                'msg': msg
         }); 
    });
  }
}
]);

nameApp.controller("NutritionistDBCtrl", ["$scope","$state", "$rootScope","$firebaseArray", "$ionicModal", "$ionicPopup", function($scope, $state, $rootScope ,$firebaseArray, $ionicModal, $ionicPopup) {

$scope.create_ad_nut = function(location) {
    
    var reff = new Firebase("https://27may-1.firebaseio.com/CreateNutritionist");

    reff.orderByChild("email").equalTo("nagashree@qmail.com").on("child_added", function(snapshot) {
    console.log("hi");
    console.log(snapshot.key());
    $scope.key=snapshot.key();

    var path0 = "https://27may-1.firebaseio.com/CreateNutritionist/" + $scope.key;

    console.log(path0);
    var path1 = path0.toString();

    var ref0 = new Firebase(path1);
    var ref1= ref0.child("advertisement");
    var refMsgg = ref1.push();

    var emps = $firebaseArray(ref1);
     emps.$add({
            'location': location.toString()
         });
      });

    $scope.taskModal.hide();
  }

  // Create and load the Modal
  $ionicModal.fromTemplateUrl('post-ad-nut.html', function(modal) {
    $scope.taskModal = modal;
  }, {
    scope: $scope,
    animation: 'slide-in-up'
  })

  // Open our new task modal
  $scope.newTask = function() {
    $scope.taskModal.show();
  };

  // Close the new task modal
  $scope.closeNewTask = function() {
    $scope.taskModal.hide();
  };

  $scope.showAds = function(location) {
    $scope.result=[];
    
    var reff = new Firebase("https://27may-1.firebaseio.com/CreateNutritionist");
    
    reff.orderByChild("email").equalTo("nagashree@qmail.com").on("child_added", function(snapshot) {
      $scope.key=snapshot.key();

      var path0 = "https://27may-1.firebaseio.com/CreateNutritionist/" + $scope.key + "/advertisement";
      
      var path1 = path0.toString();

      var refff=new Firebase(path1);

      refff.orderByKey().on("child_added", function(snapshot) {  
        $scope.result.push(snapshot.val());
      });     
    });
    return $scope.result;
  }


  $scope.showAppointment = function(location) {
    $scope.result=[];
    
    var reff = new Firebase("https://27may-1.firebaseio.com/CreateNutritionist");
    
    reff.orderByChild("email").equalTo("nagashree@qmail.com").on("child_added", function(snapshot) {
      $scope.key=snapshot.key();

      var path0 = "https://27may-1.firebaseio.com/CreateNutritionist/" + $scope.key + "/appointment";
      
      var path1 = path0.toString();

      var refff=new Firebase(path1);

      refff.orderByKey().on("child_added", function(snapshot) {  
        
      $scope.result.push(snapshot.val());
        
      });     
    });
    return $scope.result;
  }

  $scope.nut_showAllMessages = function() {

    $scope.result = '';

    var reff = new Firebase("https://27may-1.firebaseio.com/Messages");

    reff.orderByChild("email").equalTo("nagashree@qmail.com").on("child_added", function(snapshot) {
      $scope.key=snapshot.key();
      var path0 = "https://27may-1.firebaseio.com/Messages/" + $scope.key + "/Messenger";
      var path1 = path0.toString();
      var refff=new Firebase(path1);

      refff.orderByChild("from").equalTo("ntadapatri@qmail.com").on("child_added", function(snapshot) {
      $scope.result = snapshot.val();

    });
    console.log($scope.result);  
  });
  return $scope.result;
  }

  $scope.nut_showMessage = function() {

    $scope.result = [];    

    var reff = new Firebase("https://27may-1.firebaseio.com/Messages");

    reff.orderByChild("email").equalTo("nagashree@qmail.com").on("child_added", function(snapshot) {
      $scope.key=snapshot.key();

      var path0 = "https://27may-1.firebaseio.com/Messages/" + $scope.key + "/Messenger";
      
      var path1 = path0.toString();

      var refff=new Firebase(path1);
      
      refff.orderByKey().on("child_added", function(snapshot) {
      console.log('in here');
      $scope.result.push(snapshot.val());
    });
  });
    console.log( $scope.result);
    return $scope.result;
  }

 
  $scope.nut_create_message = function(msg) {

    var reff = new Firebase("https://27may-1.firebaseio.com/Messages");
    reff.orderByChild("email").equalTo("nagashree@qmail.com").on("child_added", function(snapshot) {
      console.log("hi");
      console.log(snapshot.key());
      $scope.key=snapshot.key();

      var path0 = "https://27may-1.firebaseio.com/Messages/" + $scope.key;
      var path1 = path0.toString();

      var ref0 = new Firebase(path1);
      var ref1= ref0.child("Messenger");
      var refMsgg = ref1.push();

      $scope.emps = $firebaseArray(ref1);
         $scope.emps.$add({
                'from': 'nagashree@qmail.com',
                'to': 'ntadapatri@qmail.com',
                'msg': msg
         }); 
    });

    var reffB = new Firebase("https://27may-1.firebaseio.com/Messages");
    reffB.orderByChild("email").equalTo("ntadapatri@qmail.com").on("child_added", function(snapshot) {
      console.log("hi");
      console.log(snapshot.key());
      $scope.keyB=snapshot.key();

      var path0B = "https://27may-1.firebaseio.com/Messages/" + $scope.keyB;
      var path1B = path0B.toString();

      var ref0B = new Firebase(path1B);
      var ref1B= ref0B.child("Messenger");
      var refMsggB = ref1B.push();

      $scope.empsB = $firebaseArray(ref1B);
         $scope.empsB.$add({
                'from': 'nagashree@qmail.com',
                'to': 'ntadapatri@qmail.com',
                'msg': msg
         }); 
    });
  }
  
} 
]);

nameApp.controller("ProfileCtrl", ["$scope","$state", "$rootScope","$firebaseArray", function($scope, $state, $rootScope, $firebaseArray) {

  $scope.show_UserProfile = function() {
    
    var user ='';
    var reff = new Firebase("https://27may-1.firebaseio.com/CreateUser");

    reff.orderByChild("email").equalTo("ntadapatri@qmail.com").on("child_added", function(snapshot) {
    $scope.key=snapshot.key();

    var path0 = "https://27may-1.firebaseio.com/CreateUser/" + $scope.key ;

    //console.log(path0);
    var path1 = path0.toString();

      var refff=new Firebase(path1);

      refff.on("value", function(snapshot) {  
        
      user = snapshot.val();
        
      });     
    });
    console.log(user);
    return user;
  }

  $scope.edit_UserProfile = function(name,email,age,gender,location) {
    
    var user ='';
    var reff = new Firebase("https://27may-1.firebaseio.com/CreateUser");

    reff.orderByChild("email").equalTo("ntadapatri@qmail.com").on("child_added", function(snapshot) {
      $scope.key=snapshot.key();

      var path0 = "https://27may-1.firebaseio.com/CreateUser/" + $scope.key ;

      var path1 = path0.toString();
      var refff=new Firebase(path1);

      if(name != undefined)
      {
        refff.update({
          "username": name
        });
      }
      if(email != undefined)
      {
        refff.update({
          "email": email
        });
      }
      if(age != undefined)
      {
        refff.update({
          "age": age
        });
      }
      if(gender != undefined)
      {
        refff.update({
          "gender": gender
        });
      }
      if(location != undefined)
      {
        refff.update({
          "location": location
        });
      }  
    });
    $state.go('user-profile');
  }

  $scope.show_TrainerProfile = function() {
    
    var user ='';
    var reff = new Firebase("https://27may-1.firebaseio.com/CreateTrainer");

    reff.orderByChild("email").equalTo("nt@qmail.com").on("child_added", function(snapshot) {
    $scope.key=snapshot.key();

    var path0 = "https://27may-1.firebaseio.com/CreateTrainer/" + $scope.key ;

    var path1 = path0.toString();

      var refff=new Firebase(path1);

      refff.on("value", function(snapshot) {  
        
      user = snapshot.val();
      });     
    });
    console.log(user);
    return user;
  }

  $scope.edit_TrainerProfile = function(name,email,specialization,location) {
    
    var user ='';
    var reff = new Firebase("https://27may-1.firebaseio.com/CreateTrainer");

    reff.orderByChild("email").equalTo("nt@qmail.com").on("child_added", function(snapshot) {
      $scope.key=snapshot.key();

      var path0 = "https://27may-1.firebaseio.com/CreateTrainer/" + $scope.key ;

      var path1 = path0.toString();
      var refff=new Firebase(path1);

      if(name != undefined)
      {
        refff.update({
          "username": name
        });
      }
      if(email != undefined)
      {
        refff.update({
          "email": email
        });
      }
      if(specialization != undefined)
      {
        refff.update({
          "specialization": specialization
        });
      }
      if(location != undefined)
      {
        refff.update({
          "location": location
        });
      }  
    });
    $state.go('trainer-profile');
  }

  $scope.show_NutritionistProfile = function() {
    
    var user ='';
    var reff = new Firebase("https://27may-1.firebaseio.com/CreateNutritionist");

    reff.orderByChild("email").equalTo("nagashree@qmail.com").on("child_added", function(snapshot) {
    $scope.key=snapshot.key();

    var path0 = "https://27may-1.firebaseio.com/CreateNutritionist/" + $scope.key ;

    //console.log(path0);
    var path1 = path0.toString();

      var refff=new Firebase(path1);

      refff.on("value", function(snapshot) {  
        
      user = snapshot.val();
        
      });     
    });
    console.log(user);
    return user;
  }

  $scope.edit_NutProfile = function(name,email,location) {
    
    var user ='';
    var reff = new Firebase("https://27may-1.firebaseio.com/CreateNutritionist");

    reff.orderByChild("email").equalTo("nagashree@qmail.com").on("child_added", function(snapshot) {
      $scope.key=snapshot.key();

      var path0 = "https://27may-1.firebaseio.com/CreateNutritionist/" + $scope.key ;

      var path1 = path0.toString();
      var refff=new Firebase(path1);

      if(name != undefined)
      {
        refff.update({
          "username": name
        });
      }
      if(email != undefined)
      {
        refff.update({
          "email": email
        });
      }
      if(location != undefined)
      {
        refff.update({
          "location": location
        });
      }  
    });
    $state.go('nutritionist-profile');
  }
} 
]);


























nameApp.controller("AppointmentCtrl", ["$scope","$state", "$rootScope","$firebaseArray", function($scope, $state, $rootScope, $firebaseArray) {

  $scope.create_appointment = function(date,time) {
    
    
    var reff = new Firebase("https://27may-1.firebaseio.com/CreateUser");

    reff.orderByChild("email").equalTo("ntadapatri@qmail.com").on("child_added", function(snapshot) {
    console.log("hi");
    console.log(snapshot.key());
    $scope.key=snapshot.key();

    var path0 = "https://27may-1.firebaseio.com/CreateUser/" + $scope.key ;

    console.log(path0);
    var path1 = path0.toString();

      var ref0 = new Firebase(path1);
      var ref1= ref0.child("appointment");
      var refMsgg = ref1.push();

    var emps = $firebaseArray(ref1);
       emps.$add({
              'date': date.toString(),
              'time': time.toString()
           });
        });
  }

  $scope.show_appointment_date = function(){

    $scope.result = [];

    var reff = new Firebase("https://27may-1.firebaseio.com/CreateUser");

    reff.orderByChild("email").equalTo("ntadapatri@qmail.com").on("child_added", function(snapshot) {
      $scope.key=snapshot.key();

      var path0 = "https://27may-1.firebaseio.com/CreateUser/" + $scope.key + "/appointment";
      
      var path1 = path0.toString();

      var refff=new Firebase(path1);

      refff.orderByKey().on("child_added", function(snapshot) {  
        $scope.result.push(snapshot.val().date);
      });     

    });

    return $scope.result;
  }


  $scope.show_appointment_time = function(){

    $scope.result = [];

    var reff = new Firebase("https://27may-1.firebaseio.com/CreateUser");

    reff.orderByChild("email").equalTo("ntadapatri@qmail.com").on("child_added", function(snapshot) {
      $scope.key=snapshot.key();

      var path0 = "https://27may-1.firebaseio.com/CreateUser/" + $scope.key + "/appointment";
      
      var path1 = path0.toString();

      var refff=new Firebase(path1);

      refff.orderByKey().on("child_added", function(snapshot) {  
        
        $scope.result.push(snapshot.val().time);
      
      });     
    });
    return $scope.result;
  }
} 
]);


nameApp.controller("SampleCtrl", ["$scope","$state", "$rootScope","$firebaseArray", function($scope, $state, $rootScope, $firebaseArray) {

//from the MessageCtrl-keep this
 /*$scope.newMessage = function(msg){

    var reff = new Firebase("https://27may-1.firebaseio.com/CreateTrainer/tgn/messenger");
    
    var refMsg = reff.child("tgl");
    var refMsgg = refMsg.push();

    $scope.emps = $firebaseArray(refMsg);
       $scope.emps.$add({
              'name': 'tgn',
              'msg': msg
       });   
  }*/

  $scope.create_message_sender = function() {
    var reff = new Firebase("https://27may-1.firebaseio.com/Messages");
    $scope.emps = $firebaseArray(reff);
    $scope.emps.$add({
      email: "ntadapatri@qmail.com",
    });
  }

  $scope.create_message = function() {

    var reff = new Firebase("https://27may-1.firebaseio.com/Messages");
    reff.orderByChild("email").equalTo("ntadapatri@qmail.com").on("child_added", function(snapshot) {
    console.log("hi");
    console.log(snapshot.key());
    $scope.key=snapshot.key();

    var path0 = "https://27may-1.firebaseio.com/Messages/" + $scope.key;
    var path1 = path0.toString();

    var ref0 = new Firebase(path1);
    var ref1= ref0.child("Messenger");
    var refMsgg = ref1.push();

    $scope.emps = $firebaseArray(ref1);
       $scope.emps.$add({
              'name': 'nat@qmail.com',
              'msg': 'hello'
       }); 
  });
  }

  $scope.showMessage = function() {

    $scope.result = [];    

    var reff = new Firebase("https://27may-1.firebaseio.com/Messages");
    reff.orderByChild("email").equalTo("ntadapatri@qmail.com").on("child_added", function(snapshot) {
    console.log("hi");
    console.log(snapshot.key());
    $scope.key=snapshot.key();

    var path0 = "https://27may-1.firebaseio.com/Messages/" + $scope.key;
    var path1 = path0.toString();
console.log(path1);
    var ref0 = new Firebase(path1);
    var ref1= ref0.child("Messenger");

    ref1.orderByKey().on("child_added", function(snapshot) {
    $scope.result.push(snapshot.val());
console.log(snapshot.val());
    });
console.log($scope.result);
  });
  }
} 
]);