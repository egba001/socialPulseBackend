const Business = require('./../models/business');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


exports.signup = (req, res, next) => {
    Business.find({ businessEmail: req.body.businessEmail }).exec()
    .then(business => {
        if(business.length >= 1) {
            res.status(409).json({
                message: "Email already registered"
            })
        } else {
            bcrypt.hash(req.body.password, 10, (err, hash) => {
                if(err)  {
                    res.status(500).json({
                        error: err
                    })
                } else {
                    const business = new Business({
                        fullName: req.body.fullname,
                        businessName: req.body.businessName,
                        businessEmail: req.body.businessEmail,
                        password: hash
                    })
                    business.save()
                    .then(result => {
                        res.status(201).json({
                        message: "User Created"
                    })
                })
                .catch(err => {
                    console.log(err);
                    res.status(500).json({
                        error: err
                    })
                })
                }
            })
        }
    })
    .catch(err => console.log(err))
}

exports.login = (req, res, next) => {
    Business.find({ businessEmail: req.body.businessEmail }).exec()
    .then(business => {
        if(business.length < 1) {
            res.status(401).json({
                message: "Business Email not found"
            })
        }
        bcrypt.compare(req.body.password, business[0].password, (err, result) => {
            if (err) {
                res.status(401).json({
                    message: "Incorrect password"
                })
            }
            if(result) {
                const token = jwt.sign({
                    businessEmail: business[0].businessEmail,
                    id: business[0]._id
                }, process.env.JWT_KEY,
                {
                    expiresIn: "1hr"
                })
                res.status(200).json({
                    message: "Authentication Successful",
                    token: token
                })
            }
            // res.status(401).json({
            //     message: "Business email or password incorrect"
            // })
        })
    }).catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        })
    })
}