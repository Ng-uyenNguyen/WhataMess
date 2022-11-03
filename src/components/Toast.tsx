import { Transition } from '@headlessui/react'
import { CheckIcon, XMarkIcon } from '@heroicons/react/24/solid';
import React from 'react'
import { ToastType } from '../utils/enums/toast.enum';

type PropTypes = {
  type: ToastType,
  text: string,
  show: boolean,
}

export const Toast = ({ type, text, show }: PropTypes) => {
  const [isShowing, setIsShowing] = React.useState(show);

  const handleCloseToast = () => setIsShowing(false);

  const renderSwitch = (type: ToastType) => {
    switch (type) {
      case ToastType.SUCCESS:
        return ToastSuccess(text, handleCloseToast);
      case ToastType.ERROR:
        return ToastError(text, handleCloseToast);
      default:
        return ToastSuccess(text, handleCloseToast);
    }
  }

  React.useEffect(() => {
    setIsShowing(show)
    const timeOut = setTimeout(() => {
      setIsShowing(false);
    }, 3000);

    return () => {
      show && clearTimeout(timeOut);
    }
  }, [show])

  return (
    <Transition
      show={isShowing}
      enter="transition duration-700"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="transition duration-500"
      leaveFrom="opacity-100 top-0"
      leaveTo="opacity-0 top-10"
    >
      {
        renderSwitch(type)
      }
    </Transition>

  )
}

const ToastSuccess = (text: string, onCloseToast: any) => (
  <div id="toast-success" className="absolute left-1 top-1 flex items-center p-4 mb-4 w-full max-w-xs bg-[#def7ec] rounded-xl" role="alert">
    <div className="inline-flex flex-shrink-0 justify-center items-center w-8 h-8 text-green bg-green-100 rounded-lg dark:bg-green-800 dark:text-green-200">
      <CheckIcon className='w-6 h-6 ' />
    </div>
    <div className="ml-3 text-sm font-normal text-green-5">{text}</div>
    <button type="button" className="ml-auto hover:text-gray-900" onClick={onCloseToast}>
      <XMarkIcon className='w-6 h-6 text-gray-800 ' />
    </button>
  </div>
)

const ToastError = (text: string, onCloseToast: any) => (
  <div id="toast-success" className="absolute left-1 top-1 flex items-center p-4 mb-4 w-full max-w-xs text-red-700 bg-red-100 rounded-xl" role="alert">
    <div className="inline-flex flex-shrink-0 justify-center items-center w-8 h-8  bg-green-100 rounded-lg dark:bg-green-800 dark:text-green-200">
      <CheckIcon className='w-6 h-6' />
    </div>
    <div className="ml-3 text-sm font-normal">{text}</div>
    <button type="button" className="ml-auto hover:text-gray-900" onClick={onCloseToast}>
      <XMarkIcon className='w-6 h-6 text-gray-800 ' />
    </button>
  </div>
)
