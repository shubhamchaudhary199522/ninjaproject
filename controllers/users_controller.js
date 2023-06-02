    const User = require('../models/user');
    
    module.exports.profile = async function(req, res){
    //  return res.end('<h1> user profile </h1>');  // this is without views.  
    try {
      if (req.cookies.user_id){
         const user = await User.findById(req.cookies.user_id).exec();
         if (user){
                 return res.render('user_profile',{
                   title: "user profile",
                   user: user
              })
         } else{
            return res.redirect('/users/sign-in');
         } 
      }
    } catch (err) {
      console.log('error in go to profile page', err);
    }
         
  
}

// render the sign up page. 
module.exports.signUp = function(req, res){
   return res.render('user_sign_up',{
      title: 'Codeial | Sign Up'
   });
}

//render the sign page.
module.exports.signIn = function(req, res){
   return res.render('user_sign_in', {
      title: 'Codeial | Sign In'
   });
}

//get the sign up data. 
// module.exports.create = async function(req, res){
//    if (req.body.password != req.body.confirm_password){
//       res.redirect('back');
//    }
//  try
//      {
//        const user = await User.findOne({email: req.body.email}).exec();
//        if (!user){
//          const newUser = await User.create(req.body);
//          return res.redirect('/users/sign-in');
//         } else 
//         return res.redirect('back');
//        } catch (err) {
//          console.log('error in creating the user while signing-up', err);
//        }
   
// }

//sign in and create the session for user. 
// module.exports.createSession = async function(req, res){
//    //steps to authenticate
//    //find the user
//    try{
//       const user = await User.findOne({email: req.body.email}).exec();
//       //handle user found. 
//       if (user){
//          // handle password doesn't match.
//          if (user.password != req.body.password){
//             return res.redirect('back');
//          }

//          res.cookie('user_id', user.id);
//          return res.redirect('/users/profile');
//       } else {
//            res.redirect('back');
//       }
//    } catch(err) {
//       console.log('error in signing-in', err);
//    }
   

   
// }