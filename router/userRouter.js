import express from 'express';
const userRouter = express.Router();
import userController from '../controller/userController.js';
import { isLogin,isLogout,registerMid } from '../middleware/userMiddleware.js';



// routes

userRouter.get('/',isLogin,userController.userPanel)
userRouter.get('/register',userController.userRegisterPage);
userRouter.get('/register/checkusername',userController.userRegisterCheck)
userRouter.post('/register',userController.userRegister);
userRouter.get('/verify:id?',userController.verifyAccount);
userRouter.get('/login',isLogout,userController.userLoginPage);
userRouter.post('/login',isLogout,userController.userLogin);
userRouter.get('/logout',isLogin,userController.userLogout)


export default userRouter;