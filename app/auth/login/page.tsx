import styles from "./page.module.css";

import { LoginButton } from "@/app/auth/login/components/login-btn/login-btn";

export default function Login() {
  return (
    <div className={styles.container}>
      <p>This is login!!</p>
      <LoginButton></LoginButton>
    </div>
  );
}
