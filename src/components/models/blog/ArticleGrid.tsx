import { VFC } from "react";

import { BlogContentDatatype } from "../../../types/blog/blogContentDataType";
import Article from "./Article";

type Props = {
  blog: BlogContentDatatype[];
};

const ArticleGrid: VFC<Props> = (props) => {
  const { blog } = props;
  return (
    <div className="flex-grow mx-auto w-full max-w-2xl md:max-w-4xl">
      <div className="box-border flex flex-wrap justify-center items-center w-full">
        <div className="box-border block md:flex flex-wrap -m-4 w-[calc(100%+32px)]">
          {blog.map((data) => (
            <div className="box-border p-4 m-0" key={data.id}>
              <Article key={data.id} blog={data} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ArticleGrid;
