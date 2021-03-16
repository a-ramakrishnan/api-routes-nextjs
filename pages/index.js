import {useRef, useState} from 'react'


function HomePage() {

    const [feedbackItems, setFeedbackItems] = useState([])
    const emailInput = useRef()
    const feedbackInput = useRef()

    function submitFormHandler (e){
        e.preventDefault()

        const emailText = emailInput.current.value;
        const feedbackText = feedbackInput.current.value;

        const reqBody = {
            email: emailText,
            feedbackText: feedbackText
        }

        fetch('/api/feedback', {
            method: 'POST',
            body: JSON.stringify(reqBody),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((response) => response.json()).then((data) => console.log(data));

    }

    function retrieveFeedback() {

        fetch('/api/feedback', {
            method: 'GET'
        }).then((response => response.json())).then((data) => {setFeedbackItems(data.feedback)})

        //console.log(feedbackItems)

    }

  return (
    <div>
      <h1>The Home Page</h1>
        <form onSubmit={submitFormHandler}>
            <div className="center">
                <label htmlFor='email'>Email Address</label>
                <input type="email" id='email' ref={emailInput}/>
            </div>
            <div className="center">
                <label htmlFor='feedback'>Your Feedback here</label>
                <textarea id='feedback' rows='5' ref={feedbackInput}/>
            </div>
            <hr />
            <button>Send Feedback</button>
        </form>
        <hr />
        <button onClick={retrieveFeedback}>Retrieve Available Feedback</button>
        <ul>
            {feedbackItems.map((item) => (<li key={item.id}>{item.email} & {item.feedbackText}</li> ))}
        </ul>
    </div>
  );
}

export default HomePage;
