import { Button } from "antd";
import * as React from "react";

import withPage from "../lib/hocs/withPage";

class Index extends React.Component<{ t: any }> {
  public render() {
    const { t } = this.props;
    return <div>
    {t("login")}
    <Button type="primary">Click me</Button>
    </div>;
  }
}

export default withPage(Index);
