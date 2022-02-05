<template>
  <div>
    <Header @menuBtn="menuBtnClicked" isDashboard="true"></Header>
    <v-navigation-drawer app right :mini-variant.sync="drawer" mobile-breakpoint="100">
      <template v-slot:prepend>
        <v-img src="../assets/thumbnail_663f51850657_1x.webp"></v-img>
      </template>

      <v-list-group
        no-action
        v-for="item in menu"
        :key="item.title"
        dark
        active-class="primary white--text"
      >
        <template v-slot:activator>
          <v-list-item-icon>
            <v-icon color="error">{{ item.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </template>

        <v-list-item
          active-class="info white--text"
          v-for="child in item.child"
          :key="child.title"
          :to="child.href"
        >
          <v-icon v-text="child.icon"></v-icon>
          <v-list-item-title v-text="child.title"></v-list-item-title>
        </v-list-item>
      </v-list-group>

      <template v-slot:append>
        <div class="pa-2">
          <v-btn block @click="logOut" outlined plain class="red--text">
            <v-icon left>mdi-logout</v-icon>
            تسجيل الخروج</v-btn
          >
        </div>
      </template>
    </v-navigation-drawer>

    <v-main>
      <v-container fluid class="pa-3 grey lighten-3">
        <v-breadcrumbs :items="location">
          <template v-slot:divider>
            <v-icon>mdi-arrow-left</v-icon>
          </template>
          <template v-slot:item="{ item }">
            <v-breadcrumbs-item :to="item.href" class="text-capitalize">{{
              item.name
            }}</v-breadcrumbs-item>
            <router-link :to="item.href"></router-link>
          </template>
        </v-breadcrumbs>
        <div class="rounded-lg pa-3 white" style="min-height:690px">
          <slot />
        </div>
      </v-container>
    </v-main>

    <!-- <Footer/> -->
  </div>
</template>

<script>
import Header from "@/features/shared/components/Navigations/Header.vue";
// import Footer from '@/features/shared/components/Navigations/Footer.vue'

export default {
  components: {
    Header
    // Footer
  },
  data() {
    return {
      drawer: false,

      menu: [
        {
          title: "إنشاء حساب",
          icon: "fa fa-file-invoice",
          child: [
            // {
            //   href: "/shipping/shipment",
            //   title: "حساب إنشاء كابتن",
            //   icon: "fa fa-scroll"
            // },
            {
              href: "/shipping/Drivers",
              title: "إنشاء كابتن",
              icon: "fa fa-shipping-fast"
            },
            {
              href: "/shipping/branchPolisa",
              title: "حساب إنشاء مطعم",
              icon: "fa fa-utensils"
            },
            {
              href: "/shipping/clientPolisa",
              title: "حساب إنشاء موظف",
              icon: "fa fa-user"
            },
            {
              href: "/shipping/search",
              title: "المتقدمين علي وظائف",
              icon: "fas fa-users-cog"
            }
          ]
        },
        {
          title: "إتصال",
          icon: "fa fa-phone"
        },
        {
          title: "الرصيد",
          icon: "fa fa-money"
        },
        {
          title: "تقارير",
          icon: "fa fa-scroll"
        }
      ]
    };
  },
  methods: {
    getInials() {
      if (!this.user) return "";
      var user = this.user;
      return user.firstName.charAt(0) + user.lastName.charAt(0);
    },
    logOut() {
      console.log("user log out");
      this.$store.dispatch("logOut").then(() => {
        console.log("user log out 2 ");

        this.$router.push("/login");
      });
    },
    menuBtnClicked(event) {
      this.drawer = !this.drawer;
      console.log("drawer", this.drawer);
    }
  },
  computed: {
    user() {
      return this.$store.getters.user;
    },
    location() {
      let paths = [
        {
          name: "الرئيسيه",
          href: "/dashboard",
          icon: "mdi-home",
          disabled: true
        }
      ];
      return paths;
      let path = this.$route.path;
      if (path === "/dashboard") {
        return;
      }

      var selectedRoute = [path];
      var tempList = [];

      tempList = [
        ...tempList,
        ...this.menu.filter(item => item.child.some(i => selectedRoute.includes(i.href)))
      ];
      let withArabic = tempList[0].child.filter(item => item.href == path);

      paths.push({ name: tempList[0].title, href: path });
      paths.push({ name: withArabic[0].title, href: path });
      return paths;
    }
  }
};
</script>

<style lang="scss" scoped></style>
