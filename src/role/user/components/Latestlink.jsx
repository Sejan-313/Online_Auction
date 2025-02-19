const Latestlink = () =>
  {
    return  <div className="product-filter">
    <div className="row">
        <div className="col-lg-12 text-center">
            <div className="section-title">
                <h2>Latest Products</h2>
            </div>
            <ul className="product-controls">
                <li data-filter="*">All</li>
                <li data-filter=".dresses">Dresses</li>
                <li data-filter=".bags">Bags</li>
                <li data-filter=".shoes">Shoes</li>
                <li data-filter=".accesories">Accesories</li>
            </ul>
        </div>
    </div>
  </div>
  }
  
  export default Latestlink;