export interface PolygonDepartments {
  type: string;
    geometry: {
        type: string;
        coordinates: number[][];
    };
    properties: {
        code: string;
        nom: string;
    };
}
