function Section({ children, styles }) {
  return (
    <section className={`bg-sky-900 mt-4 py-6 px-4 ${styles}`}>
      {children}
    </section>
  )
}

export default Section
