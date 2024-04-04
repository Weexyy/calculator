import styles from "@/styles/Footer.module.css";
import { t } from "i18next";

function Footer(): JSX.Element {
	return (
		<footer className={styles["footer"]}>
			&copy; {new Date().getFullYear()}{" "}
			<a href="https://weexy.cn">{t("Weexy")}</a>
		</footer>
	);
}

export default Footer;
