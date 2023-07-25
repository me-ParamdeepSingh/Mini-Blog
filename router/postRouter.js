import express from 'express';
const postRouter = express.Router();
import postController from '../controller/postController.js';
import multer from 'multer';
import { isLogin,isLogout,registerMid } from '../middleware/userMiddleware.js';


// img upload

var storage = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null,'public/images/blog')
    },
    filename: function(req,file,cb) {
        const img_name = file.fieldname + "_" + Date.now() + "_" + file.originalname;     
        cb(null, img_name);
    },
});

var upload = multer({storage: storage}); 


// routes

postRouter.get('/add',isLogin,postController.addPage)
postRouter.post('/add',isLogin,upload.single("image"),postController.add)
postRouter.get('/list',isLogin,postController.list)
postRouter.get('/update/:id',isLogin,postController.updatePage)
postRouter.post('/update/:id',isLogin,postController.update)
postRouter.get('/view/:id',isLogin,postController.view)
postRouter.get('/delete/:id',isLogin,postController.delete)


export default postRouter