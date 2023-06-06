export interface DepartementSvg extends Departement{
  svg_coordinates: string,
}

export interface Departement {
  code: number,
  name: string,
  found?: boolean
}

// même interface mais avec string possible pour la corse
export interface DepartementFoView {
  code: number | string,
  name: string,
  found?: boolean
}
