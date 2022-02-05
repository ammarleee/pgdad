<template>
  <v-container >
    <div v-for="(item,i) in printData" :key="i">
         <!-- <div slot="barcode" ref="one" :id="item.id" v-if="item">
           {{generateBarcode(item.id)}}
              </div> -->
      <app-barcode :item="item" > </app-barcode>
      <v-divider style="margin-top:270px ;border:2px solid red" ></v-divider>
      <!-- second -->
      <app-barcode :item="item"> </app-barcode>
    </div>
  </v-container>

</template>

<script>
import AppBarcode from './AppBarcode.vue';
import JsBarcode from 'jsbarcode';

export default {
  components: { AppBarcode },
  data() {
    return {
      te:false,
      printData:[],
      m:[]
    };
  },
  created() {
    this.printData = this.$store.getters.printinData;
  },
  
    destroyed() {
    this.$store.commit("printData",null);
  },
 
};
</script>

<style lang="scss" scoped>
.print {
  margin-bottom: 200px;
}
.ammar div {
  text-align: center !important;
}

</style>