import { GetStaticProps } from "next"
import { memo } from "react"

type Props = {
   blog: []
}

const Article = memo((props) => {
   return (
      <div>
         
      </div>
   )
})

export default Article

export const getStaticProps: GetStaticProps = async () => {
   return {
      props: {
         
      }
   }
}
