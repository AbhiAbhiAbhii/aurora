'use client'
type Props = {
    text?: string
    className?: string
}

const AuroraText = ({ text, className }: Props) => {

  return (
    <div className={className}>
      <p>
        { text }
      </p>
    </div>
  )
}

export default AuroraText