export interface Station {
    camels_id: string,
    nuts_lvl2: string,
    camels_path: string,
    provider_id: string,
    federal_state: string,
    x: number,
    y: number,
    area: number,
    has_out: boolean,
    q_count: number,
    w_count: number,
    [key: string]: number | boolean | string,
}

export type StationSource = GeoJSON.FeatureCollection<GeoJSON.Point, Station>
export type StationFeature = GeoJSON.Feature<GeoJSON.Point, Station>