import userPostModel from "../models/postSchema.js";
import userModel from "../models/userSchema.js";

class commonController {

    static home = async (req, res) => {
        try {
            let data = {
                login_check: req.session.user_id ? "yes" : "no",
                allpost: await userPostModel.find({}),
                user: await userModel.findById(req.session.user_id)
            }

            res.render('index', { data: data });
        } catch (error) {
            console.log(error.message)
        }
    }

    static about = async(req,res)=>{
        try {
            let data = {
                login_check : req.session.user_id ? "yes" : "no",
                user : await userModel.findById(req.session.user_id)
            }
            res.render('about',{data: data})
        } catch (error) {
            console.log(error.message);
        }
    }

    static blog = async (req, res) => {
        try {
            let data = {
                login_check: req.session.user_id ? "yes" : "no",
                user: await userModel.findById(req.session.user_id),
                blogs: await userPostModel.find({ status: "Active" })
            }
            res.render('blogGrid', { data: data })
        } catch (error) {
            console.log(error.message);
        }
    }

    static blogSingle = async (req, res) => {
        try {
            let data = {
                login_check: req.session.user_id ? "yes" : "no",
                user: await userModel.findById(req.session.user_id),
                blog: await userPostModel.find({ slug: req.params.slug }),
                blogs: await userPostModel.find().limit(3)
            }
            let blog = await userPostModel.findOne({slug: req.params.slug })
            console.log(blog.title);
            res.render('blogSingle', { data: data,blog:blog });
        } catch (error) {
            console.log(error.message);
        }
    }

    static blogSidebar = async (req, res) => {
        try {
            let data = {
                login_check: req.session.user_id ? "yes" : "no",
                user: await userModel.findById(req.session.user_id)
            }
            res.render('blogSidebar', { data: data })
        } catch (error) {
            console.log(error.message);
        }
    }

    static contact = async(req,res)=>{
        try {
            let data = {
                login_check : req.session.user_id ? "yes" : "no",
                user : await userModel.findById(req.session.user_id)
            }
            res.render('contact',{data: data})
        } catch (error) {
            console.log(error.message);
        }
    }

    static services = (req,res)=>{
        try {
            res.render('service') 
        } catch (error) {
            console.log(error.message);
        }
    }

    static pricing = (req,res)=>{
        try {
            res.render('pricing')
        } catch (error) {
            console.log(error.message);
        }
    }

    static project = (req,res)=>{
        try {
            res.render('project')
        } catch (error) {
            console.log(error.message);
        }
    }
    
}

export default commonController