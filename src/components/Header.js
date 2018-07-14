import React from 'react'

const Header = ({ text }) => {
  return (
    <h1>
      {text}
      <style jsx>{`
        h1 {
          font-family: 'Lobster', cursive;
          font-size: 2.5rem;
          letter-spacing: 0.03em;
          color: #2B1C02;
          padding: 0.5em 0.5em;
          margin: 0;
        }

        @media screen and (min-width: 600px) {
          h1 {
            font-size: 3.5rem;
            padding: 0.5em 1.5em;
          }
        }

        @media screen and (min-width: 1200px) {
          h1 {
            font-size: 4.5rem;
            padding: 0.5em 0.5em;
          }
        }
      `}
      </style>
    </h1>
  )
}

export default Header