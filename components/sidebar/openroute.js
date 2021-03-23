const template = require('./openroute.html');

export default function Openroute({service}={}){
  return  {
    name: "isochrone",
    data(){
      return {};
    },
    template,
    computed: {},
    methods:{
      point(){
        console.log('point')
      },
      polygon(){
        console.log('polygon')
      }
    },
    created(){},
    async mounted(){}
  }
};
