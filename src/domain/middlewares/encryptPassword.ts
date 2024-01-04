import { UserSchema } from "../entities/user";
import bcrypt from 'bcrypt'

const encodePassword = () => {

    UserSchema.pre('save', function (next) {
        const user = this;

        const saltRounds = parseInt(process.env.SALT || '8', 10);

        if (this.isModified('password') || this.isNew) {
            bcrypt.hash(user.password, saltRounds, function (error, hash) {
                if (error) {
                    return next(error)
                }

                user.password = hash
                next()
            })
        }
        else {
            return next()
        }

    })
}

export default encodePassword

