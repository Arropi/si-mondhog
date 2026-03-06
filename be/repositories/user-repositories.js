import User from "../models/user-model.js"

export async function findUserByEmail(email) {
    try {
        const user = await User.findOne({ email })
        return user
    } catch (error) {
        console.log(error)
        throw error
    }
}

export async function createUser(name, email) {
    try {
        const newUser = new User({ name, email })
        await newUser.save()
        return newUser
    } catch (error) {
        console.log(error)
        throw error
    }
}

export async function findUserById(id) {
    try {
        const user = await User.findById(id)
        return user
    } catch (error) {
        throw error
    }
}

export async function updateUserProfile(id, name) {
    try {
        const updatedUser = await User.findByIdAndUpdate(id, { name }, { new: true })
        return updatedUser
    } catch (error) {
        throw error
    }
}