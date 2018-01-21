import Document, { Head, Main, NextScript } from 'next/document'
import flush from 'styled-jsx/server'

export default class HtmlDocument extends Document {
  static getInitialProps({ renderPage }) {
    const { html, head, errorHtml, chunks } = renderPage()
    const styles = flush()
    return { html, head, errorHtml, chunks, styles }
  }

  render() {
    return (
      <html>
        <Head>
          <link href="https://fonts.googleapis.com/css?family=Lobster" rel="stylesheet" />
          <link href="https://fonts.googleapis.com/css?family=Lato" rel="stylesheet" />
          <style>{`
            body { 
              margin: 0;
              background-color: #faf5e7;
            }
          `}</style>
        </Head>
        <body className="custom_class">
          <Main />
          <NextScript />
        </body>
      </html>
    )
  }
}
