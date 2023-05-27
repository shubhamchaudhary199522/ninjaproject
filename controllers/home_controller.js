module.exports.home = function(req, res){
    // return res.end('<h1> express is up for codeial! </h1>'); //without views. 
     return res.render('home',{
        title: 'Home'
     });
}