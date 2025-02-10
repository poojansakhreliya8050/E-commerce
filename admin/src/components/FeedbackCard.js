import React from 'react'

const FeedbackCard = ({feedback}) => {
    // console.log(feedback);
  return (
        <div class="w-3/4 my-2 bg-indigo-600 shadow-lg rounded-lg duration-200 hover:scale-105">
            <div class="px-6 py-5">
                <div class="flex items-start">
                    <svg class="fill-current flex-shrink-0 mr-5" width="30" height="30" viewBox="0 0 30 30">
                        <path class="text-indigo-300" d="m16 14.883 14-7L14.447.106a1 1 0 0 0-.895 0L0 6.883l16 8Z" />
                        <path class="text-indigo-200" d="M16 14.619v15l13.447-6.724A.998.998 0 0 0 30 22V7.619l-14 7Z" />
                        <path class="text-indigo-500" d="m16 14.619-16-8V21c0 .379.214.725.553.895L16 29.619v-15Z" />
                    </svg>
                    <div class="flex-grow truncate">
                       
                        <div class="flex items-end justify-between whitespace-normal">
                            <div class="max-w-md text-indigo-100">
                                <p class="mb-2">Name : {feedback.userName}</p>
                                <p class="mb-2">Email : {feedback.email}</p>
                                <p class="mb-2">Feedback : {feedback.feedback}</p>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

  )
}

export default FeedbackCard