import { db } from '../../configs/index.js'

export const createCartTable = async () => {
  try {
    const exists = await db.schema.hasTable('carts')
    if (!exists) {
      await db.schema.createTable('carts', table => {
        table.increments('id').primary()
        table.timestamp('timestamp').defaultTo(db.fn.now())
      })
    }
    const exists2 = await db.schema.hasTable('cart_items')
    if (!exists2) {
      await db.schema.createTable('cart_items', table => {
        table.increments('id').primary()
        table.integer('cart_id').unsigned().references('id').inTable('carts')
        table.integer('product_id').unsigned().references('id').inTable('products')
        table.integer('quantity').defaultTo(1)
        table.timestamp('timestamp').defaultTo(db.fn.now())
      })
    }
  } catch (error) {
    console.log(error)
  }
}
