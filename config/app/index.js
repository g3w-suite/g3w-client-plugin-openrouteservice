export default {
  api: {
    urls: {
     compatible_layers: "/openrouteservice/api/compatible_layers", //TO ADD PROJECTID
     isochrone_mapcoordinates: "/openrouteservice/api/isochrone", //TO ADD PROJECTID
     isochrone_from_layer:  "/openrouteservice/api/isochrone_from_layer", //TO ADD PROJECTID AND LAYER ID
     task: "/openrouteservice/api/isochrone_from_layer_result" //TO ADD PROJECTID AND TASK ID RETURNED BY ABOVE API
    },
    post:{
      data: {
        // Append to existing layer
        'qgis_layer_id': 'layer_id', // QGIS vector layer id, mutually exclusive with connection_id
        // In case of new layer:
        'connection_id': null, // mutually exclusive with layer_id
        'new_layer_name': null, // mutually exclusive with layer_id
        '': null, // mutually exclusive with layer_id
        'profile': "driving-car",
        'color': ['Red', 'Green', 'Blue'],  // 0-255 RGB values
        'transparency': 0.5, // 0-1, 0: fully opaque, 1: fully transparent
        'name' : 'name of the new isochrone',
        'stroke_width': 0.26, // float, QGIS default is 0.26
        // This goes straight to ORS API
        'ors': {
          "locations":[[10.859513,43.401984]],  // May be null in case of `layer_id`
          "range_type": "time",  // Time or distance
          "range": [480],
          "interval": 60,
          //fixed
          "location_type": "start",
          "attributes":[
            "area",
            "reachfactor",
            "total_pop"
          ]
        }
      }
    }
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
        name: "mode",
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
        editable: true,
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
        value: 0
      },
    ],
    inputs: {
      mapcoordinates: [
        {
          name: "longitude",
          type: "float",
          label: "Longitude",
          editable: true,
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
          value: 0
        },
        {
          name: "latitude",
          type: "float",
          label: "Latitude",
          editable: true,
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
          value: 0
        },
      ],
      existingpointlayer: [
        {
          name: "existingpoitlayer",
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
                  key: "Shapefile", //'_', '', ''
                  value: "__shapefile_"
                },
                {
                  key: "Spatialite",
                  value:"__spatialite__"
                },
                {
                  key: 'Geopackage',
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