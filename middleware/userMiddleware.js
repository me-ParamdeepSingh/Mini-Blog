

const isLogin = async(req,res,next)=>{
    try {
        if(req.session.user_id){
            next()
        }else{
            res.redirect('/user/login');
        }
    } catch (error) {
        console.log(error.message)
    }
}



// Is Logout Middleware
const isLogout = async(req,res,next)=>{
    try {
        if(req.session.user_id){
            res.redirect('/');
        }else{
            next()
        }
    } catch (error) {
        console.log(error.message)
    }
}

// user register Middleware
const registerMid = async(req,res,next)=>{
    try {
        if(req.session.user_id){
            next()
        }else{
            res.redirect('/user/register');
        }
    } catch (error) {
        console.log(error.message)
    }
}

export {isLogin,isLogout,registerMid}