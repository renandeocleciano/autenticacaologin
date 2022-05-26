var mongoose = require('mongoose');
import * as bcrypt from 'bcrypt';
import { JwtHandler } from '../core/handlers/jwt-handler';

var schema = mongoose.Schema({
	password:		{ type: String, required: true },
	email: 			{ type: String, required: true },
	created:  		{ type: Date, default: Date.now },
	modified:  		{ type: Date, default: Date.now },
	last_login:  	{ type: Date, default: Date.now },
	profiles:		[{
		profile: { type: String }
	}],
	status:         { type: Number, default: 0 },
	token: 			{ type: String }
},
{
    toObject: { virtuals: true},
	toJSON  : { getters: true }
});

schema.pre('save', function(next) {
	var user = this;
	if (!user.isModified('password')) return next();
	const salt = bcrypt.genSaltSync(10);
	user.password = bcrypt.hashSync(user.password, salt);
	next();
});

schema.pre('findOneAndUpdate', function(next) {
    var user = this;
	user._update.modified = Date.now;
    if(user._update.password) {
        const salt = bcrypt.genSaltSync(10);
        user._update.password = bcrypt.hashSync(user._update.password, salt);
    }
	next();
});

schema.methods.generateAuthToken = async function () {
    const user = this;
    const token = new JwtHandler().jwtSign(user._id);
    user.token = token;
    await user.save();
    return token;
}

module.exports = mongoose.model('User', schema, 'User');