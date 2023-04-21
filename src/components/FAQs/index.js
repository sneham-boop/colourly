import styles from "./FAQs.module.scss";
import Lightbulb from "@mui/icons-material/EmojiObjectsRounded";
import School from "@mui/icons-material/SchoolRounded";
import Bug from "@mui/icons-material/BugReportRounded";
import Construction from "@mui/icons-material/ConstructionRounded";
import AddCircle from "@mui/icons-material/AddCircleRounded";
import Sentiment from "@mui/icons-material/SentimentVerySatisfiedRounded";

export default function FAQs(props) {
  const iconStyle = { color: "#F9684F", fontSize: 60 };

  return (
    <section className={styles["faq-container"]}>
      <h3>Frequently Asked Questions</h3>
      <p>Do you have a question that I haven't answered below? Contact me!</p>

      <div className={styles["all-faq"]}>
        <div className={styles.faq}>
          <Lightbulb sx={iconStyle} />
          <div className={styles["faq-icon-question"]}>
            <h6>How did you come up with this idea?</h6>
            <p>
              This app is inspired by{" "}
              <a href="https://coolors.co/palettes/trending">Coolers</a>. I am
              an artist in my spare time and this application felt like
              something I would actually use. I loved their clean and intuitive
              UI and so I took up the challenge to create a mock based on some
              of their features.
            </p>
          </div>
        </div>
        <div className={styles.faq}>
          <School sx={iconStyle} />
          <div className={styles["faq-icon-question"]}>
            <h6> What did you learn?</h6>
            <p>
              Adding additional data points as an after thought makes a huge
              impact on the amount of rework. I had to restructure the database,
              queries and re-think the movement of data as Colourly developed
              multiple times. Learning from this experience, I appreciate the
              importance of structuring data well and in advance.
            </p>
          </div>
        </div>
        <div className={styles.faq}>
          <Bug sx={iconStyle} />
          <div className={styles["faq-icon-question"]}>
            <h6> How can I test this application?</h6>
            <p>
              You can use either of the test accounts I've set up{" "}
              <a href="/colourly/test">here</a> or create your own account{" "}
              <a className={styles["sign-up-link"]} href="#">
                here
              </a>
              .
            </p>
          </div>
        </div>
        <div className={styles.faq}>
          <Construction sx={iconStyle} />
          <div className={styles["faq-icon-question"]}>
            <h6> What would you do differently the next time?</h6>
            <p>
              Giving thought to the movement and structure of data through the
              application prior to jumping straight into development is
              important. Also, I would use a front-end framework such as React
              to better control state within the application. Right, now
              application state not managed centrally and there is no single
              source of truth.
            </p>
          </div>
        </div>
        <div className={styles.faq}>
          <AddCircle sx={iconStyle} />
          <div className={styles["faq-icon-question"]}>
            <h6> What other features would you like to add to Colourly?</h6>
            <p>
              It would be nice to have more ways to modify colours on the create
              page. Also, it would be helpful to have more detail for each
              colour, such as a name, their RGB / HSL values.
            </p>
          </div>
        </div>
        <div className={styles.faq}>
          <Sentiment sx={iconStyle} />
          <div className={styles["faq-icon-question"]}>
            <h6> Did you do any user testing?</h6>
            <p>
              Yes. Based on feedback, I simplified the menu structure and added
              this FAQ page. I also had to fix some broken links.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
