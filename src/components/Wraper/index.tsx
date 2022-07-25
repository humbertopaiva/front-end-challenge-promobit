import { ReactNode } from "react";
import styles from "./styles.module.scss";

type SectionProps = {
	children?: ReactNode;
	bgColor?: string;
};

const Wraper = ({ children, bgColor }: SectionProps) => {
	const cssColor = bgColor || "";
	return (
		<div className={`${styles.section} ${styles[cssColor]}`}>
			<div className={styles.section_content}>{children}</div>
		</div>
	);
};

export default Wraper;
