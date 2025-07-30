import { Request, Response } from 'express'
import { OAuth2Client } from 'google-auth-library'
import jwt from 'jsonwebtoken'
import { Collection } from 'mongodb'

interface User {
  _id: string
  name: string
  email: string
  password: string
  preferredLanguage: string
  favorites: string[]
}

export class GoogleController {
  constructor(private usersCollection: Collection<User>) { }
  private oAuth2Client = new OAuth2Client(process.env.CLIENT_ID, process.env.CLIENT_SECRET, process.env.REDIRECT_URI)

  handleGoogleRedirect(req: Request, res: Response) {
    this.exchangeCodeForToken(req, res)
  }

  loginWithGoogle(req: Request, res: Response) {
    const url = this.oAuth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: ['https://www.googleapis.com/auth/userinfo.profile', 'https://www.googleapis.com/auth/userinfo.email'],
    })
    res.redirect(url)
  }


  private async exchangeCodeForToken(req: Request, res: Response) {
    try {
      const code = req.query.code as string
      const { tokens } = await this.oAuth2Client.getToken(code)
      this.oAuth2Client.setCredentials(tokens)

      const ticket = await this.oAuth2Client.verifyIdToken({
        idToken: tokens.id_token!,
        audience: process.env.CLIENT_ID,
      })

      const payload = ticket.getPayload()

      if (!payload || !payload.email || !payload.name) {
        return res.status(400).json({ message: 'Invalid Google user info' })
      }

      let user = await this.usersCollection.findOne({ email: payload.email })

      if (!user) {
        const newUserData: User = {
          _id: payload.sub,
          email: payload.email,
          name: payload.name,
          password: '',
          preferredLanguage: 'en',
          favorites: [],
        }

        const insertResult = await this.usersCollection.insertOne(newUserData)
        const createdUser = await this.usersCollection.findOne({ _id: insertResult.insertedId })

        if (!createdUser) {
          return res.status(500).json({ message: 'Failed to create user' })
        }

        user = createdUser
      }


      const token = jwt.sign(
        { userId: user._id, email: user.email },
        process.env.JWT_SECRET!,
        { expiresIn: '1h' }
      )


      res.redirect(`http://localhost:5173/oauth-success?token=${token}`)
    } catch (err) {
      console.error(err)
      res.status(500).json({ message: 'OAuth error', error: (err as Error).message })
    }
  }

}
