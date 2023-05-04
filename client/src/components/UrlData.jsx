import { useTimeAgo } from '../hooks/useTimeAgo'
import Badge from './Badge'

function UrlData({ url }) {
  const {
    timeago,
    dateTime
  } = useTimeAgo({ timestamp: new Date(url?.createdAt).getTime() })

  const solicitadoText = `${url.clicksCount} veces`
  const original = url.originalURL
  return (
    <div className='text-2xl mt-4 text-white font-semibold'>
      <ul className='flex flex-col sm:flex-row flex-wrap justify-evenly gap-3'>
        <li className='flex flex-col sm:flex-row gap-1'>Solicitado: <Badge>{solicitadoText}</Badge></li>
        <li className='flex flex-col sm:flex-row gap-1'>Url original: <Badge>{original}</Badge></li>
        <li className='flex flex-col sm:flex-row gap-1'>Creación: <Badge><time title={dateTime} dateTime={dateTime}>{timeago}</time></Badge>
        </li>
      </ul>
    </div>
  )
}

export default UrlData
