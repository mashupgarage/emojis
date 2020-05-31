import { GetStaticProps } from 'next'

interface Emoji {
  [key: string]: string
}
interface EmojisProps {
  emojis: Emoji
}

const Emojis = (props: EmojisProps) => {
  const { emojis } = props
  const keys = Object.keys(emojis)
  console.log(keys)
  return (
    <div className='emojis'>
      {keys.map((key) => {
        return (
          <div className='emoji'>
            <p>:{key}:</p>
            <img src={emojis[key]} alt={key} />
          </div>
        )
      })}
      <style jsx>
        {`
          .emojis {
            width: 90%;
            max-width: 1200px;
            margin: 0 auto;
            display: grid;
            grid-template-columns: repeat(8, 1fr);
            grid-gap: 10px;
            grid-auto-rows: minmax(120px, auto);
            align-items: stretch;
            justify-items: center;
            font-size: 16px;
            font-family: 'Roboto', sans-serif;
          }
          .emojis > .emoji {
            width: 60px;
            text-align: center;
            font-size: 13px;
            font-weight: normal;
          }
          .emojis > .emoji > img {
            max-width: 36px;
          }
        `}
      </style>
    </div>
  )
}

export default function Home({ emojis }: EmojisProps) {
  return (
    <>
      <div className='hello'>
        <img
          src='https://emoji.slack-edge.com/T02FDT2QG/mashupspinner/cde00590186932e8.gif'
          height='60px'
        />
        <h1>Mashup Garage Emojis</h1>
        <h3>Welcome to the club, weirdo.</h3>
        <style jsx>{`
          .hello {
            color: #000;
            padding: 40px;
            text-align: center;
            transition: 100ms ease-in background;
            margin-bottom: 48px;
            font-weight: 200;
          }
        `}</style>
      </div>
      {emojis && <Emojis emojis={emojis} />}
    </>
  )
}

type EmojiResponse = {
  ok: string
  emoji: Emoji
}

export const getStaticProps: GetStaticProps = async (context) => {
  const token = process.env.SLACK_TOKEN
  const res = await fetch(
    `https://slack.com/api/emoji.list?token=${token}&pretty=1`
  )
  const response: EmojiResponse = await res.json()

  return {
    props: {
      emojis: response.emoji,
    },
  }
}
