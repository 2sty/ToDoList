module.exports.getConfig = function(){
const config = {
  username: "admin-arek",
  password: "arek1234",
  db:"@cluster0.egkho.mongodb.net/todolistDB?retryWrites=true&w=majority"
};
return config;
}
