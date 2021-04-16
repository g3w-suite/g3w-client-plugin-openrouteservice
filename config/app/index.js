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
        name: "name",
        type: "varchar",
        label: "Name",
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
        name: "profile",
        type: "varchar",
        label: "Profile",
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
        name: "range_type",
        type: "varchar",
        label: "Mode",
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
                key: "Time (seconds)",
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
        name: "range",
        type: "varchar",
        label: "Range",
        editable: true,
        validate: {
          required: true,
          valid: false
        },
        pk: false,
        default: "",
        input: {
          type: "text",
          options: {}
        },
        value: '0'
      },
      {
        name: "interval",
        type: "float",
        label: "Interval",
        editable: false,
        validate: {},
        pk: false,
        default: "",
        input: {
          type: "slider",
          options: {
            min:0,
            max: 10,
            step:1
          }
        },
        value: 0
      },
      {
        name: "stroke_width",
        type: "float",
        label: "Pen width",
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
        name: "color",
        type: "varchar",
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
        name: "transparency",
        type: "float",
        label: "Transparency",
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
          name: 'locations',
          type: "float",
          labels: {
            lon: "Longitude",
            lat: "Latitude"
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
          name: "form_layer",
          type: "varchar",
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
          name: "new_layer_name",
          type: "varchar",
          label: "Layer name",
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
          name: "connection_id",
          type: "varchar",
          label: "Datasource",
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
                  key: "New Shapefile", //'_', '', ''
                  value: "__shapefile__"
                },
                {
                  key: "New Spatialite",
                  value:"__spatialite__"
                },
                {
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
          name: "outputexistinglayer",
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