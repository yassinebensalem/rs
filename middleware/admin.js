

module.exports = function(req, res, next){
    // here we're assuming that this middleware func after our auth middleware func
    // so our auth middleware function sets req.user that why we can access that in this func
    //  request processing pipeline
    if(!req.user.admin) return res.status(403).send('Access denied');
    next();
};

//401 unauthorized : we use this when the user tries to access a protected ressource but they don't supply
// a valid json web token so we gives them  a chance  to resend the jwt if  they send a valid web token
// and they're still not allowed  to access the target ressource that's when we use 403
//403 forbidden