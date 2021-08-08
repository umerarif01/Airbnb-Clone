import {useState} from "react";
import ReactMapGL,{Marker,Popup} from 'react-map-gl';
import getCenter from "geolib/es/getCenter";
import Image from "next/dist/client/image";


function Map({searchResults}) {
    const [selectedLocation,setSelectedLocation]=useState({});
    
      const coordinates = searchResults.map((result)=>({
        longitude:result.long,
        latitude:result.lat,
      }));

      const center = getCenter(coordinates);

      const [viewport, setViewport] = useState({
        width: "100%",
        height: "100%",
        latitude: center.latitude,
        longitude: center.longitude,
        zoom:12,
      });


    return (
        <ReactMapGL
        mapStyle="mapbox://styles/umer-a/cks1xc2952ozs17lfdzts6ogu"
        mapboxApiAccessToken={process.env.mapbox_key}
        {...viewport}
        onViewportChange={nextViewport => setViewport(nextViewport)}
        >
        {searchResults.map(result => (
            <div key={result.long}>
                <Marker
                longitude={result.long}
                latitude={result.lat}
                offsetLeft={-20}
                offsetTop={-10}
                >
                 <p 
                 role="img"
                 onClick={()=>setSelectedLocation(result)}
                 className="cursor-pointer text-2xl animate-bounce"
                 aria-label="push-pin"
                 >
                     📍
                     </p>
                </Marker>
                {selectedLocation.long===result.long ?(
                    
                    <Popup className="w-60 h-20 " 
                    onClose={()=>setSelectedLocation({})}
                    closeOnClick={true}
                    longitude={result.long}
                    latitude={result.lat}
                    >
                       
                       
                       <div className="flex  items-center  text-red-600 ">
                            
                            <p className="font-semibold">{result.title}</p>
                            
                            <Image 
                            src= {result.img} 
                            width={300}
                            height={200}
                            className="rounded-lg"
                       />
                          
                       </div>
                       
                   
                       
                    </Popup>
                    
                ):(
                    false
                )}
            </div>
        ))}

        </ReactMapGL>
    )
}

export default Map
