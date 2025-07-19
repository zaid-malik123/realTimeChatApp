import SideBar from '../components/SideBar'
import MessageArea from '../components/MessageArea'
import useGetMessage from '../customHooks/getMessages'

const Home = () => {
  useGetMessage();
  return (
    <div className='w-full h-[100vh] flex overflow-hidden '>
      <SideBar/>
      <MessageArea/>
    </div>
  )
}

export default Home
