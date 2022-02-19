import type { VFC } from "react";
import Link from "next/link";
import Image from "next/image";

type Props = {
  id: string;
  title: string;
  thumbnail: string;
  updatedAt: string;
};

const Article: VFC<Props> = (props) => {
  const { id, title, thumbnail, updatedAt } = props;
  return (
    <article className="overflow-hidden mx-auto min-w-[290px] max-w-[325px] min-h-[280px] max-h-[350] rounded shadow transition-opacity">
      <Link href={`/blog/${id}`} prefetch={false}>
        <a className="inline-block w-full h-full">
          <Image
            src={thumbnail}
            width={325}
            height={170}
            quality={60}
            alt="サムネイル画像"
          />
          <div className="py-5 px-8 h-full min-h-[116px]">
            <h2 className="text-lg font-bold">{title}</h2>
            <span>{updatedAt}</span>
          </div>
        </a>
      </Link>
    </article>
  );
};

export default Article;
