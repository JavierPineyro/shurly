function unknownEndpoint (req, res) {
  res.status(404).json({
    message: 'Not supported endpoint',
    endpoints: {
      'short[POST]': '/api/short',
      'Url[GET]': '/:id'
    }
  })
}

export default unknownEndpoint
