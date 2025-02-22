export interface FestivalsResponse {
    name?: string;
    bands: Band[];
}

export interface Band {
    name: string;
    recordLabel?: string;
}