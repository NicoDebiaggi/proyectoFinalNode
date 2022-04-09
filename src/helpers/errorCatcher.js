export const getError = (errorCode, errorMsg) => {
  const error = {
    status: 500,
    message: 'Internal server error'
  }
  switch (errorCode) {
    case 'PRODUCT_NOT_FOUND':
      error.status = 404
      error.message = errorMsg || 'Product not found'
      break
    case 'PRODUCT_ALREADY_EXISTS':
      error.status = 409
      error.message = errorMsg || 'Product already exists'
      break
    case 'PRODUCT_OUT_OF_STOCK':
      error.status = 409
      error.message = errorMsg || 'Product out of stock'
      break
    case 'PRODUCT_NOT_CREATED':
      error.status = 500
      error.message = errorMsg || 'Product not created'
      break
    case 'PRODUCT_NOT_UPDATED':
      error.status = 500
      error.message = errorMsg || 'Product not updated'
      break
    case 'PRODUCT_NOT_DELETED':
      error.status = 500
      error.message = errorMsg || 'Product not deleted'
      break
    case 'CART_NOT_FOUND':
      error.status = 404
      error.message = errorMsg || 'Cart not found'
      break
    case 'ER_NO_DEFAULT_FOR_FIELD':
      error.status = 422
      error.message = errorMsg || 'Invalid data'
      break
    case 'ER_DUP_ENTRY':
      error.status = 409
      error.message = errorMsg || 'Duplicate entry'
      break
    case 'ER_BAD_NULL_ERROR':
      error.status = 422
      error.message = errorMsg || 'Invalid data'
      break
    case 'ER_NO_REFERENCED_ROW':
      error.status = 422
      error.message = errorMsg || 'Invalid data'
      break
    case 'UNAUTHORIZED':
      error.status = 401
      error.message = errorMsg || 'Not authorized'
      break
    default:
      break
  }
  return error
}
