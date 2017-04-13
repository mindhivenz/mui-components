export const geoPointToMapPoint = ({
  coordinates: [lng, lat],
  type,
}) => {
  if ('Point' !== type) {
    console.error(`Data is not a geoPoint, type = ${type}`)
  }
  return {lat, lng}
}