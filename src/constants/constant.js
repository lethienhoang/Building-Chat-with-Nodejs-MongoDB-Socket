module.exports =  Object.freeze({    
    SALT_WORK_FACTOR: 10,
    PASSWORD_REG: /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/,
    JWT_SECRET: 'jwtPrivateKey'
});
