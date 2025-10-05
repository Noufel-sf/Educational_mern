import React from 'react'

function DeleteCourseDialog({ showConfirm, selectedCourse, CancelDelete, DeleteCourse }: { showConfirm: boolean, selectedCourse: any, CancelDelete: () => void, DeleteCourse: () => void }) {
  return (
       <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 shadow-lg w-full max-w-sm">
            <h2 className="text-lg font-semibold mb-4">Confirm Delete</h2>
            <p className="text-sm mb-6">
              Are you sure you want to delete{" "}
              <strong>{selectedCourse.title}</strong>?
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={CancelDelete}
                className="px-4 py-2 text-sm rounded-md bg-gray-200 hover:bg-gray-300 cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={DeleteCourse}
                className="px-4 py-2 text-sm rounded-md bg-red-600 text-white hover:bg-red-700 cursor-pointer"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
  )
}

export default DeleteCourseDialog