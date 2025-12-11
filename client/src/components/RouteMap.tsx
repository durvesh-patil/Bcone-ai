"use client";

import { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

// Set Mapbox token (optional for basic demo)
const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || "";
if (MAPBOX_TOKEN) {
  mapboxgl.accessToken = MAPBOX_TOKEN;
}

interface RouteMapProps {
  routes: any[];
  disruptionActive: boolean;
}

export function RouteMap({ routes, disruptionActive }: RouteMapProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [mapLoaded, setMapLoaded] = useState(false);

  useEffect(() => {
    if (!mapContainer.current || map.current) return;

    // Initialize map
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/light-v11",
      center: [30, 30],
      zoom: 2,
      projection: { name: "mercator" },
    });

    map.current.on("load", () => {
      setMapLoaded(true);
    });

    // Cleanup
    return () => {
      map.current?.remove();
      map.current = null;
    };
  }, []);

  useEffect(() => {
    if (!map.current || !mapLoaded || !routes || routes.length === 0) return;

    // Clear existing layers and sources
    const existingLayers = ["route-0", "route-1", "route-2", "points"];
    existingLayers.forEach((layerId) => {
      if (map.current?.getLayer(layerId)) {
        map.current.removeLayer(layerId);
      }
    });

    const existingSources = ["route-0", "route-1", "route-2", "points"];
    existingSources.forEach((sourceId) => {
      if (map.current?.getSource(sourceId)) {
        map.current.removeSource(sourceId);
      }
    });

    // Get coordinates from first route
    const firstRoute = routes[0];
    if (!firstRoute.segments || firstRoute.segments.length === 0) return;

    const originCoords = firstRoute.segments[0].from;
    const destCoords = firstRoute.segments[firstRoute.segments.length - 1].to;

    // Parse coordinates (they might be city names, so use default coordinates)
    const cityCoords: { [key: string]: [number, number] } = {
      shanghai: [121.47, 31.23],
      hamburg: [9.99, 53.55],
      mumbai: [72.88, 19.08],
      rotterdam: [4.48, 51.92],
      singapore: [103.85, 1.29],
      "los angeles": [-118.24, 34.05],
      tokyo: [139.69, 35.68],
      "new york": [-74.01, 40.71],
      shenzhen: [114.06, 22.54],
      london: [-0.13, 51.51],
    };

    const origin =
      cityCoords[originCoords.toLowerCase()] || cityCoords["shanghai"];
    const destination =
      cityCoords[destCoords.toLowerCase()] || cityCoords["hamburg"];

    // Add route lines for each option with visual variation
    routes.slice(0, 3).forEach((route, idx) => {
      const color = idx === 0 ? "#2563eb" : idx === 1 ? "#f59e0b" : "#64748b";
      const width = idx === 0 ? 5 : 3;
      const opacity = disruptionActive && idx === 0 ? 0.3 : 0.85;

      // Create arc coordinates for visual separation
      const midpoint = [
        (origin[0] + destination[0]) / 2,
        (origin[1] + destination[1]) / 2,
      ];

      // Offset each route slightly for visibility
      const offset = (idx - 1) * 3; // -3, 0, +3 degrees
      const arcMidpoint = [midpoint[0], midpoint[1] + offset];

      // Create curved route (3 points: origin -> arc -> destination)
      const routeCoordinates = [origin, arcMidpoint, destination];

      map.current?.addSource(`route-${idx}`, {
        type: "geojson",
        data: {
          type: "Feature",
          properties: {},
          geometry: {
            type: "LineString",
            coordinates: routeCoordinates,
          },
        },
      });

      map.current?.addLayer({
        id: `route-${idx}`,
        type: "line",
        source: `route-${idx}`,
        layout: {
          "line-join": "round",
          "line-cap": "round",
        },
        paint: {
          "line-color": color,
          "line-width": width,
          "line-opacity": opacity,
          "line-dasharray": idx === 0 ? [1] : [2, 2], // Solid for recommended, dashed for alternatives
        },
      });
    });

    // Add markers for origin and destination
    map.current?.addSource("points", {
      type: "geojson",
      data: {
        type: "FeatureCollection",
        features: [
          {
            type: "Feature",
            properties: { title: "Origin" },
            geometry: { type: "Point", coordinates: origin },
          },
          {
            type: "Feature",
            properties: { title: "Destination" },
            geometry: { type: "Point", coordinates: destination },
          },
        ],
      },
    });

    map.current?.addLayer({
      id: "points",
      type: "circle",
      source: "points",
      paint: {
        "circle-radius": 8,
        "circle-color": "#2563eb",
        "circle-stroke-width": 2,
        "circle-stroke-color": "#ffffff",
      },
    });

    // Fit map to show full route
    const bounds = new mapboxgl.LngLatBounds(origin, origin);
    bounds.extend(destination);
    map.current?.fitBounds(bounds, { padding: 100, duration: 1000 });
  }, [routes, mapLoaded, disruptionActive]);

  // Separate effect to update route opacity when disruption changes
  useEffect(() => {
    if (!map.current || !mapLoaded) return;

    // Small delay to ensure layers are loaded
    const timer = setTimeout(() => {
      try {
        // Update opacity for route-0 (recommended route)
        if (map.current && map.current.getLayer("route-0")) {
          map.current.setPaintProperty(
            "route-0",
            "line-opacity",
            disruptionActive ? 0.3 : 0.85
          );

          // Also change color to red/orange when disrupted
          if (disruptionActive) {
            map.current.setPaintProperty("route-0", "line-color", "#dc2626"); // Red
          } else {
            map.current.setPaintProperty("route-0", "line-color", "#2563eb"); // Blue
          }
        }
      } catch (error) {
        console.log("Map layer not ready yet:", error);
      }
    }, 100);

    return () => clearTimeout(timer);
  }, [disruptionActive, mapLoaded]);
  if (!MAPBOX_TOKEN) {
    return (
      <div className="h-96 bg-slate-100 flex items-center justify-center">
        <div className="text-center max-w-md">
          <p className="text-slate-600 mb-2">
            Map visualization requires a Mapbox token
          </p>
          <p className="text-sm text-slate-500">
            Add <code>NEXT_PUBLIC_MAPBOX_TOKEN</code> to your{" "}
            <code>.env.local</code> file
          </p>
          <p className="text-sm text-slate-500 mt-2">
            Get a free token at{" "}
            <a
              href="https://account.mapbox.com/access-tokens/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              mapbox.com
            </a>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      <div ref={mapContainer} className="h-96 w-full" />

      {/* Route Legend */}
      {routes && routes.length > 0 && (
        <div className="absolute top-4 right-4 bg-white rounded-lg shadow-lg p-3 text-sm z-10">
          <div className="font-semibold text-slate-900 mb-2">Route Options</div>
          <div className="space-y-2">
            {routes.slice(0, 3).map((route, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <div
                  className="w-8 h-1 rounded"
                  style={{
                    backgroundColor:
                      idx === 0 ? "#2563eb" : idx === 1 ? "#f59e0b" : "#64748b",
                    opacity: disruptionActive && idx === 0 ? 0.3 : 0.85,
                  }}
                />
                <span
                  className={`text-xs ${
                    idx === 0 ? "font-semibold text-blue-900" : "text-slate-600"
                  }`}
                >
                  {idx === 0 && "⭐ "}
                  {route.segments[0].mode.charAt(0).toUpperCase() +
                    route.segments[0].mode.slice(1)}
                  {route.segments.length > 1 && " + Multi-Modal"}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
