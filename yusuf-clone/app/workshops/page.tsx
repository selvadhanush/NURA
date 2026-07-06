import styles from '../info.module.css';

export default function WorkshopsPage() {
  return (
    <div className={styles.page}>
      <div className={styles.hero}>
        <div className={styles.heroContent}>
          <h1>WORKSHOPS</h1>
          <p>Explore the art and science of perfumery</p>
        </div>
      </div>

      <div className={styles.container}>
        <section className={styles.contentSection}>
          <h2>Perfumery Workshops</h2>
          <p>
            NURA plans to organize fragrance-focused workshops and educational experiences for
            enthusiasts, customers, and aspiring entrepreneurs interested in learning more about the world of
            perfumery. 
          </p>
          <p>
            These workshops may cover topics such as fragrance composition, scent families,
            ingredient appreciation, product development processes, branding concepts, and industry insights.
            Participants will have opportunities to explore fragrance concepts through guided sessions and
            interactive activities.
          </p>
          <div className={styles.highlightBox}>
            <p>
              Workshops are designed to make the art and science of perfumery accessible, engaging, and enjoyable for individuals with varying levels of experience. Workshop schedules, availability, and registration details will be announced on our website and social channels.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
