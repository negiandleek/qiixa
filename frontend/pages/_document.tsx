import React from 'react'
import Document, { Html, Head, Main, NextScript } from 'next/document'

class Qiixa extends Document{
  render() {
    return (
      <Html>
        <Head>
          <title>qiixa</title>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default Qiixa