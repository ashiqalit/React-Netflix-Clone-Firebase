import { useEffect, useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { UserAuth } from "../context/AuthContext";
import { db } from "../firebase";
import {
  arrayUnion,
  arrayRemove,
  doc,
  updateDoc,
  onSnapshot,
} from "firebase/firestore";

const Movie = ({ item }) => {
  const [like, setLike] = useState(false);
  const [saved, setSaved] = useState(false);
  const { user } = UserAuth();

  const movieID = doc(db, "users", `${user?.email}`);

  const saveShow = async () => {
    if (user?.email) {
      setLike(!like);
      if (!like) {
        await updateDoc(movieID, {
          savedShows: arrayUnion({
            id: item.id,
            title: item.title,
            img: item.backdrop_path,
          }),
        });
        setSaved(true);
      } else {
        await updateDoc(movieID, {
          savedShows: arrayRemove({
            id: item.id,
            title: item.title,
            img: item.backdrop_path,
          }),
        });
        setSaved(false);
      }
    } else {
      alert("Please login to save the movie.");
    }
  };

  useEffect(() => {
    const fetchSavedShows = () => {
      if (user?.email) {
        const unsubscribe = onSnapshot(movieID, (doc) => {
          const savedMovies = doc.data()?.savedShows || [];
          const isMovieSaved = savedMovies.some(
            (savedMovie) => savedMovie.id === item.id
          );
          setLike(isMovieSaved);
          setSaved(isMovieSaved);
        });
        return () => unsubscribe();
      }
    };
    fetchSavedShows();
  }, [user?.email, item.id]);

  return (
    <div className="w-[160px] sm:w-[200px] md:w-[240px] lg:w-[280px] inline-block cursor-pointer relative p-2">
      <img
        className="w-full h-auto block"
        src={`https://image.tmdb.org/t/p/w500/${item?.backdrop_path}`}
        alt={item.title}
      />
      <div className="absolute top-0 left-0 w-full h-full hover:bg-black/80 opacity-0 hover:opacity-100 text-white">
        <p className="whitespace-normal text-xs md:text-xs font-bold flex justify-center items-center h-full text-center">
          {item?.title}
        </p>
        <p onClick={saveShow}>
          {like ? (
            <FaHeart className="absolute top-4 left-4 text-gray-300" />
          ) : (
            <FaRegHeart className="absolute top-4 left-4 text-gray-300" />
          )}
        </p>
      </div>
    </div>
  );
};
export default Movie;
