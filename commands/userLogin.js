// command to login a user
exports.command = function(client, login, password, callback) {

  this.execute(function(client, login, password) {
    return
  }, [client, login, password], function(result) {
    if (callback) { callback.call(this, result); }
  });

  return this;
}
