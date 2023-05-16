import { useState } from 'react'
import { Toaster, toast } from 'sonner'
import Section from './components/Section'
import Button from './components/Button'
import UrlData from './components/UrlData'
import Form from './components/Form'
import { Copy } from './components/Icons'
import { useAutoAnimate } from '@formkit/auto-animate/react'

export default function App() {
  const [url, setUrl] = useState(null)
  const [parent] = useAutoAnimate()

  function handleClipboard() {
    if (url) {
      navigator.clipboard.writeText(url?.shortURL).then(
        () => {
          toast.success('Copiado al clipboard')
        },
        () => {
          toast.error('Algo salió mal! No se ha copiado')
        }
      )
    } else {
      toast('No hay nada para copiar')
    }
  }

  return (
    <>
      <Toaster theme='dark' closeButton position='bottom-center' richColors />
      <main className='App m-auto px-1 sm:px-4 max-w-5xl h-full pt-6 flex flex-col gap-1 justify-center'>
        <h1 className='text-slate-900 text-center text-5xl sm:text-6xl font-bold mt-4'>
          Acorta tus links fácil y rápido con <span className='underline decoration-sky-500 text-sky-600'>Shurly</span>
        </h1>
        <Section styles='rounded-sm'>
          <Form toast={toast} setUrl={setUrl} />
        </Section>
        <Section styles='rounded-sm mb-3'>
          <div className='flex break-all relative gap-4 sm:justify-between sm:items-center bg-white text-xl sm:text-2xl rounded-md w-full border-2 outline-1 outline-sky-500 p-2'>
            {
              url?.shortURL ?? <span className='text-lightgray'>Aquí verás el resultado</span>
            }
            <Button styles='absolute right-1 top-0 sm:top-1' ariaTitle='Copiar al portapapeles' type='button' onClick={handleClipboard}>
              <Copy />
            </Button>
          </div>
          <div ref={parent}>
            {url && <UrlData url={url} />}
          </div>
        </Section>
      </main>
    </>
  )
}
