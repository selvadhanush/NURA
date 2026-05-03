import styles from './page.module.css';

export default function Create() {
  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1>CREATE YOUR FRAGRANCE</h1>
      </div>
      
      <div className={styles.contentContainer}>
        <h2 className={styles.subtitle}>Personalised Fragrance</h2>
        <h3 className={styles.comingSoon}>COMING SOON!</h3>
        
        <p className={styles.paragraph}>
          Introducing our innovative Fragrance Creation platform, where every scent tells a unique story crafted by you. Dive into the art of perfumery with ease as you navigate through a vast array of fragrance notes meticulously curated for your olfactory pleasure.
        </p>
        
        <p className={styles.paragraph}>
          With our intuitive interface, designing your signature scent is a breeze. Choose from a diverse selection of top, middle, and base notes, each carefully selected to harmonize and create a fragrance as distinct as you are. Whether you crave the freshness of citrus, the warmth of amber, or the sensuality of musk, the power to blend is in your hands.
        </p>
        
        <p className={styles.paragraph}>
          Immerse yourself in the world of customization as you experiment with different combinations, adjusting proportions until every drop resonates with your personal style and essence. Whether you're seeking an everyday scent or a special occasion masterpiece, our platform empowers you to express yourself through fragrance like never before.
        </p>
        
        <p className={styles.paragraph}>
          Experience the thrill of creating something truly one-of-a-kind with our Fragrance Creation platform. Unleash your creativity, awaken your senses, and embark on a fragrant journey that's uniquely yours.
        </p>
      </div>
    </div>
  );
}
