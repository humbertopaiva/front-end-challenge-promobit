const OficialTrailer = ({ src }: { src: string }) => {
	return (
		<div>
			<iframe
				id="ytplayer"
				width="640"
				height="360"
				src={`http://www.youtube.com/embed/${src}`}
			/>
		</div>
	);
};

export default OficialTrailer;
