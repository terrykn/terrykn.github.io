import styles from "../App.module.css";

function About() {
  return (
    <div class={styles.App}>
      <header class={styles.header}>
        <div style="text-align: left">
            <h1>Terry Nguyen</h1>
            <p>Hello! I'm a student at Rutgers University studying computer science and math. I will be graduating in May 2025 and joining Verizon as a full stack engineer in June 2025.</p>
            <p>Contact: terryknguyen@gmail.com</p>
            <br/>
            <a style="color: black; font-weight: bold; padding-right: 1rem;" href="/projects">Projects</a>
            <a style="color: black; font-weight: bold; padding-right: 1rem;" href="/experience">Experience</a>
        </div>
      </header>
    </div>
  );
}

export default About;