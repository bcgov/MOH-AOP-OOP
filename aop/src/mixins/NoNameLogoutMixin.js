import { routes } from "../router/routes";
import { scrollTo } from "../helpers/scroll";

export default {
  created() {
    if (!this.$store.state.firstName || !this.$store.state.lastName) {
      const path = routes.SIGN_IN.path;
      this.$router.push(path);
      scrollTo(0);
    }
  }
};
