import React, { useState } from "react";
import Spreadsheet from "react-spreadsheet";

const ImportPage = () => {
  const [data, setData] = useState([]);
  const [filename, setFilename] = useState("");

  const uploadFile = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("file", file);
    const request = await fetch(
      `${process.env.REACT_APP_API}/admin/uploadexcel`,
      {
        method: "POST",
        body: formData,
      }
    );
    const response = await request.json();
    console.log(response);
    setData(response.data);
    setFilename(response.filename);
  };

  const onConfirm = async () => {
    const request = await fetch(
      `${process.env.REACT_APP_API}/admin/confirm/${filename}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const { status } = await request.json();
    if (status === 200) {
      setData([]);
      setFilename([]);
    }
  };

  const onDenined = async () => {
    const request = await fetch(
      `${process.env.REACT_APP_API}/admin/delete/${filename}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const { status } = await request.json();
    if (status === 200) {
      setData([]);
      setFilename([]);
    }
  };

  return (
    <div>
      <h1 className="text-center text-while-900 text-6xl">Import From Excel</h1>
      {data.length !== 0 && (
        <div className="flex justify-around">
          <button
            onClick={onConfirm}
            className="btn bg-blue-500 hover:bg-blue-700  text-white font-bold py-2 px-4 rounded"
          >
            Confirm
          </button>
          <button
            onClick={onDenined}
            className="btn bg-red-500 hover:bg-red-700  text-white font-bold py-2 px-4 rounded"
          >
            Denied
          </button>
        </div>
      )}
      <div class="flex justify-center mt-8">
        {data.length !== 0 ? (
          <div className="overfollow-scroll">
            <Spreadsheet data={data} />
          </div>
        ) : (
          <div class="rounded-lg shadow-xl bg-gray-50 lg:w-1/2">
            <div class="m-4">
              <label class="inline-block mb-2 text-gray-500">
                Upload Data from Excel
              </label>
              <div class="flex items-center justify-center w-full">
                <label class="flex flex-col w-full h-32 border-4 border-dashed hover:bg-gray-100 hover:border-gray-300">
                  <div class="flex flex-col items-center justify-center pt-7">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="w-12 h-12 text-gray-400 group-hover:text-gray-600"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                        clip-rule="evenodd"
                      />
                    </svg>
                    <p class="pt-1 text-sm tracking-wider text-gray-400 group-hover:text-gray-600">
                      Select a file
                    </p>
                  </div>
                  <input
                    type="file"
                    accept=".xlsx"
                    onChange={uploadFile}
                    class="opacity-0"
                  />
                </label>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImportPage;
