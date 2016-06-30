import mongoose from 'mongoose';
let userSchema = mongoose.Schema({
  'name': String,
  'age': Number
})
var User = mongoose.model('User', userSchema);
export default User;

