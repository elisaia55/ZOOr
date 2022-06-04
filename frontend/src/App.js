import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch, useLocation } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import Photos from "./components/Photos";
import NewPhotoForm from "./components/NewPhotoForm";
import EditPhotoForm from "./components/EditPhoto";
import SplashPage from "./components/SplashPage";
import PhotoDetail from "./components/PhotoDetail";
import Footer from "./components/Footer";
import './index.css'
import { getPhotos } from "./store/photos";
import { getUsers } from "./store/users";
import { getPhotoComments } from "./store/comment";



function App() {



  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const sessionUser = useSelector(state => state.session.user)



  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);


  useEffect(() => {
    dispatch(getPhotos())
  }, [dispatch])

  useEffect(() => {
    dispatch(getUsers())
  }, [dispatch])

  useEffect(() => {
    dispatch(getPhotoComments())
  }, [dispatch])



  return (

    isLoaded && (

      <>
        {/* <GoogleMaps /> */ }



        <Navigation isLoaded={ isLoaded } />
        { isLoaded && (

          <Switch>
            <Route exact path='/' isLoaded={ isLoaded }>

              <SplashPage />
            </Route>
            <Route exact path="/signup">
              <SignupFormPage />
            </Route>
            <Route exact path="/photos">
              <Photos />
            </Route>
            <Route exact path='/photo/new'>
              { sessionUser ? <NewPhotoForm /> : <SignupFormPage /> }
            </Route>
            <Route exact path='/photo/edit/:photoId'>
              <EditPhotoForm />
            </Route>
            <Route exact path='/photo/:photoId'>
              <PhotoDetail />
            </Route>
            <Route>
              Page Not Found
            </Route>
          </Switch>
        ) }
        <Footer />


      </>
    )

  );
}

export default App;
