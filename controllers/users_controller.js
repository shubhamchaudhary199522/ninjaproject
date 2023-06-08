    const User = require('../models/user');
    
    module.exports.profile = function(req, res){
    //  return res.end('<h1> user profile </h1>');  // this is without views. 
          return res.render('user_profile', {
          title: 'User Profile'
      });
  
   //  try {
   //    if (req.cookies.user_id){
   //       const user = await User.findById(req.cookies.user_id).exec();
   //       if (user){
   //               return res.render('user_profile',{
   //                 title: "user profile",
   //                 user: user
   //            })
   //       } else{
   //          return res.redirect('/users/sign-in');
   //       } 
   //    }
   //  } catch (err) {
   //    console.log('error in go to profile page', err);
   //  }
         
  
}

// render the sign up page. 
module.exports.signUp = function(req, res){

   if (req.isAuthenticated()){
        return res.redirect('/users/profile')
   }

   return res.render('user_sign_up',{
      title: 'Codeial | Sign Up'
   });
}

//render the sign page.
module.exports.signIn = function(req, res){
   if (req.isAuthenticated()){
      return res.redirect('/users/profile')
 }
   return res.render('user_sign_in', {
      title: 'Codeial | Sign In'
   });
}

// get the sign up data. 
module.exports.create = async function(req, res){
   if (req.body.password != req.body.confirm_password){
      res.redirect('back');
   }
 try
     {
       const user = await User.findOne({email: req.body.email}).exec();
       if (!user){
         const newUser = await User.create(req.body);
         return res.redirect('/users/sign-in');
        } else 
        return res.redirect('back');
       } catch (err) {
         console.log('error in creating the user while signing-up', err);
       }
   
}


module.exports.createSession = function(req, res){
  res.redirect('/');
  }

  module.exports.destroySession = function(req, res){
   req.logout((err) => {
     if(err){
      console.log('error in loging out', err);
     }
   });
   res.redirect('/');
  }