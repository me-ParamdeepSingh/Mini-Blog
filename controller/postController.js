import userModel from "../models/userSchema.js";
import userPostModel from "../models/postSchema.js";
import multer from "multer";
import fs from "fs"


const slugify = (str) =>
    str
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, '')
        .replace(/[\s_-]+/g, '-')
        .replace(/^-+|-+$/g, '');


        

class postController {


    // ADD POST

    static addPage = async (req, res) => {
        try {
            const dbData = await userModel.findById(req.session.user_id)
            res.render("add_blog", { dbData, title: "Add A Blog" })
        } catch (error) {
            console.log(error)
        }

    }

    static add = async (req, res) => {

        try {
            const image = req.file.filename;
            console.log(image);
            const dbData = await userModel.findById(req.session.user_id)
            const date = Date.now()
            // const f_date = formatDate(date)
            // console.log(f_date)
            const { title, description, status, slug } = req.body

            const BlogDocs = new userPostModel({
                title: title,
                slug: slugify(slug),
                description: description,
                author: dbData.name,
                image: image,
                // join: f_date,
                status: status
            })
            const result = await BlogDocs.save()
            console.log(result)
        } catch (error) {
            console.log(error)
        }
        res.redirect('/user/post/list')
    }

    // BLOGS LIST

    static list = async (req, res) => {
        try {
            const dbData = await userModel.findById(req.session.user_id)
            const allBlogs = await userPostModel.find({author:dbData.name})
            res.render('blogsList', { dbData, allBlogs: allBlogs, title: "Blogs list" })
        } catch (error) {
            console.log(error)
        }
    }

    // UPDATE BLOG

    static updatePage = async (req, res) => {
        const id = req.params.id;
        try {
            
            const dbData = await userModel.findById(req.session.user_id)
            const data = await userPostModel.findById(id);
            
            res.render('update_blog', { dbData, data: data, title: 'Blog Update Form' })
        } catch (error) {
            console.log(error)
        }
    }

    static update = async (req, res) => {
        try {
            const slug = slugify(req.body.slug)
            console.log(slug)
            const filter = { _id: req.params.id }
            let new_img = ""
            if(req.file){
                new_img = req.file.filename;
                try {
                    fs.unlinkSync('./public/images/blog/'+ req.body.old_image)
                }catch(err){
                    console.log(err);
                }
            }else{
                new_img = req.body.old_image
            }
            const update = { slug: slug}
            const data = await userPostModel.findByIdAndUpdate(req.params.id, req.body);
            const data2 = await userPostModel.findOneAndUpdate(filter, update);
            const data3 = await userPostModel.findOneAndUpdate(filter, new_img);
            // console.log(data)
            res.redirect('/user/post/list')
        } catch (error) {
            console.log(error)
        }
    }

    // VIEW BLOG

    static view = async (req, res) => {
        const id = req.params.id;
        try {
            const dbData = await userModel.findById(req.session.user_id)
            const data = await userPostModel.findById(id);
            const jsonData = JSON.stringify(data);
            res.render('view_blog', { dbData, data: data, jsonData, title: 'View Blog' })
        } catch (error) {
            console.log(error)
        }
    }

    // DELETE BLOG

    static delete = async (req, res) => {
        try {
            const data = await userPostModel.findByIdAndDelete(req.params.id);
            console.log("deleted: ", data)
            res.redirect('/user/post/list')
        } catch (error) {
            console.log(error)
        }
    }


}


export default postController;