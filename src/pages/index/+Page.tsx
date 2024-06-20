import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";

import { useStore } from "../../store";

export const Page = observer(() => {
  const { models, onRefresh } = useStore("postsDataStore");

  useEffect(() => {
    onRefresh();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      {models.map(post => (
        <div key={post.data.id}>
          <div>{post.data.title}</div>
          <div>{post.data.body}</div>
        </div>
      ))}
    </div>
  );
});
