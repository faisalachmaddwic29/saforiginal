import { defineEventHandler, getRequestHeaders, readBody, createError } from 'h3'
import { useRuntimeConfig } from '#imports'
import { decompress } from '@mongodb-js/zstd'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const backendUrl = config.apiUrl
  const path = event.path.replace('/api/source', '')
  const targetUrl = `${backendUrl}${path}`
  const method = event.node.req.method || 'GET'

  console.log(`Proxying ${method} request to: ${targetUrl}`)

  const headers = {
    ...getRequestHeaders(event),
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Accept-Encoding': 'gzip, deflate, br' // Hapus zstd untuk sementara
  }

  // Remove problematic headers
  delete headers['host']
  delete headers['content-length']

  try {
    // Gunakan fetch native daripada $fetch untuk kontrol lebih baik
    const response = await fetch(targetUrl, {
      method,
      headers,
      body: ['POST', 'PUT', 'PATCH'].includes(method) ? await readBody(event) : undefined
    })

    // Handle non-200 responses
    if (!response.ok) {
      throw createError({
        statusCode: response.status,
        statusMessage: response.statusText
      })
    }

    // Get content encoding
    const contentEncoding = response.headers.get('content-encoding')

    // Handle compressed response
    let data
		if (contentEncoding === 'zstd') {
			const buffer = await response.arrayBuffer()
			const decompressed = await decompress(Buffer.from(buffer))
			data = JSON.parse(decompressed.toString())
		}
    // if (contentEncoding === 'zstd') {
    //   // Jika backend tetap mengirim zstd, kita perlu dekode
    //   // Di sini Anda perlu mengimplementasikan zstd decompression
    //   // Contoh sederhana (membutuhkan package zstd decoder)
    //   throw createError({
    //     statusCode: 500,
    //     statusMessage: 'Zstd decompression not yet implemented'
    //   })
    // }
		else {
      data = await response.json()
    }

    return data

  } catch (err: any) {
    console.error('Proxy error:', {
      url: targetUrl,
      error: err.message,
      stack: err.stack
    })

    throw createError({
      statusCode: err.statusCode || 502,
      statusMessage: err.statusMessage || 'Bad Gateway',
      data: {
        originalError: err.message,
        backendUrl: targetUrl,
        suggestion: 'Check backend service and compression settings'
      }
    })
  }
})
