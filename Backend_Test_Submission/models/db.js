const {open} = require('sqlite')
const sqlite3 = require('sqlite3')
const path = require('path')

const dbpath = path.join(__dirname,  '..',  'shorturls.db')

const connectDB = async () => {
    return open({
        filename :dbpath,
        driver : sqlite3.Database 
    })
}

module.exports = connectDB