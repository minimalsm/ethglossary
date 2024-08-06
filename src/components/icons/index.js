export const ThumbDownOutline = ({ width = 24, height = 24 }) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M19 15V3H23V15H19ZM15 3C15.5304 3 16.0391 3.21071 16.4142 3.58579C16.7893 3.96086 17 4.46957 17 5V15C17 15.55 16.78 16.05 16.41 16.41L9.83 23L8.77 21.94C8.5 21.67 8.33 21.3 8.33 20.88L8.36 20.57L9.31 16H3C1.89 16 1 15.1 1 14V12C1 11.74 1.05 11.5 1.14 11.27L4.16 4.22C4.46 3.5 5.17 3 6 3H15ZM15 5H5.97L3 12V14H11.78L10.65 19.32L15 14.97V5Z"
      fill="currentColor"
    />
  </svg>
)

export const ThumbDownFilled = ({ width = 24, height = 24 }) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M19 15H23V3H19M15 3H6C5.17 3 4.46 3.5 4.16 4.22L1.14 11.27C1.05 11.5 1 11.74 1 12V14C1 14.5304 1.21071 15.0391 1.58579 15.4142C1.96086 15.7893 2.46957 16 3 16H9.31L8.36 20.57C8.34 20.67 8.33 20.77 8.33 20.88C8.33 21.3 8.5 21.67 8.77 21.94L9.83 23L16.41 16.41C16.78 16.05 17 15.55 17 15V5C17 3.89 16.1 3 15 3Z"
      fill="currentColor"
    />
  </svg>
)

export const ThumbUpOutline = ({ width = 24, height = 24 }) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M5 9.00195V21.002H1V9.00195H5ZM9 21.002C8.46957 21.002 7.96086 20.7912 7.58579 20.4162C7.21071 20.0411 7 19.5324 7 19.002V9.00195C7 8.45195 7.22 7.95195 7.59 7.59195L14.17 1.00195L15.23 2.06195C15.5 2.33195 15.67 2.70195 15.67 3.11195L15.64 3.43195L14.69 8.00195H21C22.11 8.00195 23 8.90195 23 10.002V12.002C23 12.262 22.95 12.502 22.86 12.732L19.84 19.782C19.54 20.502 18.83 21.002 18 21.002H9ZM9 19.002H18.03L21 12.002V10.002H12.21L13.34 4.68195L9 9.03195V19.002Z"
      fill="currentColor"
    />
  </svg>
)

export const ThumbUpFilled = ({ width = 24, height = 24 }) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M23 10C23 8.89 22.1 8 21 8H14.68L15.64 3.43C15.66 3.33 15.67 3.22 15.67 3.11C15.67 2.7 15.5 2.32 15.23 2.05L14.17 1L7.59 7.58C7.22 7.95 7 8.45 7 9V19C7 19.5304 7.21071 20.0391 7.58579 20.4142C7.96086 20.7893 8.46957 21 9 21H18C18.83 21 19.54 20.5 19.84 19.78L22.86 12.73C22.95 12.5 23 12.26 23 12V10ZM1 21H5V9H1V21Z"
      fill="currentColor"
    />
  </svg>
)

export const Close = ({ width = 24, height = 24, className = '' }) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z"
      fill="currentColor"
    />
  </svg>
)

export const ArrowUpAndRight = ({ className = '' }) => {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M4.16667 14.6582L12.9917 5.83317H7.5V4.1665H15.8333V12.4998H14.1667V7.00817L5.34167 15.8332L4.16667 14.6582Z"
        fill="currentColor"
      />
    </svg>
  )
}

export const SearchNotFound = ({ width = 24, height = 24, className }) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M17.1429 15.0857H16.0594L15.6754 14.7154C17.0194 13.152 17.8286 11.1223 17.8286 8.91429C17.8286 3.99086 13.8377 0 8.91429 0C3.99086 0 0 3.99086 0 8.91429C0 13.8377 3.99086 17.8286 8.91429 17.8286C11.1223 17.8286 13.152 17.0194 14.7154 15.6754L15.0857 16.0594V17.1429L21.9429 24L24 21.9429L17.1429 15.0857ZM8.91429 15.0857C5.48571 15.0857 2.74286 12.3429 2.74286 8.91429C2.74286 5.48571 5.48571 2.74286 8.91429 2.74286C12.3429 2.74286 15.0857 5.48571 15.0857 8.91429C15.0857 12.3429 12.3429 15.0857 8.91429 15.0857ZM10.848 11.8217L8.91429 9.888L6.98057 11.8217L6.00686 10.848L7.94057 8.91429L6.00686 6.98057L6.98057 6.00686L8.91429 7.94057L10.848 6.00686L11.8217 6.98057L9.888 8.91429L11.8217 10.848L10.848 11.8217Z"
      fill="currentColor"
    />
  </svg>
)
