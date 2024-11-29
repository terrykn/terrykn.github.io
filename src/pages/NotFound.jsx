import styles from "../App.module.css";

function NotFound() {
  return (
    <div class={styles.App}>
      <header class={styles.header}>
        <h1>404 - Not Found</h1>
        <p>Well this is awkward...</p>
      </header>
    </div>
  );
}

export default NotFound;