import Feature from '../component/Feature'
import Latest from "../component/Latest"
import Slider from "../component/Slider"
import New_slider from "../component/New_slider"


const Home = () =>
{
    return (
      <>
        {/* <Slider /> */}
        <New_slider/>
        <Latest />
        <Feature />
      </>
    )
}

export default Home;