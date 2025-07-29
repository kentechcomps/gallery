<<<<<<< HEAD
var config = {};

config.mongoURI = {
  production:  'mongodb+srv://kenchez:EFciTaCLDRPTzGKb@cluster0.zip3qe5.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0',
  development: 'mongodb+srv://kenchez:EFciTaCLDRPTzGKb@cluster0.zip3qe5.mongodb.net/darkroom-dev?retryWrites=true&w=majority&appName=Cluster0',
  test: 'mongodb+srv://kenchez:EFciTaCLDRPTzGKb@cluster0.zip3qe5.mongodb.net/darkroom-test?retryWrites=true&w=majority&appName=Cluster0',
};
module.exports = config;

=======
var config = {}

// Update to have your correct username and password
config.mongoURI = {
    production: 'mongodb+srv://<USERNAME>:<PASSWORD>@gallery.wc344.mongodb.net/darkroom?retryWrites=true&w=majority',
    development: 'mongodb+srv://<USERNAME>:<PASSWORD>@gallery.wc344.mongodb.net/darkroom-dev?retryWrites=true&w=majority',
    test: 'mongodb+srv://<USERNAME>:<PASSWORD>@gallery.wc344.mongodb.net/darkroom-test?retryWrites=true&w=majority',
}
module.exports = config;
>>>>>>> test
