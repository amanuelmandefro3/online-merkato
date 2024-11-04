import React from "react";
import Card from "../../components/card/Card";
import styles from "./About.module.scss";
import { FaShoppingCart, FaUsers, FaHandshake } from "react-icons/fa";

const AboutUs = () => {
  return (
    <section>
      <div className={`container ${styles.about}`}>
        <h2>About Online Merkato</h2>
        <div className={styles.section}>
          <Card cardClass={styles.card}>
            <h3>Our Story</h3>
            <p>
              Online Merkato was founded in 2023 with a vision to bring the
              vibrant Ethiopian marketplace experience to the digital world. We
              strive to connect local sellers with customers across Ethiopia and
              beyond, making shopping for authentic Ethiopian products easier
              and more accessible than ever before.
            </p>
          </Card>

          <Card cardClass={styles.card2}>
            <h3>Our Mission</h3>
            <p>
              To empower Ethiopian businesses and artisans by providing a
              platform that showcases their products to a global audience, while
              offering customers a diverse range of high-quality, authentic
              Ethiopian goods at their fingertips.
            </p>
          </Card>
        </div>

        <div className={styles.features}>
          <Card cardClass={styles.featureCard}>
            <FaShoppingCart className={styles.icon} />
            <h4>Wide Selection</h4>
            <p>
              From traditional crafts to modern Ethiopian designs, we offer a
              diverse range of products.
            </p>
          </Card>

          <Card cardClass={styles.featureCard}>
            <FaUsers className={styles.icon} />
            <h4>Community-Driven</h4>
            <p>
              We support local artisans and businesses, helping them reach a
              wider audience.
            </p>
          </Card>

          <Card cardClass={styles.featureCard}>
            <FaHandshake className={styles.icon} />
            <h4>Customer Satisfaction</h4>
            <p>
              We're committed to providing excellent service and ensuring
              customer satisfaction.
            </p>
          </Card>
        </div>

        {/* <Card cardClass={styles.teamCard}>
          <h3>Meet Our Team</h3>
          <div className={styles.teamMembers}>
            {["Abebe Kebede", "Tigist Haile", "Dawit Tadesse"].map((name) => (
              <div key={name} className={styles.teamMember}>
                <div className={styles.avatar}></div>
                <h5>{name}</h5>
                <p>Co-founder</p>
              </div>
            ))}
          </div>
        </Card> */}
      </div>
    </section>
  );
};

export default AboutUs;