<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<script>
import "@bcgov/bootstrap-theme/dist/css/bootstrap-theme.min.css";
import 'common-lib-vue/dist/common-lib-vue.css';
import { v4 as uuidv4 } from "uuid";
import { SET_UUID } from './store';

export default {
  name: "App",
  created() {
    const { version: projectVersion } = require('../package.json');
    console.log('Canonical Version:', projectVersion);
    this.$store.commit(SET_UUID, uuidv4());
  }
};
</script>

<style lang="scss">
main {
  padding: 0;
}

label {
  margin: 0 !important;
}

input[type="radio"] {
  min-width: 18px;
  width: 18px;
  height: 18px;
}

.footer {
  position: fixed;
  width: 100vw;
  bottom: 0;
}

.text-danger {
  color: #D8292F !important;
}

.bottom {
  position: fixed;
  right: 40px;
  bottom: 0;
}

.mb {
  margin-bottom: 80px;
}

.submission-type {
  background: #eee;
  padding: 4px 8px 0 8px;
  display: flex;
  flex: 1;
  align-items: center;

  .name {
    width: 50%;
    text-align: right;
    padding-right: 8px;
  }

  .radios {
    width: 50%;
    padding: 0 6px;
  }
}
</style>
