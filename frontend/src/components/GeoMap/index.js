import React, { useState } from "react";

import ReactMapGL, { Marker } from 'react-map-gl'



const GeoMap = () => {

    const [viewport, setViewport] = useState({
        latitude: 45.4211,
        longitude: -75.6903,
        width: "100vw",
        height: "100vh",
        zoom: 10

    })

    return (

        <div>
            <ReactMapGL
                { ...viewport }
                mapboxApiAccessToken={ "pk.eyJ1IjoiZWxpc2FpYTk5IiwiYSI6ImNsNDB3enRudDFlbDMzY280eDN4Nm5uOTUifQ.71EAHHHyLRGmu7Ot8ocaQQ" }
                mapStyle="mapbox://styles/elisaia99/cl40x6pwu000a14kc39feeo1e"
                onViewportChange={ (viewport) => {
                    setViewport(viewport);
                } }
            >
                markers here
            </ReactMapGL>
        </div>
    )






}
export default GeoMap;
