import styles from "../App.module.css";

function Projects() {
  return (
    <div className={styles.App}>
      <header className={styles.header}>
        <div style={{ textAlign: "left" }}>
          <h1>Hackathons</h1>
          <div className={styles.projectBox}>
            <a href="https://github.com/HannahNJIT/HeartUp" target="_blank">HeartUp</a>
            <p>Rutgers Health Hack 2024 - Honorable Mention Award</p>
            <p>Cardiac digital twin widget with heartbeat simulations from input electrocardiogram (ECG) data to assist in patient-provider interactions. Integrated with a BiLSTM model to predict risk of future events occurring using personalized health data.</p>
          </div>
          <div className={styles.projectBox}>
            <a href="https://devpost.com/software/oracle-8pg52k" target="_blank">Oracle Online Sentiment Analysis</a>
            <p>Google AI Hackathon</p>
            <p>Leverages Google Gemini to analyze or answer questions about trending topics extracted from X (Twitter) posts. Generates real-time assessment of public opinion and sentiment on current events and emerging cultural topics.</p>
          </div>
          <div className={styles.projectBox}>
            <a href="https://devpost.com/software/recipesnap" target="_blank">RecipeSnap</a>
            <p>HackRU Spring 2024 - Maverick Track Runner Up</p>
            <p>Searches recipes and budgets meals by taking photos of your food. Integrates Cloudflare AI image recognition, ingredient identification, and real-time price tracking through Wakefern to provide a list of ingredients, their prices, and recipes.</p>
          </div>
          <div className={styles.projectBox}>
            <a href="https://devpost.com/software/trip-music-planner" target="_blank">NJ TRANSIT Trip Music Planner</a>
            <p>HackRU Fall 2023 - Best Use of NJ TRANSIT Data Winner</p>
            <p>Plans bus route, estimates travel time, and creates a tailored music playlist for your ride.</p>
          </div>
          <div className={styles.projectBox}>
            <a href="https://github.com/terrykn/therapiece" target="_blank">Therapiece</a>
            <p>Rutgers Health Hack 2023</p>
            <p></p>
          </div>

          <h1>Web Apps</h1>
          <div className={styles.projectBox}>
            <a href="https://github.com/terrykn/soundchat" target="_blank">SoundChat</a>
            <p>Full stack audio-based content social media React web app utilizing Express and MongoDB for backend REST API and user data storage.</p>
          </div>
          <div className={styles.projectBox}>
            <a href="https://github.com/terrykn/streamwizard" target="_blank">StreamWizard</a>
            <p>Movie-searching React web app using Open Movie Database (OMDb) to extract movie information.</p>
          </div>

          <h1>Data</h1>
          <div className={styles.projectBox}>
            <a href="https://www.kaggle.com/code/terrykn/tripadvisor" target="_blank">Tripadvisor Restaurants Analysis</a>
            <p>Generated visualizations from dataset of 10k+ Tripadvisor restaurants in NYC. Used a Python random forest model with restaurant categories and cuisines to predict the number of restaurant reviews.</p>
          </div>
          <div className={styles.projectBox}>
            <a href="https://kaggle.com/terrykn/spotify" target="_blank">Spotify Song Popularity Predictor</a>
            <p>Used a linear regression model to predict Taylor Swift song popularity based on correlations between length, loudness, and speechiness. Utilized a dataset of 171 Taylor Swift songs extracted with Spotify WebAPI.</p>
          </div>

          <h1>Fun Games</h1>
          <div className={styles.projectBox} target="_blank">
            <a href="https://github.com/terrykn/space-explorer">Space Explorer</a>
            <p>Space exploration game built on Unity.</p>
          </div>
        </div>
      </header>
    </div>
  );
}

export default Projects;