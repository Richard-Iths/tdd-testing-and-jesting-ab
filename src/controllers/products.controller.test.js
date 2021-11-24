import productsController from './products.controller.js'
import { jest } from '@jest/globals'

import db from '../database/db.database.js'
await db.sync(db.sequelize, true)

describe('products controller', () => {
  const res = {}
  beforeEach(() => {
    res.json = jest.fn()
  })

  it('should return all products', async () => {
    const expected = JSON.stringify({
      data: []
    })
    const testData = JSON.stringify({
      data: []
    })
    res.json.mockReturnValueOnce(testData)

    //const jsonSpy = jest.spyOn(productsController, 'getAllProducts').mockImplementation()

    try {
      const result = await productsController.getAllProducts(_, res, _)
      expect(result).toStrictEqual(expected)
      //expect(jsonSpy).toHaveBeenCalled()
    } catch (error) {
      console.log(error)
    }
  })
})
