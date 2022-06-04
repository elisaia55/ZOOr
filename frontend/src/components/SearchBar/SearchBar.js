
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import { searchPhotosThunk } from "../../store/search";
import './SearchBar.css'


const Search = () => {

    const sessionUser = useSelector(state => state.session.user);
    const searchPhotos = useSelector((state) => state.search.photos);
    const [photoSearch, setPhotoSearch] = useState('');
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(searchPhotosThunk(photoSearch, sessionUser))
    }, [photoSearch, dispatch])

    const hidden = (e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) {
            document.querySelector(".allResults").getElementsByClassName.display = "none";
        }
    }

    const display = (e) => {
        document.querySelector(".allResults").style.display = "flex";
    }

    const secondHidden = (e) => {
        document.querySelector(".allResults").style.display = "none";
        setPhotoSearch('');
    }


    return (<div
        className="search-container"
        onBlur={ (e) => hidden(e) }
        onFocus={ (e) => display(e) }
    >
        <div className=" search-focus search-block">
            <i className="fas fa-search"></i>
            <form>
                <input
                    className="search"
                    placeholder="Search Photos..."
                    value={ photoSearch }
                    onChange={ (e) => setPhotoSearch(e.target.value) }
                />
            </form>
        </div>

        <div className="allResults">
            { photoSearch?.length >= 1 &&
                searchPhotos?.map((photo) => (
                    <div className="searchResultsContainer" id={ photo.id } key={ photo.id }>
                        <NavLink
                            onClick={ secondHidden }
                            className="searchResItem"
                            to={ `/photo/${photo.id}` }
                        >
                            { photo.content.length > 10
                                ? photo.content.slice(0, 10) + "..."
                                : photo.content }
                        </NavLink>
                    </div>
                )) }
        </div>
    </div>
    );
}

export default Search;
