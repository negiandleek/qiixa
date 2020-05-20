import {ErrorRequestHandler} from 'express'

export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  res.status(500)
  res.render('error', { error: err })
}