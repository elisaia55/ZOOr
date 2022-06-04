import { useJsApiLoader, GoogleMap } from '@react-google-maps/api'
import { Map, Marker } from 'google-maps-react'
import { GoogleApiWrapper } from 'google-maps-react'


const GoogleMaps = ({ google, locations = [] }) => {

    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    })

    if (!isLoaded) {
        return <>LOADING</>
    }

    return (
        <Map
            google={ google }
            containerStyle={ {
                position: "static",
                width: "100%",
                height: "100%"
            } }
            style={ {
                width: "100%",
                height: "100%"
            } }
            center={ locations[0] }
            initialCenter={ locations[0] }
            zoom={ locations.length === 1 ? 18 : 13 }
            disableDefaultUI={ true }
        >
            { locations.map(
                coords => <Marker position={ coords } />
            ) }

        </Map>

    )
}



export default GoogleApiWrapper({
    apiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY
})(GoogleMaps);
