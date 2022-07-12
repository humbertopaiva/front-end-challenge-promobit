import {
	CircularProgressbar as MyCircularProgressbar,
	buildStyles,
} from "react-circular-progressbar";
import styles from "./styles.module.scss";

const CircularProgressbar = ({ percentage }: { percentage: number }) => {
	return (
		<div className={styles.circularProgressbarContent}>
			<div>
				<MyCircularProgressbar
					value={percentage}
					text={`${percentage}%`}
					background
					styles={buildStyles({
						textSize: "24px",
						pathTransitionDuration: 0.5,
						trailColor: "transparent",
						pathColor: "#14FF00",
						textColor: "#14FF00",
						backgroundColor: "rgba(255,255,255,.1)",
					})}
					strokeWidth={10}
				/>
			</div>
			<div className={styles.circularProgressbarText}>
				<p>Avaliação dos usuários</p>
			</div>
		</div>
	);
};

export default CircularProgressbar;
