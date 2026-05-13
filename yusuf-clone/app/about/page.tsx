import styles from '../collections/page.module.css';

export default function About() {
  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1>ABOUT NURΛ</h1>
      </div>
      <div className={styles.container}>
        <p style={{textAlign: 'center', margin: '4rem 0', color: '#666', letterSpacing: '1px'}}>
          More content coming soon...
        </p>
      </div>
    </div>
  );
}
