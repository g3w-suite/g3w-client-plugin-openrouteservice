export default {
  api: {
    urls: {
     compatible_layers: "/openrouteservice/api/compatible_layers", //TO ADD PROJECTID
     isochrone_mapcoordinates: "/openrouteservice/api/isochrone", //TO ADD PROJECTID
     isochrone_from_layer:  "/openrouteservice/api/isochrone_from_layer", //TO ADD PROJECTID AND LAYER ID
     task: "/openrouteservice/api/isochrone_from_layer_result" //TO ADD PROJECTID AND TASK ID RETURNED BY ABOVE API
    },
  },
  form: {
    isochrones: [
      {
        visible: true,
        name: "name",
        type: "varchar",
        i18n_label: "openrouteservice.isochrones.label.name",
        label: "",
        editable: true,
        validate: {
          required: true,
          valid: false
        },
        pk: false,
        default: "" ,
        input: {
          type: "text",
          options: {}
        },
        value: null
      },
      {
        visible: true,
        name: "profile",
        type: "varchar",
        i18n_label: "openrouteservice.isochrones.label.profile",
        label: "",
        dropdownParent: false,
        nullOption: false,
        editable: true,
        validate: {
          required: true,
          valid: false
        },
        pk: false,
        default: "",
        input: {
          type: "select",
          options: {
            values: [],
            default: null
          }
        },
        value: null
      },
      {
        visible: true,
        name: "range_type",
        type: "varchar",
        i18n_label: "openrouteservice.isochrones.label.range_type",
        label: "",
        dropdownParent: false,
        nullOption: false,
        editable: true,
        validate: {
          required: true,
          valid: true
        },
        pk: false,
        default: "",
        input: {
          type: "select",
          options: {
            values: [
              {
                key: "Time (minutes)",
                value: "time"
              },
              {
                key: "Distance (meters)",
                value:"distance"
              }
             ],
            value: "time"
          },
        },
        value: "time"
      },
      {
        visible: true,
        name: "range",
        type: "varchar",
        i18n_label: "openrouteservice.isochrones.label.range",
        label: "",
        info: "[MIN: 1 - MAX: 60]",
        editable: true,
        validate: {
          required: true,
          valid: false,
          message: null
        },
        pk: false,
        default: "",
        input: {
          type: "text",
          options: {
            min: 1
          }
        },
        value: '1'
      },
      {
        visible: true,
        name: "interval",
        type: "float",
        i18n_label: "openrouteservice.isochrones.label.interval",
        label: "",
        editable: false,
        validate: {},
        pk: false,
        default: "",
        input: {
          type: "slider",
          options: {
            min:0,
            max: 0,
            step:1
          }
        },
        value: 0
      },
      {
        visible: true,
        name: "stroke_width",
        type: "float",
        i18n_label: "openrouteservice.isochrones.label.stroke_width",
        label: "",
        editable: true,
        step: 0.01,
        validate: {
          required: true,
          valid: false
        },
        pk: false,
        default: "",
        input: {
          type: "float",
          options: {
            min:0
          }
        },
        value: 0.26
      },
      {
        visible: true,
        name: "color",
        type: "varchar",
        i18n_label: "openrouteservice.isochrones.label.color",
        label: "Color",
        editable: true,
        validate: {},
        pk: false,
        default: "" ,
        input: {
          type: "color",
          options: {}
        },
        value: '#FF0000'
      },
      {
        visible: true,
        name: "transparency",
        type: "float",
        i18n_label: "openrouteservice.isochrones.label.transparency",
        label: "",
        editable: true,
        validate: {
          required: true,
          valid: false
        },
        pk: false,
        default: "",
        input: {
          type: "slider",
          options: {
            min:0,
            max: 1,
            step:0.1
          }
        },
        value: 0.8
      },
    ],
    inputs: {
      mapcoordinates: [
        {
          visible: true,
          name: 'locations',
          type: "float",
          i18n_labels: {
            lon: "openrouteservice.inputs.label.mapcoordinates.lon",
            lat: "openrouteservice.inputs.label.mapcoordinates.lat",
          },
          labels: {
            lon: "",
            lat: ""
          },
          epsg: 'EPSG:4326', //SET OUTPUTEPSG
          dropdownParent: false,
          nullOption: false,
          editable: true,
          validate: {
            required: true,
            valid: true
          },
          pk: false,
          default: "",
          input: {
            type: "lonlat",
            options: {},
          },
          values: {
            lon: 0,
            lat: 0
          },
          value: [[0, 0]]
        },
      ],
      from_layer: [
        {
          visible: true,
          name: "from_layer",
          type: "varchar",
          i18n_label: "openrouteservice.inputs.label.from_layer",
          label: "Layer",
          dropdownParent: false,
          nullOption: false,
          editable: true,
          validate: {
            required: true,
            valid: true
          },
          pk: false,
          default: "",
          input: {
            type: "select",
            options: {
              values: [],
              value: null
            },
          },
          value: null
        },
      ]
    },
    outputs: {
      newlayer: [
        {
          visible: true,
          name: "new_layer_name",
          type: "varchar",
          i18n_label: "openrouteservice.outputs.label.new_layer_name",
          label: "",
          editable: true,
          validate: {
            required: true,
            valid: false
          },
          pk: false,
          default: "" ,
          input: {
            type: "text",
            options: {}
          },
          value: null
        },
        {
          visible: true,
          name: "connection_id",
          type: "varchar",
          i18n_label: "openrouteservice.outputs.label.connection_id",
          label: "",
          dropdownParent: false,
          nullOption: false,
          editable: true,
          validate: {
            required: true,
            valid: true
          },
          pk: false,
          default: "",
          input: {
            type: "select",
            options: {
              values: [
                {
                  i18n_key: "openrouteservice.outputs.label.input.select.__shapefile__",
                  key: "New Shapefile", //'_', '', ''
                  value: "__shapefile__"
                },
                {
                  i18n_key: "openrouteservice.outputs.label.input.select.__spatialite__",
                  key: "New Spatialite",
                  value:"__spatialite__"
                },
                {
                  i18n_key: "openrouteservice.outputs.label.input.select.__geopackage__",
                  key: 'New Geopackage',
                  value: "__geopackage__"
                }
              ],
            },
          },
          value: "__shapefile_"
        }
      ],
      existinglayer: [
        {
          visible: true,
          name: "qgis_layer_id",
          type: "varchar",
          label: "Existing Layer",
          dropdownParent: false,
          nullOption: false,
          editable: true,
          validate: {
            required: true,
            valid: true
          },
          pk: false,
          default: "",
          input: {
            type: "select",
            options: {
              values: [],
            },
          },
          value: null
        }
      ]
    }
  }
}