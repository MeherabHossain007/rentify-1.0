import type { NextPage } from 'next'
import styles from '../styles/Home.module.css'
import HomePage from './screens/home'
import "react-universal-hooks";

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <main>
        <HomePage/>
      </main>
    </div>
  )
}
export default Home
