import api from '../api-gateway';

class AuthController {
    constructor() {
        this.isAuthenticated = null;
    }

    authenticate(username, password, cb) {
        api.put('/auth', { username, password }, (err, res) => {
            if (err) return cb(err);
            this.isAuthenticated = true;
            return cb(null, res);
        });
    }

    register(form, cb) {
        let user = {
            name: form.name,
            username: form.username,
            email: form.email,
            username: form.username,
            password: form.password
        };
        api.post('/users', user, (err, res) => {
            if (err) return cb(err);
            this.authenticate(user.username, user.password, cb);
        });
    }

    verify(cb) {
        api.get('/auth', (err, res) => {
            if(err) return cb(err);
            this.isAuthenticated = true;
            cb(null);
        });
    }

    logout(cb){
        // TODO: blacklist the token on the server for added security (requires async call, hence the cb argument)
        document.cookie = "auth=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        this.isAuthenticated = false;
        cb();
    }
}

const controller = new AuthController();

export default controller;
