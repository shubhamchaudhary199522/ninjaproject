module.exports.home = function(req, res){
   //for cookies. 
     console.log(req.cookies);
    // to change the value of cookie
   //  res.cookie(user_id, 25);
    // return res.end('<h1> express is up for codeial! </h1>'); //without views. 
     return res.render('home',{
        title: 'Home'
     });
}