const Sequelize = require('sequelize')
const bcrypt = require('bcryptjs')
const Op = Sequelize.Op;

module.exports = (sequelize, DataTypes) => {
  var Admin = sequelize.define('Admin', {
    email:{
      type : Sequelize.STRING,
      allowNull : false,
      unique : true,
      validate: {
        isEmail: {
          args: true,
          msg: 'Email format is incorrect'
        },
        isUnique(value, next) {
          // Condition for Add Admin
          let condition = {
            email: value
          }
          // Condition for Edit Admin
          if (this.id != null) {
            condition = {
              email: value,
              id: {
                [Op.ne]: this.id
              }
            }
          }
          sequelize.models.Admin.findOne({
            where: condition
          })
          .then(emailInput => {
            if (emailInput) {
              next('Email is already exist');
            } else {
              next()
            }
          })
          .catch(err => {
            next(err);
          })
        }
      }
    },
    first_name:{
      type : Sequelize.STRING,
      allowNull : false,
    },
    last_name:{
      type : Sequelize.STRING,
      allowNull : false,
    },
    password:{
      type : Sequelize.STRING,
      allowNull : false
    },
    CommunityId:{
      type : Sequelize.INTEGER,
      allowNull : false
    },
  }, {});

  Admin.associate = function(models) {
    Admin.belongsTo(models.Community)
  };

  Admin.hook('beforeSave', (admin, options) => {
    const saltRounds = 10;
    const myPlaintextPassword = admin.password
    var salt = bcrypt.genSaltSync(saltRounds);
    var hash = bcrypt.hashSync(myPlaintextPassword, salt);

    admin.password = hash
  });

  return Admin;
};