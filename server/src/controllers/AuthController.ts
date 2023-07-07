import { Request, Response } from 'express'
import UserModel from '../models/UserModel'

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

  try {
    await UserModel.create({
      firstName,
      lastName,
      username,
      email,
      password,
      avatar,
    }).then((user) => {
      res.status(200).json({ msg: 'User created successfully!', user })
    })
  } catch (error) {
    res.status(500).json({ msg: error, error: error })
  }
}

export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body

  if (!username || !password) {
    return res.status(400).json({ msg: 'Please enter all fields!' })
  }

  try {
    const user = await UserModel.findOne({ username })
    if (!user) {
      return res.status(400).json({ msg: 'User does not exist!' })
    } else {
      res.status(200).json({ msg: 'User logged in successfully!', user })
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
