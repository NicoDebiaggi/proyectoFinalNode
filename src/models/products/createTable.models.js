import { db } from '../../configs/index.js'

export const createProductTable = async () => {
  try {
    const exists = await db.schema.hasTable('products')
    if (!exists) {
      await db.schema.createTable('products', table => {
        table.increments('id').primary()
        table.string('name').notNullable()
        table.string('description').notNullable()
        table.string('code').notNullable()
        table.integer('stock').notNullable()
        table.decimal('price').notNullable()
        table.string('thumbnail').notNullable()
        table.timestamp('timestamp').defaultTo(db.fn.now())
      })
      console.log('Products table created')
    }
  } catch (error) {
    console.log(error)
  }
}
