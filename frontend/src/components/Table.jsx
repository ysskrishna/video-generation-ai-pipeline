import React from 'react'
import config from '../config';

function isValidData(data) {
    return Array.isArray(data) && data.length > 0;
}

function Table({data}) {

    if (!isValidData(data)) {
        return <></>
    }
  return (
    <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table class="table-auto w-full text-sm text-left rtl:text-right text-gray-500">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50">
                <tr>
                    {/* <th scope="col" class="px-6 py-3">
                        Task ID
                    </th> */}
                    <th scope="col" class="px-6 py-3">
                        Image URL
                    </th>
                    <th scope="col" class="px-6 py-3">
                        Status
                    </th>
                    <th scope="col" class="px-6 py-3">
                        Progress
                    </th>
                    <th scope="col" class="px-6 py-3">
                        Action
                    </th>
                </tr>
            </thead>
            <tbody>
                {
                    data.map(item => (
                        <tr class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                            {/* <th scope="row" class="px-6 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                {item?.task_id}
                            </th> */}
                            <td class="px-6 py-3 whitespace-wrap">
                                {config?.baseUrl}/{item?.image_url}
                            </td>
                            <td class="px-6 py-3">
                                {item?.status}
                            </td>
                            <td class="px-6 py-3">
                                {item?.progress}%
                            </td>
                            <td class="px-6 py-3">
                                {item?.status === 'success' && (
                                <a href={`${item?.video_url}`} target="_blank" rel="noopener noreferrer" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">View Video</a>
                                )}
                            </td>
                        </tr>
                    ))
                }
            </tbody>
        </table>
    </div>
  )
}

export default Table