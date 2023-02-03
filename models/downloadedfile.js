const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const DownloadedFile =  sequelize.define('DownloadedFile',{

    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        allowNull: false,
        primaryKey: true
    },
    Download:{
        type:Sequelize.STRING,
        allowNull: false
    }
});

module.exports = DownloadedFile;