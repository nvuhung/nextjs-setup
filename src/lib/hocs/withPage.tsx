import { compose } from "redux";

import { withNamespaces } from "../../i18n";
import "../../styles/styles.less";
import { Configs } from "../configs";
import "../pageEvents";

import withData from "./withData";
import withLayout from "./withLayout";

// export default (i18nextNamespaces = ["common"]) =>
export default
  compose<{t: any, i18n: any}>(
    withData,
    // withNamespaces(i18nextNamespaces),
    withNamespaces(Configs.defaultLocaleNS),
    withLayout,
  );

