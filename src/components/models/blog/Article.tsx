import type { VFC } from "react";
import Link from "next/link";
import Image from "next/image";
import { BlogContentDatatype } from "src/types/blog/blogContentDataType";

type Props = {
  blog: BlogContentDatatype;
};

const Article: VFC<Props> = ({ blog }) => {
  const { id, title, thumbnail, updatedAt } = blog;
  return (
    <article className="overflow-hidden mx-auto min-w-[290px] max-w-[325px] min-h-[280px] max-h-[350] rounded shadow transition-opacity">
      <Link href={`/blog/${id}`}>
        <a className="inline-block w-full h-full">
          <Image
            src={thumbnail ? thumbnail.url : "/image/lesson-image.jpg"}
            width={325}
            height={170}
            quality={60}
            alt="サムネイル画像"
          />
          <div className="py-5 px-8 h-full min-h-[116px]">
            <h2 className="text-lg font-bold">{title}</h2>
            <span>{updatedAt.replace(/-/g, "/").slice(0, 10)}</span>
          </div>
        </a>
      </Link>
    </article>
  );
};

export default Article;
