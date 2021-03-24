//POST /openrouteservice/api/isochrone/<project_id>/

/*
* Pass the connection_id or use the special values __shapefile__ __geopackage__ __spatialite__ to create a new file.
* */

export const NEW_LAYER = {
  "qgis_layer_id": null,
  "connection_id": "test_g3w-admin (postgres host:localhost, port:5432, schema:'openrouteservice test')",
  "new_layer_name": null,
  "name": "New isochrone",
  "profile": "driving-car",
  "ors": {
    "locations": [[-77.023902, 38.902293]],
    "range_type": "time",
    "range": [480],
    "interval": 60,
    "location_type": "start",
    "attributes": [
      "area",
      "reachfactor"
    ]
  }
};


export const EXISTING_LAYER = {
  "qgis_layer_id": "isochrone_gpkg_style_35d31149_31c0_4bda_9084_0ed3584e4926",
  "connection_id": null,
  "new_layer_name": null,
  "name": "New isochrone",
  "profile": "driving-car",
  "ors": {
    "locations": [[-77.023902, 38.902293]],
    "range_type": "time",
    "range": [480],
    "interval": 60,
    "location_type": "start",
    "attributes": [
      "area",
      "reachfactor"
    ]
  }
};

