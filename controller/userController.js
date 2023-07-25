import bcrypt from "bcrypt";
import userModel from "../models/userSchema.js";
import nodemailer from "nodemailer"
import userPostModel from "../models/postSchema.js";


// Random number generator
function getRandom(length) {

    return Math.floor(Math.pow(10, length - 1) + Math.random() * 9 * Math.pow(10, length - 1));

}

// SEND EMAIL

const sendVerfifyMail = async (name, id, email) => {
    try {
        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            requireTLS: true,
            secure: false,
            auth: {
                user: 'princesandhu1011@gmail.com',
                pass: 'ylqgjkidlykmtdde',
            },
        });

        let link = "http://127.0.0.1:8080/user/verify?id=" + getRandom(10)
        const mailoptions = {
            from: "princesandhu1011@gmail.com",
            to: email,
            subject: 'For Verfication Mail',
            html: '<p> Hello ' + name + ' ' + link + ' ' + 'click here</a> Your Account</p>'
        };
        transporter.sendMail(mailoptions, async (error, info) => {
            if (error) {
                console.log(error)
            } else {
                await userModel.findByIdAndUpdate(id, { verify_link: link });
                console.log("Email has been send" + info.response)
            }
        })
    } catch (error) {
        console.log(error)
    }
}

const sendChangePasswordMail = async (name, id, email) => {
    try {
        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            requireTLS: true,
            secure: false,
            auth: {
                user: 'princesandhu1011@gmail.com',
                pass: 'ylqgjkidlykmtdde',
            },
        });

        const mailoptions = {
            from: "princesandhu1011@gmail.com",
            to: email,
            subject: 'For Verfication Mail',
            html: '<p> Hello ' + name + ' , Please <a href="http://127.0.0.1:8080/change-password?id=' + id + '">click here</a> Your Account</p>'
        };
        transporter.sendMail(mailoptions, (error, info) => {
            if (error) {
                console.log(error)
            } else {
                console.log("Email has been send" + info.response)
            }
        })
    } catch (error) {
        console.log(error)
    }
}


// SECURE PASSWORD

const securePassword = async (password) => {
    try {
        const passwordHash = await bcrypt.hash(password, 10)
        return passwordHash;
    } catch (error) {
        console.log(error)
    }
}

class userController {

    // REGISTER USER

    static userRegisterPage = async (req, res) => {
        let data = {
            login_check: "no"
        }
        res.render('register', { data: data })
    }

    static userRegisterCheck = async (req, res) => {
        console.log(req.body.username)
        var username = await userModel.findOne({ username: req.body.username })
        if (!username) {
            res.send('available')
        } else {
            res.send('none')
        }

    }

    static userRegister = async (req, res) => {
        try {
            const { name, username, age, email, city } = req.body
            const encryptPwd = await securePassword(req.body.password)
            const userRecord = new userModel({
                name: name,
                username: username,
                age: age,
                email: email,
                city: city,
                password: encryptPwd,
            })
            if (userRecord) {
                const dbData = await userRecord.save()
                let data = {
                    login_check: "no"
                }
                if (dbData) {
                    sendVerfifyMail(name, dbData.id, email)
                    res.render('register', { msg: "Please check your email id for verfication", data: data })
                }
            }
        } catch (error) {
            console.log(error)
        }
    }

    static verifyAccount = async (req, res) => {
        try {

            let fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
            console.log(fullUrl)
            const user = await userModel.find({ verify_link: fullUrl });
            if (user == "") {
                res.send('<h3>invalid link or account</h3>')
            } else {
                const updateInfo = await userModel.findOneAndUpdate({verify_link: fullUrl}, { is_verify: 'true', fail_count: 0 })
                res.send('<h3>Your account has been verfied. Please <a href="/user/login">login</a></h3>')
            }
        } catch (error) {
            console.log(error)
        }


    }

    // LOGIN USER

    static userLoginPage = async (req, res) => {
        let data = {
            login_check: "no"
        }
        res.render('login', { data: data })
    }


    static userLogin = async (req, res) => {
        try {
            const email = req.body.email
            const password = req.body.password
            const dbData = await userModel.findOne({ email: email })
            const login_check = "no"

            // console.log(dbData)
            if (dbData) {
                const pwdMatch = await bcrypt.compare(password, dbData.password)
                if (pwdMatch == true) {
                    if (dbData.is_verify == 'true') {
                        req.session.user_id = dbData.id
                        console.log(req.session.user_id)
                        // let c_time = Date.now()
                        // await userModel.findByIdAndUpdate(dbData.id, {session_time: c_time})
                        await userModel.findByIdAndUpdate(dbData.id, { fail_count: 0 })
                        res.redirect("/user")
                    } else {
                        res.render("login", { msg: 'Please verify your email first', data: dbData, login_check: login_check })
                    }
                } else {
                    if (dbData.fail_count > 3) {
                        sendVerfifyMail(dbData.name, dbData.id, dbData.email)
                        await userModel.findByIdAndUpdate(dbData.id, { is_verify: 'false' });
                        res.render("login", { msg: 'Too Many failed attempt, Verfication link send to your email' })
                    } else {
                        let current_fail_count = dbData.fail_count + 1
                        await userModel.findByIdAndUpdate(dbData.id, { fail_count: current_fail_count });
                        res.render("login", { msg: 'Invalid Email or Password', login_check: login_check })
                    }
                }
            } else {
                res.render("login", { msg: 'Invalid Email or Password' })
            }
        } catch (error) {
            console.log(error)
        }
    }

    // LOGOUT USER

    static userLogout = async (req, res) => {
        try {
            if (req.session.user_id) {
                req.session.destroy()
                res.redirect('/user/login')
            }
        } catch (error) {
            console.log(error.message)
        }
    }


    // USER PANEL

    static userPanel = async (req, res) => {
        try {
            const dbData = await userModel.findById(req.session.user_id)
            const data = {
                my_blogs_count: await userPostModel.countDocuments({ author: dbData.name }),
                blogs_count: await userPostModel.count('id'),
                recent_data: await userPostModel.find().limit(5)
            }

            res.render("userpanel", { dbData, data: data, title: "Dashboard" })
        } catch (error) {
            console.log(error)
        }

    }




}

export default userController
