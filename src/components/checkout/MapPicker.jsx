import { useEffect, useRef } from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

// Lightweight map point picker on Leaflet + OpenStreetMap (no API key).
// Tiles load from the internet; the rest of the app stays offline.
// Lazy-loaded, so Leaflet only ships when the user opens the map mode.
const ASTANA = { lat: 51.128, lng: 71.4304 }

const PIN = L.divIcon({
  className: 'map-pin',
  html: '<span class="map-pin__dot"></span>',
  iconSize: [22, 22],
  iconAnchor: [11, 11],
})

export default function MapPicker({ value, onPick }) {
  const elRef = useRef(null)
  const onPickRef = useRef(onPick)
  onPickRef.current = onPick

  useEffect(() => {
    const start = value || ASTANA
    const map = L.map(elRef.current, { center: [start.lat, start.lng], zoom: 13, zoomControl: true })
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap',
      maxZoom: 19,
    }).addTo(map)

    let marker = value ? L.marker([value.lat, value.lng], { icon: PIN }).addTo(map) : null

    map.on('click', (e) => {
      const lat = +e.latlng.lat.toFixed(5)
      const lng = +e.latlng.lng.toFixed(5)
      if (marker) marker.setLatLng([lat, lng])
      else marker = L.marker([lat, lng], { icon: PIN }).addTo(map)
      onPickRef.current?.({ lat, lng })
    })

    // The map mounts inside a flex/animated container; recalc once laid out.
    const t = setTimeout(() => map.invalidateSize(), 120)
    return () => {
      clearTimeout(t)
      map.remove()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return <div ref={elRef} className="map-picker" />
}
