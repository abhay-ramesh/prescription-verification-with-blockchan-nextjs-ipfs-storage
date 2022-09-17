import { ConnectWallet } from "@thirdweb-dev/react";
import products from "../public/product.json"

export default function Home({ address }) {
  // async function check() {

  //   const files = await fetch("/api/data", { method: 'POST', body: { address: address } })
  //   console.log(files)
  // }
  // check()
  return (
    <main className="flex flex-col p-10 mx-auto">
      <div className=" text-xl m-4 bg-zinc-700 rounded-lg p-2 text-white">Hello {address}</div>
      <div className=" flex flex-wrap gap-4 justify-center">
        {products.products.map((product) => {
          return (
            <div key={product.id} className=" bg-slate-300 p-4 rounded-lg flex flex-col w-56">
              <img width={200} height={200} src={products.base_url + (product.image === "/catalog/product/o/t/otc.jpg" || "/catalog/product/o/t/otc.jpg" ? product.thumbnail : product.image)} />
              <p className=" p-2">{product.name}</p>
              <p className=" p-2">{product.price}</p>
              <p className="bg-blue-500 rounded-xl p-2">Buy Now</p>
            </div>
          )
        })}
      </div>
    </main>
  );
}
