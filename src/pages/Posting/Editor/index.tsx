import { ChangeEvent, useState } from 'react'
import { useForm } from 'react-hook-form'
import DatePicker from 'react-datepicker'
import { cx } from 'styles'

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
  const [count, setCount] = useState<number>(2)
  const [startDate, setStartDate] = useState<null | Date>(null)
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormValues>()

  const handleIncrease = () => {
    setCount((prev) => prev + 1)
  }
  const handleDecrease = () => {
    if (count > 2) {
      setCount((prev) => prev - 1)
    }
  }

  const handleInputCount = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    setCount(Number(value))
  }

  const handleBlurInput = (e: React.FocusEvent<HTMLInputElement>) => {
    if (['0', '1', '01', '02'].includes(e.target.value)) {
      setCount(2)
    }
  }

  const handleOnInput = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length > 3) {
      e.target.value = e.target.value.substr(0, 3)
    }
  }

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
            모집 인원
          </label>
          <div className={styles.counter}>
            <button type='button' onClick={handleDecrease}>
              <MinusIcon />
            </button>
            <input
              id='count'
              type='number'
              min='2'
              className={styles.current}
              value={count}
              onChange={handleInputCount}
              onInput={handleOnInput}
              maxLength={3}
              onBlur={handleBlurInput}
            />
            <button type='button' onClick={handleIncrease}>
              <PlusIcon />
            </button>
          </div>
        </div>
        <div className={cx(styles.line, styles.noPadding)}>
          <button type='button' className={styles.place}>
            <p className={styles.label}>만날 장소</p>
            <ArrowPrevIcon className={styles.arrow} />
          </button>
        </div>
        <div className={styles.line}>
          <label htmlFor='time' className={styles.label}>
            만날 시간
          </label>
          <div className={styles.time}>
            <div className={styles.datePicker}>
              <DatePicker
                selected={startDate}
                onChange={(date: Date) => setStartDate(date)}
                dateFormat='yyyy년 M월 d일'
                placeholderText='날짜를 선택하세요'
                className={styles.datePickerInput}
                minDate={new Date()}
              />
            </div>

            <input type='tel' className={styles.inputNumber} value={13} placeholder='13' />
            <p className={styles.unit}>시 </p>
            <input type='tel' className={styles.inputNumber} value={30} placeholder='30' />
            <p className={styles.unit}> 분</p>
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
