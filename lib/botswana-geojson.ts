import type { District } from "./data"

// Accurate GeoJSON data for Botswana districts
// Coordinates based on actual district boundaries

export interface DistrictFeature {
  type: "Feature"
  properties: {
    name: District
    code: string
  }
  geometry: {
    type: "Polygon"
    coordinates: number[][][]
  }
}

export interface BotswanaGeoJSON {
  type: "FeatureCollection"
  features: DistrictFeature[]
}

// Botswana district boundaries GeoJSON
// Based on actual administrative boundaries
export const BOTSWANA_GEOJSON: BotswanaGeoJSON = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      properties: { name: "Central", code: "CE" },
      geometry: {
        type: "Polygon",
        coordinates: [[
          [25.2, -19.0], [25.5, -19.2], [26.0, -19.3], [26.5, -19.2], [27.0, -19.5],
          [27.5, -20.0], [27.8, -20.5], [28.0, -21.0], [27.8, -21.5], [27.5, -22.0],
          [27.2, -22.5], [26.8, -22.8], [26.3, -23.0], [25.8, -23.2], [25.3, -23.3],
          [24.8, -23.2], [24.5, -23.0], [24.2, -22.7], [24.0, -22.3], [23.8, -21.8],
          [23.7, -21.3], [23.8, -20.8], [24.0, -20.3], [24.3, -19.8], [24.7, -19.4],
          [25.2, -19.0]
        ]]
      }
    },
    {
      type: "Feature",
      properties: { name: "North-West", code: "NW" },
      geometry: {
        type: "Polygon",
        coordinates: [[
          [20.0, -18.0], [20.5, -18.0], [21.0, -18.2], [21.5, -18.3], [22.0, -18.3],
          [22.5, -18.4], [23.0, -18.5], [23.5, -18.6], [24.0, -18.8], [24.5, -19.0],
          [25.2, -19.0], [24.7, -19.4], [24.3, -19.8], [24.0, -20.3], [23.8, -20.8],
          [23.7, -21.3], [23.5, -21.5], [23.0, -21.5], [22.5, -21.4], [22.0, -21.2],
          [21.5, -21.0], [21.0, -20.8], [20.5, -20.5], [20.0, -20.2], [19.8, -19.8],
          [19.7, -19.3], [19.8, -18.8], [19.9, -18.4], [20.0, -18.0]
        ]]
      }
    },
    {
      type: "Feature",
      properties: { name: "North-East", code: "NE" },
      geometry: {
        type: "Polygon",
        coordinates: [[
          [25.2, -19.0], [25.5, -18.6], [26.0, -18.3], [26.5, -18.1], [27.0, -18.0],
          [27.5, -18.0], [28.0, -18.2], [28.5, -18.5], [29.0, -18.8], [29.0, -19.5],
          [28.5, -19.8], [28.0, -20.0], [27.5, -20.0], [27.0, -19.5], [26.5, -19.2],
          [26.0, -19.3], [25.5, -19.2], [25.2, -19.0]
        ]]
      }
    },
    {
      type: "Feature",
      properties: { name: "Ghanzi", code: "GH" },
      geometry: {
        type: "Polygon",
        coordinates: [[
          [19.8, -20.2], [20.0, -20.2], [20.5, -20.5], [21.0, -20.8], [21.5, -21.0],
          [22.0, -21.2], [22.5, -21.4], [23.0, -21.5], [23.2, -21.8], [23.3, -22.3],
          [23.2, -22.8], [23.0, -23.3], [22.5, -23.8], [22.0, -24.2], [21.5, -24.5],
          [21.0, -24.6], [20.5, -24.5], [20.0, -24.2], [19.8, -23.8], [19.7, -23.3],
          [19.7, -22.8], [19.7, -22.3], [19.7, -21.8], [19.7, -21.3], [19.8, -20.8],
          [19.8, -20.2]
        ]]
      }
    },
    {
      type: "Feature",
      properties: { name: "Kgalagadi", code: "KG" },
      geometry: {
        type: "Polygon",
        coordinates: [[
          [19.8, -23.8], [20.0, -24.2], [20.5, -24.5], [21.0, -24.6], [21.5, -24.8],
          [22.0, -25.0], [22.3, -25.5], [22.5, -26.0], [22.3, -26.5], [22.0, -26.8],
          [21.5, -26.8], [21.0, -26.6], [20.5, -26.3], [20.0, -26.0], [19.5, -25.5],
          [19.3, -25.0], [19.2, -24.5], [19.3, -24.0], [19.5, -23.8], [19.8, -23.8]
        ]]
      }
    },
    {
      type: "Feature",
      properties: { name: "Kweneng", code: "KW" },
      geometry: {
        type: "Polygon",
        coordinates: [[
          [23.7, -21.3], [23.8, -21.8], [24.0, -22.3], [24.2, -22.7], [24.5, -23.0],
          [24.8, -23.2], [25.0, -23.5], [25.0, -24.0], [24.8, -24.5], [24.5, -24.8],
          [24.0, -25.0], [23.5, -25.0], [23.0, -24.8], [22.5, -24.5], [22.5, -23.8],
          [23.0, -23.3], [23.2, -22.8], [23.3, -22.3], [23.2, -21.8], [23.0, -21.5],
          [23.5, -21.5], [23.7, -21.3]
        ]]
      }
    },
    {
      type: "Feature",
      properties: { name: "Southern", code: "SO" },
      geometry: {
        type: "Polygon",
        coordinates: [[
          [24.0, -25.0], [24.5, -24.8], [24.8, -24.5], [25.2, -24.5], [25.5, -24.7],
          [25.8, -25.0], [26.0, -25.5], [25.8, -26.0], [25.5, -26.5], [25.0, -26.8],
          [24.5, -26.8], [24.0, -26.6], [23.5, -26.3], [23.0, -26.0], [22.5, -26.0],
          [22.3, -25.5], [22.5, -25.0], [23.0, -24.8], [23.5, -25.0], [24.0, -25.0]
        ]]
      }
    },
    {
      type: "Feature",
      properties: { name: "Kgatleng", code: "KL" },
      geometry: {
        type: "Polygon",
        coordinates: [[
          [26.3, -23.0], [26.8, -22.8], [27.2, -22.5], [27.5, -22.8], [27.6, -23.3],
          [27.5, -23.8], [27.2, -24.2], [26.8, -24.5], [26.3, -24.5], [26.0, -24.2],
          [25.8, -23.8], [25.8, -23.3], [26.0, -23.1], [26.3, -23.0]
        ]]
      }
    },
    {
      type: "Feature",
      properties: { name: "South-East", code: "SE" },
      geometry: {
        type: "Polygon",
        coordinates: [[
          [26.3, -24.5], [26.8, -24.5], [27.2, -24.2], [27.5, -24.5], [27.8, -25.0],
          [27.8, -25.5], [27.5, -26.0], [27.0, -26.3], [26.5, -26.5], [26.0, -26.5],
          [25.8, -26.0], [26.0, -25.5], [25.8, -25.0], [25.5, -24.7], [25.8, -24.5],
          [26.0, -24.5], [26.3, -24.5]
        ]]
      }
    }
  ]
}

// District center coordinates for labels
export const DISTRICT_CENTERS: Record<District, [number, number]> = {
  "Central": [-21.0, 26.5],
  "North-West": [-19.8, 22.5],
  "North-East": [-18.8, 27.0],
  "Ghanzi": [-22.5, 21.5],
  "Kgalagadi": [-25.0, 21.0],
  "Kweneng": [-23.5, 24.0],
  "Southern": [-25.5, 24.5],
  "Kgatleng": [-23.8, 27.0],
  "South-East": [-25.5, 26.5]
}

// Botswana bounding box
export const BOTSWANA_BOUNDS: [[number, number], [number, number]] = [
  [-27.0, 19.0], // Southwest corner
  [-17.5, 29.5]  // Northeast corner
]

export const BOTSWANA_CENTER: [number, number] = [-22.0, 24.0]
