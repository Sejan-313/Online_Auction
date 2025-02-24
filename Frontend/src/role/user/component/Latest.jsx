
import Latestlink from "./Latestlink";


const Latest = () =>
{
    const images =[
    {
        name:"img/products/img-1.jpg",
        price:"$22.90",
        prdname:"BM"
    },
    {
        name:"img/products/img-2.jpg",
        price:"$22.90",
        prdname:"Slavia"
    },
    {
        name:"img/products/img-3.jpg",
        price:"$22.90",
        prdname:"Virtus"
    },
    {
        name:"img/products/img-4.jpg",
        price:"$22.90",
        prdname:"Swift"
    },
    {
        name:"img/products/img-5.jpg",
        price:"$22.90",
        prdname:"Audi"
    },
    {
        name:"img/products/img-6.jpg",
        price:"$22.90",
        prdname:"Rolse Royce"
    },
    {
        name:"img/products/img-7.jpg",
        price:"$22.90",
        prdname:"Mercedes"
    },
    {
        name:"img/products/img-8.jpg",
        price:"$22.90",
        prdname:"BMW"
    },
    {
        name:"img/products/img-8.jpg",
        price:"$22.90",
        prdname:"car"
    },
    {
        name:"img/products/img-10.jpg",
        price:"$22.90",
        prdname:"laptop"
    },
    {
        name:"img/products/img-11.jpg",
        price:"$22.90",
        prdname:"television"
    },
    {
        name:"img/products/img-12.jpg",
        price:"$22.90",
        prdname:"pen"
    },
    {
        name:"img/products/img-10.jpg",
        price:"$22.90",
        prdname:"eraser"
    },
    {
        name:"img/products/img-14.jpg",
        price:"$22.90",
        prdname:"pencil"
    }
]

    return <>
         <section className="latest-products spad">
        <div className="container">
        <Latestlink></Latestlink>
            <div className="row" id="product-list">

                {images.map((images)=>(
                     <div className="col-lg-3 col-sm-6 mix all dresses bags">
                     <div className="single-product-item">
                         <figure>
                             <a href="#"><img src={images.name} alt=""/></a>
                             <div className="p-status">new</div>
                         </figure>
                         <div className="product-text">
                             <h6>{images.prdname}</h6>
                             <p>{images.price}</p>
                             <button className="btn btn-success mt-1">Bid</button>
                         </div>
                     </div>
                 </div>
                ))}
            </div>
        </div>
    </section>

    </>
}

export default Latest;