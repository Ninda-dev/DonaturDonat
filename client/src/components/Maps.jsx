import { useEffect } from "react";

export default function Maps() {
    const lat = -6.261705;
    const lng = 106.782802;

    useEffect(() => {
        // Step 1: initialize communication with the platform
        const platform = new H.service.Platform({
            apikey: import.meta.env.VITE_API_KEY_HERE_MAP
        });
        const defaultLayers = platform.createDefaultLayers();

        // Step 2: initialize a map - this map is centered over Europe
        const map = new H.Map(
            document.getElementById('mapContainer'),
            defaultLayers.vector.normal.map,
            {
                center: { lat: lat, lng: lng }, // Update coordinates here
                zoom: 14,
                pixelRatio: window.devicePixelRatio || 1
            }
        );

        // Add a resize listener to make sure that the map occupies the whole container
        window.addEventListener('resize', () => map.getViewPort().resize());

        // Step 3: make the map interactive
        const behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));

        // Create the default UI components
        const ui = H.ui.UI.createDefault(map, defaultLayers);

        // Marker code goes here
        const LocationOfMarker = { lat, lng }; // Update coordinates here

        // Optionally - resize a larger PNG image to a specific size
        const pngIcon = new H.map.Icon("./image/bitDonut.png", { size: { w: 56, h: 56 } });

        // Create a marker using the previously instantiated icon:
        const marker = new H.map.Marker(LocationOfMarker, { icon: pngIcon });

        // Add the marker to the map:
        map.addObject(marker);

        // Optionally, show the marker in the center of the map
        map.setCenter(LocationOfMarker);

        // Zooming so that the marker can be clearly visible
        map.setZoom(8);

        // Cleanup function to remove event listener and dispose of the map
        return () => {
            window.removeEventListener('resize', () => map.getViewPort().resize());
            map.dispose();
        };
    }, []);

    const shareLocation = () => {
        const message = `Here we go, take your donut in this location : https://maps.google.com/?q=${lat},${lng}`;
        const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');
    };

    return (
        <>
            {/*In the div HERE Map will be rendered*/}
            <div style={{ width: "100vw", height: "100vh" }} id="mapContainer" />

            {/* Button Share Location to WhatsApp */}
            <button
                onClick={shareLocation}
                style={{
                    position: 'absolute',
                    top: '10px',
                    right: '10px',
                    padding: '10px 20px',
                    backgroundColor: '#C75C71',
                    color: 'white',
                    border: 'none',
                    borderRadius: '20px',
                    cursor: 'pointer',
                    fontWeight: 'bold'
                }}
            >
                <div className="flex flex-row items-center">
                    <p className="text-bold">
                        Share Location to
                    </p>
                    <img className="w-10" src="./image/WA.png" alt="WhatsApp" />
                </div>
            </button>
        </>
    )
}