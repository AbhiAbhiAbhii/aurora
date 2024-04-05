'use client'
type Props = {
    text?: string
    className?: string
    data?: any
}

const AuroraText = ({ text, className, data }: Props) => {


  return (
    <div className={className}>
        <p>
          { text }
        </p>
    </div>
  )
}

export default AuroraText