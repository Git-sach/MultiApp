export interface DepartementSvg extends Departement{
  svg_coordinates: string,
}

export interface Departement {
  code: number,
  name: string,
  found?: boolean
}
