import ProductList from "../../components/product-card";
import { getSearchedProduct } from "../../../libs/api-libs";

const Page = async ({ params }) => {

  const { keyword } = params
  const decodedKeyword = decodeURI(keyword)
  const searchedProducts = await getSearchedProduct("search", 10, true, `${keyword}`)

  return (
      <>
        {/* Hasil pencarian */}
        <section>
            <h1>Hasil pencarian untuk keyword: {decodedKeyword}</h1>
            <ProductList api={searchedProducts}/>
        </section>
      </>
  );
}

export default Page
