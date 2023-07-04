import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import cn from 'classnames'

import YoutubeEmbed from 'components/youtube-embed'

import { convertTimestampsToObjects } from 'utils/functions'

export default function Post({ post, index, number }) {
  const [show, setShow] = useState(!index)

  function handleHide() {
    setShow(false)
  }

  function handleShow() {
    setShow(true)
  }

  return (
    <div id={!index ? 'first-post' : 'post'} className="w-full max-w-4xl">
      <div
        className={cn(
          'flex flex-wrap gap-x-4 items-end',
          index % 2 ? 'flex-row-reverse' : 'flex-row'
        )}
      >
        <span
          className={cn(
            'font-medium text-2xl',
            index % 2 ? 'text-right' : 'text-left'
          )}
        >
          {post.side_title} [#{number}]
        </span>
        <span
          className={cn(
            'font-extrabold text-5xl sm:text-6xl lg:text-7xl flex-1',
            index % 2 ? 'text-left' : 'text-right'
          )}
        >
          {post.title}
        </span>
      </div>
      <AnimatePresence mode="wait">
        <motion.div
          key={show ? 'show' : ''}
          className="overflow-hidden py-8"
          initial={{ height: !show ? 'auto' : 0, opacity: !show ? 1 : 0.2 }}
          animate={{ height: show ? 'auto' : 0, opacity: show ? 1 : 0.2 }}
        >
          <YoutubeEmbed videoId={post.youtube_id} />
          <div className="flex flex-col md:flex-row">
            <p className="flex-1 whitespace-pre-line p-4 md:pr-12 lg:text-xl mt-4 md:mb-12">
              <div className="w-10 h-14 md:w-16 md:h-24 mr-auto">
                <svg
                  className="w-full h-full hidden dark:block"
                  fill="none"
                  viewBox="0 0 64 58"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="m63.1543 42.42c0-8.1447-5.7507-14.4228-14.7149-14.0835.8456-11.3685 9.6408-21.20995 15.5606-25.79129l-1.6914-2.54521c-12.347 7.80527-27.9077 23.9249-27.9077 40.5535 0 9.5021 5.4124 16.4589 14.2076 16.4589 8.7951 0 14.5458-6.7872 14.5458-14.5924zm-34.4009 0c0-8.1447-5.7507-14.4228-14.715-14.0835.8457-11.3685 9.6408-21.20995 15.5606-25.79129l-1.6913-2.54521c-12.3471 7.80527-27.9077 23.9249-27.9077 40.5535 0 9.5021 5.41239 16.4589 14.2075 16.4589 8.7952 0 14.5459-6.7872 14.5459-14.5924z"
                    fill="#fff"
                  />
                </svg>
                <svg
                  className="w-full h-full block dark:hidden"
                  fill="none"
                  viewBox="0 0 64 58"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="m63.1543 42.42c0-8.1447-5.7507-14.4228-14.7149-14.0835.8456-11.3685 9.6408-21.20995 15.5606-25.79129l-1.6914-2.54521c-12.347 7.80527-27.9077 23.9249-27.9077 40.5535 0 9.5021 5.4124 16.4589 14.2076 16.4589 8.7951 0 14.5458-6.7872 14.5458-14.5924zm-34.4009 0c0-8.1447-5.7507-14.4228-14.715-14.0835.8457-11.3685 9.6408-21.20995 15.5606-25.79129l-1.6913-2.54521c-12.3471 7.80527-27.9077 23.9249-27.9077 40.5535 0 9.5021 5.41239 16.4589 14.2075 16.4589 8.7952 0 14.5459-6.7872 14.5459-14.5924z"
                    fill="#000"
                  />
                </svg>
              </div>
              {post.description}
            </p>
            <div className="text-sm w-full max-w-xs p-4 mt-4">
              <p className="opacity-50">Timestamps:</p>
              {convertTimestampsToObjects(post.timestamps).map(timestamp => (
                <a
                  target='_blank'
                  href={`https://www.youtube.com/watch?v=${post.youtube_id}=${timestamp.seconds}`}
                  className={cn(
                    'block appearance-none hover:opacity-100 cursor-pointer',
                    'opacity-50'
                  )}
                >
                  {timestamp.time} - {timestamp.name}
                </a>
              ))}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
      <div className="flex gap-4">
        <hr className="border-black dark:border-white flex-1 my-auto" />
        <button
          onClick={show ? handleHide : handleShow}
          className="text-xl text-black font-bold py-1 px-2 bg-[#f5b810] cursor-pointer hover:bg-yellow-600"
        >
          {show ? 'Hide' : 'Show'} Details
        </button>
        <hr className="border-black dark:border-white flex-1 my-auto" />
      </div>
    </div>
  )
}
