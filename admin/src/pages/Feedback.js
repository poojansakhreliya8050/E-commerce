import React,{useEffect,useState} from 'react'
import axios from 'axios'
import FeedbackCard from '../components/FeedbackCard';

const Feedback = () => {
  const [feedback, setFeedback] = useState(null);

  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_URL}/api/v1/feedback/getFeedback`);
        // console.log(response.data);
        setFeedback(response.data);
      } catch (err) {
        console.log(err);
      }
    }
    fetchFeedback();
  }, []);

  return (
    <div className='min-h-screen'>
    <div class="flex items-center justify-center h-20">
      <h1 class="text-3xl font-bold">Feedback</h1>
    </div>

    <div class="flex flex-col justify-center antialiased bg-gray-50 text-gray-600 h-full p-4">
      {
        feedback!=null ? feedback.feedback.map(feedback => <FeedbackCard feedback={feedback}/>):<></>
      }
    </div>
      </div>
  )
}

export default Feedback