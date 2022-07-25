import { NextComponentType } from "next";
import Image from "next/image";
import Wraper from "../../components/Wraper";
import styles from "./styles.module.scss";
import logo from "../../../public/logo.svg";
import Link from "next/link";
import { useMoviesDB } from "../../hooks/MoviesDB";

const Header: NextComponentType = () => {
	const { setCurrentPage } = useMoviesDB();
	return (
		<header>
			<Wraper bgColor="primary-light">
				<div className={styles.content}>
					<Link href={"/"}>
						<a
							onClick={() => {
								setCurrentPage(1);
							}}
						>
							<Image src={logo} width={"200px"} />
						</a>
					</Link>
				</div>
			</Wraper>
		</header>
	);
};

export default Header;
