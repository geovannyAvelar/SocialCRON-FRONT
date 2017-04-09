app.service('FacebookService', function($facebook) {
  var facebookService = {};

  facebookService.login = function() {
    return $facebook.login()
      .then(function success() {
        return $facebook.getAuthResponse();
      }, function error() {
        return {};
      });
  };

  facebookService.getCurrentProfile = function () {
    return $facebook.api("/me")
      .then(function success(response) {
        return {
                "id": response['id'],
                "name": response['name'], 
                "token": $facebook.getAuthResponse()['accessToken'], 
                "type": "user"
               };
      }, function error(response) {
        return {};
      });
  };

  facebookService.getCurrentUserPages = function() {
    var pages = []

    return $facebook.api("/me/accounts")
      .then(function (response) {
        var accounts = response.data;
        
        for(var i = 0; i < accounts.length; i++) {
          var account = accounts[i];
          pages.push({
                      "id": account['id'],
                      "name": account['name'],
                      "token": account['access_token'], 
                      "type": "page"
                    });

          return pages;  
        }
      });

  };

  facebookService.saveProfiles = function(profiles) {
    for(var i = 0; i < profiles.length; i++) {
      
    }
  };

  return facebookService;
});