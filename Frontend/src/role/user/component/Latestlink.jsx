const Latestlink = () =>
  {
    return  <div className="product-filter">
    <div className="row">
        <div className="col-lg-12 text-center">
            <div className="section-title">
                <h2>Products For Auction</h2>
            </div>
            <ul className="product-controls">
                <li data-filter="*">All</li>
                <li data-filter=".dresses">Electronic</li>
                <li data-filter=".bags">Furniture</li>
                <li data-filter=".shoes">Clothes</li>
                <li data-filter=".accesories">Accesories</li>
            </ul>
        </div>
    </div>
  </div>
  }
  
  export default Latestlink;