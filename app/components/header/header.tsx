import Link from "next/link";

import styles from "./header.module.css";
import AvatarButton from "@/app/components/header/avatar-button/avatar-button";
import FeatureDrawer from "@/app/components/header/feature-drawer/feature-drawer";

export default function Header() {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <FeatureDrawer/>

        <Link href="/">Learn next</Link>

        <AvatarButton/>
      </div>
    </div>
  );
}
