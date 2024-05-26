import ProductList from "../../components/product-card";
import { getFilteredProduct } from "../../../libs/api-libs";

const Page = async ({ params }) => {

  const { keyword } = params
  const decodedKeyword = decodeURI(keyword)
  const searchedProducts = await getFilteredProduct("search", 10, true, `${keyword}`)

  return (
      <>
        {/* Hasil pencarian */}
        <section>
            <h1 className="text-xl font-semibold p-2 m-2">Hasil pencarian untuk keyword: {decodedKeyword}</h1>
            <ProductList api={searchedProducts} className="p-2 m-2"/>
        </section>
      </>
  );
}

export default Page
