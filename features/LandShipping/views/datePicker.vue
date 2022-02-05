<template>
  <div>
    <v-row>
      <v-col cols="12" sm="12" md="12">
         
        <v-menu
          ref="menu"
          v-model="menu"
          :close-on-content-click="false"
          transition="scale-transition"
          offset-y
          min-width="auto"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              outlined
              hide-details
              dense
              :label="label"
              :disabled="disabled"
              v-model="mydate"
              append-icon="mdi-calendar"
              readonly
              v-bind="attrs"
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker v-model="mydate" scrollable>
            <v-spacer></v-spacer>
            <v-btn text color="primary" @click="menu = false">Cancel</v-btn>
            <v-btn text color="primary" @click="$refs.menu.save(mydate)">OK</v-btn>
          </v-date-picker>
        </v-menu>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  props: ["label",'date','disabled'],
  name: "datePicker",
  data() {
    return {
      menu: false,
    };
  },
   computed: {
    mydate: {
      get () {
        return this.date
      },
      set (value) {
      this.$emit("myEvent", value);

      }
    }
  },
  methods: {
    submitDate(date) {
      // this.$refs.menu.save(date);
      this.$emit("myEvent", date);
    },
  },
};
</script>

<style lang="scss" scoped>
</style>