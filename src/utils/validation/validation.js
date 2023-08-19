const validate = async (schema, request) => {
  const result = await schema.validate(request)
  if (result.errors) {
    const { details } = result.errors
    const message = details.map((i) => i.message).join(',')
    throw new Error(message)
  } else {
    return result
  }
}

export { validate }
