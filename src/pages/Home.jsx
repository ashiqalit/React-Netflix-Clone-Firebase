import Main from "../components/Main"
import Row from "../components/Row"
import requests from "../Requests"

const Home = () => {
    return (
        <>
            <Main/>
            <Row rowID='1' title='Upcoming' fetchURL={requests.requestUpcoming}/>
            <Row rowID='2' title='Popular' fetchURL={requests.requestPopular}/>
            <Row rowID='3' title='Horror' fetchURL={requests.requestHorror}/>
            <Row rowID='4' title='Trending' fetchURL={requests.requestTrendingToday}/>
            <Row rowID='5' title='TopRated' fetchURL={requests.requestTopRated}/>
            <Row rowID='6' title='Animation' fetchURL={requests.requestAnimation}/>
        </>
    )
}
export default Home