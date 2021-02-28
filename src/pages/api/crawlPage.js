const fetch = require('node-fetch')

const accessList = ['https://nova93.github.io']

exports.handler = (res, req) => {
  const { query } = req;

  

  if (!params.url || !accessList.includes(origin)) {
    const errorResponse = {
      statusCode: 400,
      body: "Unable get url from 'url' query parameter"
    }

    callback(null, errorResponse)

    return
  }

  return new Promise((resolve, reject) => {
    const originalRequestBody = event.body
    request(
      {
        url: params.url,
        method: event.httpMethod,
        timeout: 20000,
        json:
          event.httpMethod === 'POST' ? JSON.parse(originalRequestBody) : null,
        headers
      },
      (err, originalResponse, body) => {
        if (err) {
          console.log('Got error', err)

          callback(err)

          reject(err)

          return
        }

        console.log(
          `Got response from ${params.url} ---> {statusCode: ${originalResponse.statusCode}}`
        )
        const proxyBody = originalRequestBody
          ? JSON.stringify(body)
          : originalResponse.body

        const proxyResponse = {
          statusCode: originalResponse.statusCode,
          headers: {
            'Access-Control-Allow-Origin': '*', // Required for CORS support to work
            'Access-Control-Allow-Credentials': 'true', // Required for cookies, authorization headers with HTTPS
            'content-type': originalResponse.headers['content-type']
          },
          body: proxyBody
        }

        callback(null, proxyResponse)

        resolve(proxyResponse)
      }
    )
  })
}