app.service('Session', function($cookies) {
  var session = {};
 
  session.create = function(token) {
    $cookies.put('token', token);
  };
 
  session.getToken = function() {
    return $cookies.get('token');
  };
 
  session.saveUsername = function(name) {
    $cookies.put('username', name);
  };
 
  session.getUsername = function() {
    return $cookies.get('username');
  };

  session.saveEmail = function(email) {
    $cookies.put('email', email);
  };
 
  session.getEmail = function() {
    return $cookies.get('email');
  };
 
  session.destroy = function() {
    $cookies.remove('token');
    $cookies.remove('username');
    $cookies.remove('email');
  };
 
  return session;
});