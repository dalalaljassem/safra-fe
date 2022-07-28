import { observer } from "mobx-react";
import { View } from "react-native";

import activityStore from "../stores/ActivityStore";
import ActivityItem from "./ActivityItem";

function ActivityList() {
  const activityList = activityStore.activities.map((activity) => {
    return <ActivityItem activity={activity} key={activity.id} />;
  });

  return <View>{activityList}</View>;
}

export default observer(ActivityList);
