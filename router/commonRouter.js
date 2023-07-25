import express from 'express';
const commonRouter = express.Router();
import commonController from '../controller/commonController.js';


// routes

commonRouter.get('/',commonController.home);
commonRouter.get('/about',commonController.about)
commonRouter.get('/blog',commonController.blog);
commonRouter.get('/blog/:slug',commonController.blogSingle);
commonRouter.get('/icrement',(req,res)=>{
    for (let i = 0; i>10; i++) {
        console.log(i);
    }
    res.send("chech console")
});

export default commonRouter;