
module.exports = {
  'tags': ['smoke'],

  'Search Test': function (client) {
    var home = client.page.home();

    home.openPage(client.launch_url)
    .setValue('@searchBar', 'dublin')
    .submit();

    client.end();
  }
};
