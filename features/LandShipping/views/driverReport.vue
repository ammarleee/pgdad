<template>
  <v-app >
    <div >
    <div class="mt-16">
        <div class="mx-auto" style="width:500px">
          <h2  class="data pa-2 text-h5 text-center " >
            كشف تسليم رحلة لسائق
          </h2>
        </div>
      
    <div class="ma-5 mt-10 mb-16 pa-5 driver">
       <v-row class=" text-center ammar"> 
        <v-col cols="12" sm="2" class="data "> التاريخ </v-col>
        <v-col cols="12" sm="4" >{{entities.date}} </v-col>
        <v-col cols="12" sm="2" > نوع الرحلة </v-col>
        <v-col cols="12" sm="4" > {{entities.line.fullLine}} </v-col>
        <v-col cols="12" sm="2" > رقم الرحلة </v-col>
        <v-col cols="12" sm="4" >{{entities.id}}</v-col>
        <v-col cols="12" sm="2" >عدد الطرود</v-col>
        <v-col cols="12" sm="4" >{{shipments.length}}</v-col>
        <v-col cols="12" sm="2" >أسم السائق</v-col>
        <v-col cols="12" sm="4" >{{entities.driver.name}}</v-col>
        <v-col cols="12" sm="2" >رقم الهوية</v-col>
        <v-col cols="12" sm="4" >{{entities.driver.id}}</v-col>
        <v-col cols="12" sm="2" >رقم الكفيل</v-col>
        <v-col cols="12" sm="4" >{{entities.driver.sponserMob}}</v-col>
        <v-col cols="12" sm="2" >رقم الجوال</v-col>
        <v-col cols="12" sm="4" >{{entities.driver.sponserMob}}</v-col>
        <v-col cols="12" sm="2" >رقم اللوحة</v-col>
        <v-col cols="12" sm="4" >{{entities.driver.licenseNo}}</v-col>
        <v-col cols="12" sm="2" > نوع السيارة </v-col>
        <v-col cols="12" sm="4" >{{entities.driver.carType||'unknow'}} </v-col>
        <v-col cols="12" sm="2" > من مدينة </v-col>
        <v-col cols="12" sm="4" >{{entities.line.source.name}}</v-col>
        <v-col cols="12" sm="2" > الي مدينة </v-col>
        <v-col cols="12" sm="4" > {{entities.line.destination.name}} </v-col>
      </v-row>
      <h4 class="mt-5 text-center">
        استلمت انا سائق الرحلة المذكورة اعلاه مؤسسة رائد علي الاحمري لنقل
        البضائع وأتعهد بتسليمها للعنوان الموضح أعلاه
      </h4>
      <div class="driverInfo pa-3 font-weight-bold mt-10 text-right">
        <p>اسم وتوقيع السائق /</p>
        <p>التاريخ/</p>
      </div>
    </div>
    </div>

    <div class="mt-16">
  <div class="mx-auto" style="width:500px">
          <h2  class="data pa-2 text-h5 text-center " >
            كشف تسليم رحلة لسائق
          </h2>
        </div>
    <div class="ma-5 pa-5 mt-10  text-center">
       <v-row class=" text-center ammar"> 
        <v-col cols="12" sm="2" class="data "> التاريخ </v-col>
        <v-col cols="12" sm="4" >{{entities.date}} </v-col>
        <v-col cols="12" sm="2" > نوع الرحلة </v-col>
        <v-col cols="12" sm="4" > {{entities.line.fullLine}} </v-col>
        <v-col cols="12" sm="2" > رقم الرحلة </v-col>
        <v-col cols="12" sm="4" >{{entities.id}}</v-col>
        <v-col cols="12" sm="2" >عدد الطرود</v-col>
        <v-col cols="12" sm="4" >{{shipments.length}}</v-col>
        <v-col cols="12" sm="2" >أسم السائق</v-col>
        <v-col cols="12" sm="4" >{{entities.driver.name}}</v-col>
        <v-col cols="12" sm="2" >رقم الهوية</v-col>
        <v-col cols="12" sm="4" >{{entities.driver.id}}</v-col>
        <v-col cols="12" sm="2" >رقم الكفيل</v-col>
        <v-col cols="12" sm="4" >{{entities.driver.sponserMob}}</v-col>
        <v-col cols="12" sm="2" >رقم الجوال</v-col>
        <v-col cols="12" sm="4" >{{entities.driver.sponserMob}}</v-col>
        <v-col cols="12" sm="2" >رقم اللوحة</v-col>
        <v-col cols="12" sm="4" >{{entities.driver.licenseNo}}</v-col>
        <v-col cols="12" sm="2" > نوع السيارة </v-col>
        <v-col cols="12" sm="4" >{{entities.driver.carType||'unknow'}} </v-col>
        <v-col cols="12" sm="2" > من مدينة </v-col>
        <v-col cols="12" sm="4" >{{entities.line.source.name}}</v-col>
        <v-col cols="12" sm="2" > الي مدينة </v-col>
        <v-col cols="12" sm="4" > {{entities.line.destination.name}} </v-col>
      </v-row>
      <h4 class="mt-5 text-center">
        استلمت انا سائق الرحلة المذكورة اعلاه مؤسسة رائد علي الاحمري لنقل
        البضائع وأتعهد بتسليمها للعنوان الموضح أعلاه
      </h4>
      <div class="driverInfo pa-3 font-weight-bold mt-10 text-right">
        <p> اسم وتوقيع السائق /</p>
        <p>التاريخ /</p>
      </div>
    </div>
    </div>
    </div>

  </v-app>
</template>

<script>
export default {
    data(){
        return{
          shipments:null,
            entities:{
                // date:"3/4/2021",
                // tripType:'من جيزان ل ابها' ,
                // tripNum :65 ,
                // count:4,
                // driverName:'محمد',
                // idNum:21424,
                // responsNum:125125,
                // phoneNum:142535,
                // carNum:"2415 ثص",
                // carType:'14124قضص',
                // from:'جيزان',
                // to:'ابها',


            }
        }
    },
    created () {
       this.printData = this.$store.getters.printinData;
    this.entities = this.printData.tripDetails
    this.entities.line.fullLine =`${this.entities.line.source.name} الى  ${this.entities.line.destination.name} `
    
    this.shipments = this.printData.shipments;
    },
     methods: {
    async print () {
      // Pass the element id here
      //  window.print()
    
      // await this.$htmlToPaper('printMe');
    }
  }
};
</script>

<style lang="scss" scoped>
.ammar div {
     border: 1px solid black  !important;
  font-weight: 600  !important;
}

.driverInfo {
  border: 2px dotted black;
  width: 300px;
}
</style>