import { BlogPost } from "@/components/BlogPost";
import nodes from "@/markdoc/nodes";

const blogNodes = {
  ...nodes,
  document: {
    ...nodes.document,
    render: BlogPost,
  },
};

export default blogNodes;
