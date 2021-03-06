import Head from "next/head";
import { useEffect, useState, useContext } from "react";
import FavouriteContext from "../utilities/FavouriteContext";
import getAllCats from "../utilities/getAllCats";
import CatCard from "../components/CatCard";
import Pagination from "../components/Pagination";

export default function Home() {
	const [cats, setCats] = useState([]);
	const [loading, setLoading] = useState(true);
	const [currentPage, setCurrentPage] = useState(0);
	const [pagesNumber, setPagesNumber] = useState(0);
	const context = useContext(FavouriteContext);
	const catsCount = 12;

	useEffect(() => {
		setLoading(true);
		(async () => {
			try {
				const { data, count } = await getAllCats(
					currentPage,
					catsCount
				);
				setCats(data);
				setPagesNumber(Math.floor(count / catsCount));
				setLoading(false);
			} catch (err) {
				console.log(err.message);
				setLoading(false);
			}
		})();
	}, [currentPage]);

	return (
		<div className="">
			<Head>
				<title>Cat App</title>
				<meta
					name="description"
					content="Generated by create next app"
				/>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			{!loading ? (
				<div className="grid grid-cols-1 gap-4 mx-12 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
					{cats &&
						cats.map((entity) => (
							<CatCard
								id={entity.id}
								key={entity.id}
								imageUrl={entity.url}
							/>
						))}
				</div>
			) : (
				<div className="w-screen h-screen text-center text-xl font-bold">
					loading ...
				</div>
			)}
			<Pagination
				currentPage={currentPage}
				pagesCount={pagesNumber}
				newPage={setCurrentPage}
			/>
		</div>
	);
}
