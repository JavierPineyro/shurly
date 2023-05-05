import { useState } from 'react'
import Button from './Button'

function Form({ toast, setUrl }) {
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  async function handleSubmit(evt) {
    evt.preventDefault()
    try {
      setIsLoading(true)
      const res = await fetch('/api/short', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          originalUrl: input
        })
      })
      if (!res.ok) {
        const json = await res.json()
        throw new Error(json?.message)
      }

      const response = await res.json()
      setInput('')
      setUrl(response)
      toast.success('Link acortado exitosamente!')
    } catch (error) {
      toast.error(error.message)
    } finally {
      setIsLoading(false)
    }
  }

  function handleChange(evt) {
    setInput(evt.target.value)
  }

  return (
    <form className='flex flex-col gap-2 sm:flex sm:flex-row text-2xl sm:gap-4 sm:justify-center sm:items-center' onSubmit={handleSubmit}>
      <input
        className='placeholder-lightgray caret-sky-900 rounded-md w-full border-2 outline-1 outline-sky-500 p-2'
        placeholder='Arcorta tu link' onChange={handleChange}
        value={input} type='url'
      />
      <Button
        isDisabled={isLoading}
        ariaTitle='Acortar link'
        type='submit'
      >Acortar
      </Button>
    </form>
  )
}

export default Form
