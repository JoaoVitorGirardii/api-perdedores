import bcrypt from 'bcrypt'

class HashBcrypt {
    async GeraHash(pass: string) {
        const pepper = process.env.PEPPER_KEY
        const saltRounds = 11
        const passwordWithPepper = pass + pepper
        console.log('NOVA SENHA: ', passwordWithPepper)
        const hashedPassword = await bcrypt.hash(passwordWithPepper, saltRounds)

        return hashedPassword
    }

    async checkPassword(hash: string, pass: string) {
        const pepper = process.env.PEPPER_KEY
        const passwordWithPepper = pass + pepper
        console.log(hash, passwordWithPepper)
        const match = await bcrypt.compare(passwordWithPepper, hash)
        console.log('match: ', match)
        return match
    }
}

export const HashPass = new HashBcrypt()
