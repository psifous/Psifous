const Sequelize = require('sequelize')
const bcrypt = require('bcryptjs')
const Op = Sequelize.Op;

module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('User', {
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
          // Condition for Add User
          let condition = {
            email: value
          }
          // Condition for Edit User
          if (this.id != null) {
            condition = {
              email: value,
              id: {
                [Op.ne]: this.id
              }
            }
          }
          sequelize.models.User.findOne({
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
    }
  }, {});

  User.associate = function(models) {
    User.belongsToMany(models.Community,{through:models.CommunityUser})
  };

  User.hook('beforeSave', (user, options) => {
    const saltRounds = 10;
    const myPlaintextPassword = user.password
    var salt = bcrypt.genSaltSync(saltRounds);
    var hash = bcrypt.hashSync(myPlaintextPassword, salt);

    user.password = hash
  });

  return User;
};