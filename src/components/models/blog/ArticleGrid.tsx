import { VFC } from "react";

import { BlogContentDatatype } from "../../../types/blog/blogContentDataType";
import Article from "./Article";

type Props = {
  blog: BlogContentDatatype[];
};

const ArticleGrid: VFC<Props> = (props) => {
  const { blog } = props;
  return (
    <div className="flex-grow w-full md:max-w-4xl max-w-2xl mx-auto">
      <div className="justify-center items-center w-full flex flex-wrap box-border">
        <div className="w-[calc(100%+32px)] -m-4 md:flex block flex-wrap box-border">
          {blog.map((data) => (
            <div className="m-0 box-border p-4" key={data.id}>
              <Article key={data.id} blog={data} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ArticleGrid;
