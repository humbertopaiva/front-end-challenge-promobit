import styles from "./styles.module.scss";

const OficialTrailer = ({ src }: { src: string }) => {
	return (
		<div className={styles.iFrameContainer}>
			<div className={styles.iFrameContent}>
				<iframe src={`http://www.youtube.com/embed/${src}`} />
			</div>
		</div>
	);
};

export default OficialTrailer;
