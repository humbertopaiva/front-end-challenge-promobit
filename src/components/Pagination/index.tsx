import { useMoviesDB } from "../../hooks/MoviesDB";
import { useEffect, useState } from "react";
import { HiOutlineChevronRight, HiOutlineChevronLeft } from "react-icons/hi";
import Wraper from "../Wraper";
import styles from "./styles.module.scss";

const Pagination = () => {
	const { totalPages, setCurrentPage, currentPage, selectedGenres } =
		useMoviesDB();
	const [offset, setOffset] = useState(5);
	const [lastIndex, setLastIndex] = useState(offset);
	const [firstIndex, setFirstIndex] = useState(1);
	const [pages, setPages] = useState<number[]>([]);

	const changePage = (page: number) => {
		setCurrentPage(page);
	};

	const forwardPagination = () => {
		setCurrentPage(lastIndex + 1);
	};

	const backwardPagination = () => {
		setCurrentPage(firstIndex - 1);
	};

	const goToLastPage = () => {
		setCurrentPage(lastIndex);
	};

	useEffect(() => {
		if (currentPage > lastIndex) {
			setFirstIndex(currentPage);
			setLastIndex(currentPage + offset);
		}

		if (currentPage < firstIndex) {
			setLastIndex(currentPage);
			setFirstIndex(currentPage - offset);
		}

		if (currentPage <= offset) {
			setFirstIndex(1);
			setLastIndex(offset);
		}

		const newIndex: number[] = [];
		for (let i = firstIndex; i <= lastIndex; i++) newIndex.push(i);

		setPages(newIndex);
	}, [currentPage, firstIndex, lastIndex]);

	return (
		<Wraper>
			<div className={styles.pagination}>
				{selectedGenres.length === 0 && (
					<ul>
						{currentPage > 5 && (
							<li>
								<button onClick={backwardPagination}>
									<i>
										<HiOutlineChevronLeft />
									</i>
								</button>
							</li>
						)}
						{lastIndex <= totalPages &&
							pages.map((number) => (
								<li key={number}>
									<button
										className={`${
											number === currentPage &&
											styles["current"]
										}`}
										onClick={() => changePage(number)}
									>
										{number}
									</button>
								</li>
							))}
						<li>
							<button onClick={forwardPagination}>
								<i>
									<HiOutlineChevronRight />
								</i>
							</button>
						</li>
						<li>
							<button onClick={goToLastPage}>Última</button>
						</li>
					</ul>
				)}
			</div>
		</Wraper>
	);
};

export default Pagination;
