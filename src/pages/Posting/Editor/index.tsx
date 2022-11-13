import { useState } from 'react'
import { useForm } from 'react-hook-form'
import DatePicker from 'react-datepicker'
import Button from 'components/Button'
import { MinusIcon, PlusIcon, ArrowPrevIcon } from 'assets/svgs'
import 'react-datepicker/dist/react-datepicker.css'

// import { axiosAuthApi } from 'apis/client'

import styles from './editor.module.scss'

type FormValues = {
  title: string
  content: string
}

const onSubmit = async (data: FormValues) => {
  const formData = new FormData()
  formData.append('email', data.title)
  formData.append('password', data.content)
  try {
    // const response = await axiosAuthApi.post('/login', formData)
    console.log('response')
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error)
  }
}

const Editor = () => {
  const [startDate, setStartDate] = useState(new Date())
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormValues>()

  const handleUpload = () => {
    console.log('게시글 업로드')
  }

  return (
    <div className={styles.editor}>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)} autoComplete='off'>
        <div className={styles.line}>
          <input
            className={styles.textInput}
            type='text'
            id='title'
            maxLength={30}
            placeholder='제목을 입력해주세요.(30자 내외)'
            {...register('title', { required: true })}
          />
        </div>
        <div className={styles.line}>
          <textarea
            className={styles.textarea}
            id='content'
            placeholder='내용을 입력해주세요'
            {...register('content', { required: true })}
          />
        </div>
        <div className={styles.line}>
          <label htmlFor='count' className={styles.label}>
            모집인원
          </label>
          <div className={styles.counter}>
            <button type='button'>
              <MinusIcon />
            </button>
            <input id='count' type='tel' className={styles.current} value='444' />
            <button type='button'>
              <PlusIcon />
            </button>
          </div>
        </div>
        <div className={styles.line}>
          <button type='button' className={styles.place}>
            <p className={styles.label}>만날장소</p>
            <ArrowPrevIcon className={styles.arrow} />
          </button>
        </div>
        <div className={styles.line}>
          <label htmlFor='time' className={styles.label}>
            만날시간
          </label>
          <div className={styles.time}>
            <div className={styles.datePicker}>
              <DatePicker
                selected={startDate}
                onChange={(date: Date) => setStartDate(date)}
                dateFormat='yyyy년 MM월dd일'
                className={styles.datePickerInput}
                minDate={new Date()}
              />
            </div>

            <input type='tel' className={styles.inputNumber} value={13} placeholder='13' />
            <span>시</span>
            <input type='tel' className={styles.inputNumber} value={30} placeholder='30' />
            <span>분</span>
          </div>
        </div>
        <div className={styles.buttonWrap}>
          <Button basic type='negative' text='다음' onClick={handleUpload} />
        </div>
      </form>
    </div>
  )
}

export default Editor
