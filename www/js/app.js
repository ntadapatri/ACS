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

    .state('trainer-profile', {
      cache: false,
      url: '/trainer-profile',
      templateUrl: 'templates/trainer-profile.html',
      controller: 'ProfileCtrl'
    })

    .state('nutritionist-profile', {
      cache: false,
      url: '/nutritionist-profile',
      templateUrl: 'templates/nutritionist-profile.html',
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

    .state('messages_list', {
      cache: false,
      url: '/messages_list',
      templateUrl: 'templates/messages_list.html',
      controller: 'MessagesCtrl'
    })

    .state('subscriptions', {
      cache: false,
      url: '/subscriptions',
      templateUrl: 'templates/subscriptions.html',
      controller: 'SearchCtrl'
    })

    

    .state('user-subscriptions', {
      cache: false,
      url: '/user-subscriptions',
      templateUrl: 'templates/user-subscriptions.html',
     // controller: 'histCtrl'
    })

    .state('user-messages', {
      cache: false,
      url: '/user-messages',
      templateUrl: 'templates/user-messages.html',
      //controller: 'MessagesCtrl'
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
    });

  $urlRouterProvider.otherwise("/login");
});

nameApp.controller("LoginCtrl", ["$scope","$rootScope","$state", "$firebaseArray", function($scope,$rootScope, $state, $firebaseArray) {
 
 $scope.register = function(username,password) {
    var ref = new Firebase("https://27may-1.firebaseio.com");
    ref.createUser({
      email    : username,
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
            email: username,
            username: name,
            age: age,
            gender: gender,
            height: height,
            weight: weight,
            location: location
         });
  }

  $scope.loginUser = function(email, password) {

    var ref = new Firebase("https://27may-1.firebaseio.com");

    ref.authWithPassword({
        email: email,
        password: password
    },function(error, authData) {
        if (error) {
          console.log("Login Failed!", error);
        } else {
          console.log("Authenticated successfully with payload:", authData);
          $state.go('search');
        }
      });

    var reff = new Firebase("https://27may-1.firebaseio.com/CreateUser");
    
    console.log("here");
    reff.orderByChild("email").equalTo(email).on("child_added", function(snapshot) {
    console.log("loged in as:",snapshot.val().email);
    });

    $rootScope.loggedInUser = snapshot.val().email;
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
    
    console.log("here");
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
    
    console.log("here");
    reff.orderByChild("email").equalTo(email).on("child_added", function(snapshot) {
    console.log("loged in as:",snapshot.val().email);
    });

    $rootScope.loggedInUser = snapshot.val().email;
    } 
}
]);

