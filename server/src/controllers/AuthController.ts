import { Request, Response } from 'express'
import bcrypt from 'bcryptjs'
import UserModel from '../models/UserModel'
import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET

export const register = async (req: Request, res: Response) => {
  const { firstName, lastName, username, email, password, avatar } = req.body

  if (!firstName || !lastName || !username || !email || !password) {
    return res.status(400).json({ msg: 'Please enter all fields!' })
  }

  if (password.length < 6) {
    return res
      .status(400)
      .json({ msg: 'Password must be at least 6 characters long!' })
  }

  // Check if user already exists
  const checkedEmail = await UserModel.findOne({ email })

  if (!checkedEmail) {
    bcrypt.hash(password, 10).then(async (hash: any) => {
      await UserModel.create({
        firstName,
        lastName,
        username,
        email,
        password: hash,
        avatar,
      })
        .then((user) => {
          const maxAge = 3 * 60 * 60
          const token = jwt.sign({ id: user._id, email }, JWT_SECRET, {
            expiresIn: maxAge,
          })

          res.cookie('jwt', token, {
            httpOnly: true,
            maxAge: maxAge * 1000,
          })

          res
            .status(201)
            .json({ msg: 'User registered successfully!', user: user._id })
        })
        .catch((error) => {
          res.status(400).json({ msg: 'User was not created!', error: error })
        })
    })
  } else {
    return res.status(400).json({ msg: 'User already exists!' })
  }
}

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body

  if (!email || !password) {
    return res.status(400).json({ msg: 'Please enter all fields!' })
  }

  try {
    const user = await UserModel.findOne({ email })

    if (!user) {
      return res.status(400).json({ msg: 'User does not exist!' })
    } else {
      bcrypt.compare(password, user.password).then((result) => {
        if (result) {
          const maxAge = 3 * 60 * 60
          const token = jwt.sign({ id: user._id, email }, JWT_SECRET, {
            expiresIn: maxAge,
          })

          res.cookie('jwt', token, {
            httpOnly: true,
            maxAge: maxAge * 1000,
          })

          res
            .status(200)
            .json({ msg: 'User logged in successfully!', user: user._id })
        } else {
          res.status(400).json({ msg: 'Invalid credentials!' })
        }
      })
    }
  } catch (error) {
    res.status(500).json({ msg: 'An error has occurred!', error: error })
  }
}

export const deleteAccount = async (req: Request, res: Response) => {
  const { id } = req.params

  try {
    await UserModel.findByIdAndDelete(id).then(() => {
      res.status(200).json({ msg: 'User deleted successfully!' })
    })
  } catch (error) {
    res.status(500).json({ msg: 'An error has occurred!', error: error })
  }
}
