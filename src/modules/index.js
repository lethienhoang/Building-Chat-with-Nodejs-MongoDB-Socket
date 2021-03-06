const userRoutes = require('./users/user.route');
const authRoutes = require('./auths/auth.route');
const roomRoutes = require('./rooms/room.route');

module.exports = function(app) {
    app.use('/user', userRoutes);
    app.use('/auth', authRoutes);
    app.use('/room', roomRoutes);
}