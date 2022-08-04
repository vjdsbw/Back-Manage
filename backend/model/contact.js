const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
    email: {
        type: String,
    },
    img: {
        type: String
    },
    email: {
        type: String
    },
    address: {
        type: String,
    },
    tel: {
        type: String
    },
    introduce: {
        type: String
    },
    qq: {
        type: String
    },
    phone: {
        type: String
    }
})

const Contact = mongoose.model("contact", contactSchema, "contact");
module.exports = Contact;