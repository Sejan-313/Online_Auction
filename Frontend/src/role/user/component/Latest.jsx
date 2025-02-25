
import Latestlink from "./Latestlink";


const Latest = () =>
{
    const images =[
    {
        name:"img/products/img-1.jpg",
        price:"22.90 Rs",
        prdname:"BM",
        description:"Best Product",
        company:"bmw"
    },
    {
        name:"img/products/img-2.jpg",
        price:"22.90 Rs",
        prdname:"Slavia",
        description:"Best Product",
        company:"bmw"
    },
    {
        name:"img/products/img-3.jpg",
        price:"22.90 Rs",
        prdname:"Virtus",
        description:"Best Product",
        company:"bmw"
    },
    {
        name:"img/products/img-4.jpg",
        price:"22.90 Rs",
        prdname:"Swift",
        description:"Best Product",
        company:"bmw"
    },
    {
        name:"img/products/img-5.jpg",
        price:"22.90 Rs",
        prdname:"Audi",
        description:"Best Product",
        company:"bmw"
    },
    {
        name:"img/products/img-6.jpg",
        price:"22.90 Rs",
        prdname:"Rolse Royce",
        description:"Best Product",
        company:"bmw"
    },
    {
        name:"img/products/img-7.jpg",
        price:"22.90 Rs",
        prdname:"Mercedes",
        description:"Best Product",
        company:"bmw"
    },
    {
        name:"img/products/img-8.jpg",
        price:"22.90 Rs",
        prdname:"BMW",
        description:"Best Product",
        company:"bmw"
    },
    {
        name:"img/products/img-8.jpg",
        price:"22.90 Rs",
        prdname:"car",
        description:"Best Product",
        company:"bmw"
    },
    {
        name:"img/products/img-10.jpg",
        price:"22.90 Rs",
        prdname:"laptop",
        description:"Best Product",
        company:"bmw"
    },
    {
        name:"img/products/img-11.jpg",
        price:"22.90 Rs",
        prdname:"television",
        description:"Best Product",
        company:"bmw"
    },
    {
        name:"img/products/img-12.jpg",
        price:"22.90 Rs",
        prdname:"pen",
        description:"Best Product",
        company:"bmw"
    },
    {
        name:"img/products/img-10.jpg",
        price:"22.90 Rs",
        prdname:"eraser",
        description:"Best Product",
        company:"bmw"
    },
    {
        name:"img/products/img-14.jpg",
        price:"22.90 Rs",
        prdname:"pencil",
        description:"Best Product",
        company:"bmw"
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
                             <p>Company : {images.company}</p>
                             <p>{images.price}</p>
                             <p>{images.description}</p>
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