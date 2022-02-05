<template>
  <div>
    <v-row class="ma-1">
        <v-menu
        ref="menu2"
        v-model="menu2"
        :close-on-content-click="false"
        :nudge-right="40"
        transition="scale-transition"
        offset-y
        max-width="290px"
        min-width="290px"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-text-field
            v-model="mytime"
            dense
            hide-details
            outlined
            :label="label"
            append-icon="mdi-clock-time-four-outline"
            readonly
            v-bind="attrs"
            v-on="on"
          ></v-text-field>
        </template>
        <v-time-picker
          v-if="menu2"
          v-model="mytime"
          scrollable
          @click:minute="$refs.menu2.save(mytime)"
        ></v-time-picker>
      </v-menu>

      
    </v-row>
  </div>
</template>

<script>
export default {
  props: ["label",'time'],
  name: "timePicker",
  data() {
    return {
      menu: false,
       menu2: false,
    };
  },
  mounted() {
    // this.mytime=
  },
  
   computed: {
    mytime: {
      get () {
        console.log( this.time);
        let t 
        this.time == undefined? t =undefined:t=this.time.replace("AM", "").replace("PM", "")
        return t

},
      set (value) {
      this.$emit("myEventTime", value);
      }
    }
  },
 
};
</script>

<style lang="scss" scoped>
</style>