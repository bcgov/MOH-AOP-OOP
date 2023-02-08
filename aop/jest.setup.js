import { config } from "@vue/test-utils";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

config.global.components = {
  "font-awesome-icon": FontAwesomeIcon,
};