nameApp.controller("registerCtrl", ["$scope","$state", "$firebaseArray", function($scope, $state, $firebaseArray) {
 
 $scope.registerUser = function(email,password,username,age,gender,height,weight,location) {
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
     $state.go('login');
  }

  $scope.registerTrainer = function(email,password,username,specialization,location) {
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

  $scope.loginUser = function(email, password) {
        var ref = new Firebase("https://27may-1.firebaseio.com");

        ref.authWithPassword({
            email: email,
            password: password
        },function(error, authData) {
            if (error) {
              console.log("Login Failed!", error);
            } else {
              console.log("Authenticated successfully with payload:", authData);
              
            }
          });

        var reff = new Firebase("https://27may-1.firebaseio.com/CreateUser");
        
        console.log("here");
        reff.orderByChild("email").equalTo(email).on("child_added", function(snapshot) {
        console.log("loged in as:",snapshot.val().email);
    });
    } 
}
]);

nameApp.controller("SearchCtrl", ["$scope","$state", "$rootScope","$firebaseArray", "$ionicModal", "$ionicPopup", function($scope, $state, $rootScope, $firebaseArray, $ionicModal, $ionicPopup) {

 $scope.searchTrainer = function(location) {
    $rootScope.res_TrainerSearch=[];

    console.log('hello');
    
    var ref = new Firebase("https://27may-1.firebaseio.com/CreateTrainer");
    
    ref.orderByChild("location").equalTo(location).on("child_added", function(snapshot) {
     $rootScope.res_TrainerSearch.push(snapshot.val());
     $state.go('search-results-trainer');
    });
  }

  $scope.res_TrainerSearch = function(){
    console.log($rootScope.res_TrainerSearch);
    var res = $rootScope.res_TrainerSearch;
    return res;
  }

  $scope.searchNutritionist = function(location) {
    $rootScope.res_NutritionistSearch=[];
    console.log('hello');
    var ref = new Firebase("https://27may-1.firebaseio.com/CreateNutritionist");
    
    ref.orderByChild("location").equalTo(location).on("child_added", function(snapshot) {
    $rootScope.res_NutritionistSearch.push(snapshot.val());
     $state.go('search-results-nutritionist');
    });
  }

  $scope.res_NutritionistSearch = function(){
    console.log($rootScope.res_NutritionistSearch);
    var res = $rootScope.res_NutritionistSearch;
    return res;
  }

  $scope.pass_subscribe = function(username,email,location) {

    var ref = new Firebase("https://27may-1.firebaseio.com/CreateUser");
    ref.orderByChild("email").equalTo("ntadapatri@qmail.com").on("child_added", function(snapshot) {
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
              'location': location
        });
    });

    var ref = new Firebase("https://27may-1.firebaseio.com/CreateTrainer");
    ref.orderByChild("email").equalTo(email).on("child_added", function(snapshot) {
      $scope.key=snapshot.key();
      var path0 = "https://27may-1.firebaseio.com/CreateTrainer/" + $scope.key;
      var path1 = path0.toString();
      var ref0 = new Firebase(path1);
      var ref1= ref0.child("subscription");
      var refMsgg = ref1.push();
      var emps = $firebaseArray(ref1);
        emps.$add({
              'email': "ntadapatri@qmail.com",
        });
    });

    $state.go('subscriptions');
  }

$scope.subscription_res = function(){

   $scope.subscriptionlist = [];
    var ref = new Firebase("https://27may-1.firebaseio.com/CreateUser");

    ref.orderByChild("email").equalTo("ntadapatri@qmail.com").on("child_added", function(snapshot) {
    
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

  //$state.go('datetime-modal');
  }


  
  

$scope.pass_appointment_1 = function(date,time) {

    var ref = new Firebase("https://27may-1.firebaseio.com/CreateUser");
    ref.orderByChild("email").equalTo("ntadapatri@qmail.com").on("child_added", function(snapshot) {
      console.log('1');
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
              'date': date.toString(),
              'time': time.toString()
        });
    });

    var ref = new Firebase("https://27may-1.firebaseio.com/CreateNutritionist");
    ref.orderByChild("email").equalTo($rootScope.email).on("child_added", function(snapshot) {
      console.log('2');

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
} 
]);


nameApp.controller("MessagesCtrl", ["$scope","$state", "$rootScope","$firebaseArray", function($scope, $state, $rootScope, $firebaseArray) {
 
 $scope.showMessage = function() {

    $scope.result = [];    

    var ref = new Firebase("https://27may-1.firebaseio.com/CreateTrainer/tgn/messenger/tgl");

    ref.orderByKey().on("child_added", function(snapshot) {
    $scope.result.push(snapshot.val());
    console.log(snapshot.val());
    });
    return $scope.result;
  }

  $scope.newMessage = function(msg){

    var reff = new Firebase("https://27may-1.firebaseio.com/CreateTrainer/tgn/messenger");
    
    var refMsg = reff.child("tgl");
    var refMsgg = refMsg.push();

    $scope.emps = $firebaseArray(refMsg);
       $scope.emps.$add({
              'name': 'tgn',
              'msg': msg
       });   
  }

  $scope.showAllMessages = function() {

    $scope.result = [];    
    var ref = new Firebase("https://27may-1.firebaseio.com/CreateTrainer/tgn/messenger");
    ref.orderByKey().on("child_added", function(snapshot) {
    $scope.result.push(snapshot.key());
    });
    console.log($scope.result);
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

  $scope.show_TrainerProfile = function() {
    
    var user ='';
    var reff = new Firebase("https://27may-1.firebaseio.com/CreateTrainer");

    reff.orderByChild("email").equalTo("nt@qmail.com").on("child_added", function(snapshot) {
    $scope.key=snapshot.key();

    var path0 = "https://27may-1.firebaseio.com/CreateTrainer/" + $scope.key ;

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


