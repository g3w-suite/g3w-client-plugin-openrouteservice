///GET /openrouteservice/api/compatible_layers/<project_id>/
export default  {
  "compatible":[
    "isochrone_gpkg2_adcd09df_94bc_413b_a792_ff42276ff0cc",
    "isochrone_gpkg_15b2116a_25f5_430c_b9ad_a86dc425ce5f",
    "isochrone_gpkg_style_35d31149_31c0_4bda_9084_0ed3584e4926",
    "isochrone_postgres_49ec3537_8631_4c29_832d_15c91c2430e6",
    "isochrone_shp_825bc382_628b_4b3b_a078_c377aad56a8d",
    "isochrone_spatialite_b507eaeb_46bb_41bf_80d6_662d21ad9c9a",
    "isochrone_sqlite2_ddc0a1cd_496d_449d_aa51_470fbaeecfa4",
    "isochrone_sqlite_45de826d_c6a2_4057_bb32_16bb5c2f18df",
    "openrouteservice_compatible_2926331a_f498_4caa_8914_bb571b1a746e",
    "openrouteservice_compatible_3857_e2c570ea_c4e4_46f0_a38c_44024d8e605d"
  ],
  "connections":[
    {
      "id":"isochrone gpkg.gpkg",
      "name":"isochrone gpkg.gpkg",
      "provider":"ogr"
    },
    {
      "id":"isochrone gpkg style.gpkg",
      "name":"isochrone gpkg style.gpkg",
      "provider":"ogr"
    },
    {
      "id":"dbname='test_g3w-admin' host=localhost port=5432 user='ale' sslmode=disable schema='openrouteservice test'",
      "name":"test_g3w-admin (postgres host:localhost, port:5432, schema:'openrouteservice test')",
      "provider":"postgres",
      "schema":"openrouteservice test"
    },
    {
      "id":"dbname=\\'/tmp/QGIS3-CMdUfV/isochrone sqlite.sqlite\\' table=\"isochrone sqlite2\" ",
      "name":"isochrone sqlite.sqlite (spatialite )",
      "provider":"spatialite",
      "schema":""
    },
    {
      "id":"isochrone sqlite.sqlite",
      "name":"isochrone sqlite.sqlite",
      "provider":"ogr"
    }
  ]
}
