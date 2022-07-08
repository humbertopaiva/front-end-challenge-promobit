import { NextComponentType } from "next";
import Image from "next/image";
import Wraper from "../../components/Wraper";
import styles from "./styles.module.scss";
import logo from "../../../public/logo.svg";

const Header: NextComponentType = () => {
	return (
		<header>
			<Wraper bgColor="primary-light">
				<div className={styles.content}>
					<Image src={logo} width={"200px"} />
				</div>
			</Wraper>
		</header>
	);
};

export default Header;
