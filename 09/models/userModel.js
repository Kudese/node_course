const { model, Schema } = require('mongoose');
const bcrypt = require('bcrypt');

const { enums } = require('../constants');

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: [true, 'User with this email already exists..'],
      lowercase: true,
    },
    birthyear: {
      type: Number,
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
      select: false,
    },
    avatar: {
      type: String,
      default: 'user.png',
    },
    role: {
      type: String,
      enum: Object.values(enums.USER_ROLES_ENUM),
      default: enums.USER_ROLES_ENUM.USER,
    },
  },
  {
    timestamps: true,
  }
);

// Mongoose pre-save hook. Fires when run create and save methods.
// In case of using this keyword, don't use arrow functions as callback!!
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();

  // Passwords auto-hashing
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);

  next();
});

// Mongoose custom method
userSchema.methods.checkPassword = (candidate, hash) => bcrypt.compare(candidate, hash);

const User = model('User', userSchema);

module.exports = User;
