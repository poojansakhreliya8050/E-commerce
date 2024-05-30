import React from 'react'

const Otp = () => {
    return (
        <div class="w-full max-w-md px-8 py-10 bg-white rounded-lg shadow-md dark:bg-gray-950 dark:text-gray-200">
            <h1 class="text-2xl font-semibold text-center mb-6">Enter OTP</h1>
            <p class="text-gray-600 text-center mb-4">Code sent to +880-123456789</p>
            <div class="grid grid-cols-5 gap-x-4 my-2">
                <div contenteditable="true" class="rounded-lg bg-gray-100 cursor-text dark:bg-gray-800 w-14 aspect-square flex items-center justify-center">
                    <span class="text-gray-700 dark:text-gray-400">1</span>
                </div>
                <div contenteditable="true" class="rounded-lg bg-gray-100 cursor-text dark:bg-gray-800 w-14 aspect-square flex items-center justify-center">
                    <span class="text-gray-700 dark:text-gray-400">9</span>
                </div>
                <div contenteditable="true" class="rounded-lg bg-gray-100 cursor-text dark:bg-gray-800 w-14 aspect-square flex items-center justify-center">
                    <span class="text-gray-700 dark:text-gray-400">6</span>
                </div>
                <div contenteditable="true" class="rounded-lg bg-gray-100 cursor-text dark:bg-gray-800 w-14 aspect-square flex items-center justify-center">
                    <span class="text-gray-700 dark:text-gray-400">4</span>
                </div>
                <div contenteditable="true" class="rounded-lg bg-gray-100 cursor-text dark:bg-gray-800 w-14 aspect-square flex items-center justify-center">
                    <span class="text-gray-700 dark:text-gray-400">3</span>
                </div>
            </div>
            <div class="flex items-center flex-col justify-between mb-6">
                <p class="text-gray-600 text-sm">Didn't receive code?</p>
                <div class="flex items-center space-x-2">
                    <button class="px-3 py-2 text-sm font-medium text-center rounded text-gray-500 hover:text-blue-500">Request via Call</button>
                    <button class="px-3 py-2 text-sm font-medium text-center rounded text-gray-500 hover:text-blue-500">Request Again (00:00:36)</button>
                </div>
            </div>
            <button class="w-full px-4 py-2 text-lg font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700">Verify</button>
        </div>

    )
}

export default Otp