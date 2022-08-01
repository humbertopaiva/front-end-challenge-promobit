import { HiOutlineChevronRight, HiOutlineChevronLeft } from "react-icons/hi";
import { useEffect, useState } from "react";
import { useMoviesDB } from "../../hooks/MoviesDB";
import { useRouter } from "next/router";
import Wraper from "../Wraper";
import styles from "./styles.module.scss";
import Router from "next/router";

const Pagination = () => {
	const { totalPages, setCurrentPage, currentPage, selectedGenres } =
		useMoviesDB();
	const offset = 5;
	const [lastIndex, setLastIndex] = useState(offset);
	const [firstIndex, setFirstIndex] = useState(currentPage);
	const [pages, setPages] = useState<number[]>([]);
	const router = useRouter();

	useEffect(() => {
		const pageIndex = router.query.pageIndex;
		if (pageIndex) {
			setCurrentPage(+pageIndex);
		}
	}, []);

	const changePage = (page: number) => {
		setCurrentPage(page);
		Router.push(`/page/${page}`);
	};

	const forwardPagination = () => {
		changePage(lastIndex + 1);
	};

	const backwardPagination = () => {
		changePage(firstIndex - 1);
	};

	const goToLastPage = () => {
		changePage(lastIndex);
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
						{pages.map((number) => (
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
