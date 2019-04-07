const userRoutes = require('./users/user.route');
const authRoutes = require('./auths/auth.route');

module.exports = function(app) {
    app.use('/user', userRoutes);
    app.use('/auth', authRoutes);
}