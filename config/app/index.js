export default {
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
        name: "profiles",
        type: "varchar",
        label: "Profiles",
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
        type: "float",
        label: "Range",
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
        name: "interval",
        type: "float",
        label: "Interval",
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
            max: 10,
            step:1
          }
        },
        value: 0
      },
      {
        name: "penwidth",
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
        value: null
      },
    ],

    inputs: {
      mapcordinates: [
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
              values: [
                {
                  key: "Layer1",
                  value: "0"
                },
                {
                  key: "Layer2",
                  value:"1"
                }
              ],
              value: "0"
            },
          },
          value: "0"
        },
      ]
    },

    outputs: {
      newlayer: [
        {
          name: "outputlayername",
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
          name: "datasourceoutput",
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
                  key: "Source1",
                  value: "0"
                },
                {
                  key: "Source2",
                  value:"1"
                }
              ],
              value: "0"
            },
          },
          value: "0"
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
              values: [
                {
                  key: "Existing Layer 1",
                  value: "0"
                },
                {
                  key: "Existing Layer 2",
                  value:"1"
                }
              ],
              value: "0"
            },
          },
          value: "0"
        }
      ]
    }
  }
}