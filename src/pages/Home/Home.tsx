import styles from './home.module.scss'

import Header from 'components/Header/Header'

const Home = () => {
  return (
    <div className={styles.home}>
      <Header headText='안양동' />
      <div className='contentsInner'>
        <h1>Home</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Accusantium minima provident tenetur laborum a sequi
          suscipit similique quam esse maxime repudiandae aliquid voluptatum hic, dolore, debitis ut, omnis ea cumque.
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Accusantium minima provident tenetur laborum a sequi
          suscipit similique quam esse maxime repudiandae aliquid voluptatum hic, dolore, debitis ut, omnis ea cumque.
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Accusantium minima provident tenetur laborum a sequi
          suscipit similique quam esse maxime repudiandae aliquid voluptatum hic, dolore, debitis ut, omnis ea cumque.
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Accusantium minima provident tenetur laborum a sequi
          suscipit similique quam esse maxime repudiandae aliquid voluptatum hic, dolore, debitis ut, omnis ea cumque.
        </p>
        <div>배포테스트</div>
      </div>
    </div>
  )
}

export default Home
