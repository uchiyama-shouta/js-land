import type { VFC } from "react";

import Article from "src/components/models/blog/Article";

type Props = {
  blog: {
    id: string;
    title: string;
    thumbnail: string;
    updatedAt: string;
  }[];
};

const ArticleGrid: VFC<Props> = (props) => {
  const { blog } = props;
  return (
    <div className="grow mx-auto w-full max-w-2xl md:max-w-4xl">
      <div className="box-border flex flex-wrap justify-center items-center w-full">
        <div className="box-border block flex-wrap -m-4 w-[calc(100%+32px)] md:flex">
          {blog.map((data) => (
            <div className="box-border p-4 m-0" key={data.id}>
              <Article
                key={data.id}
                id={data.id}
                title={data.title}
                thumbnail={data.thumbnail}
                updatedAt={data.updatedAt}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ArticleGrid;
