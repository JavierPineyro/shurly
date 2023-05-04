function Button({ children, isDisabled, ariaTitle, onClick, styles, type = '' }) {
  return (
    <button
      aria-label={ariaTitle}
      title={ariaTitle}
      type={type}
      disabled={isDisabled}
      onClick={onClick}
      className={`transition rounded-md p-2 bg-sky-600 hover:bg-sky-500 text-white ${styles}`}
    >
      {children}
    </button>
  )
}

export default Button
