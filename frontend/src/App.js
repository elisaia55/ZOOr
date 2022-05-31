import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import Photos from "./components/Photos";
import NewPhotoForm from "./components/NewPhotoForm";
import { getPhotos, createPhoto } from "./store/photos"
import EditPhotoForm from "./components/EditPhoto";
import SplashPage from "./components/SplashPage";


function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const sessionUser = useSelector(state => state.session.user)

  const [hideNavBar, setHideNavBar] = useState(false);

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  useEffect(() => {
    dispatch(getPhotos())
  }, [dispatch])

  useEffect(() => {
    dispatch(createPhoto())
  }, [dispatch])



  return (
    <>

      <Navigation isLoaded={ isLoaded } />
      { isLoaded && (

        <Switch>
          <Route exact path='/'>
            <SplashPage />
          </Route>
          <Route exact path="/signup">
            <SignupFormPage />
          </Route>
          <Route exact path="/photos">
            <Photos />
          </Route>
          <Route exact path='/photo/new'>
            { sessionUser && <NewPhotoForm /> }
          </Route>
          <Route exact path={ `/photo/edit/${Photos.id}` }>
            <EditPhotoForm />
          </Route>
        </Switch>
      ) }
    </>
  );
}

export default App;