import React from "react";
import Dropzone from "react-dropzone";
import { Icon } from "antd";
import axios from "axios";

function FileUpload() {
  const dropHandler = files => {
    //FormData 객체 생성
    let formData = new FormData();
    const config = {
      // 헤더에 어떤 파일인지에 대해 content-type을 정의
      header: { "content-type": "multipart/form-data" }
    };
    formData.append("file", files[0]);

    // FormData와 config를 넣어주지 않으면 에러 발생한다.
    axios.post("/api/product/image", formData, config).then(response => {
      // 파일 저장이 성공했을 경우
      if (response.data.success) {
      } else {
        alert("파일을 저장하는데 실패했습니다.");
      }
    });
  };
  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <Dropzone onDrop={dropHandler}>
        {({ getRootProps, getInputProps }) => (
          <section>
            <div
              style={{
                width: 300,
                height: 240,
                border: "1px solid lightgray",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}
              {...getRootProps()}
            >
              <input {...getInputProps()} />
              <Icon type="plus" style={{ fontSize: "3rem" }} />
            </div>
          </section>
        )}
      </Dropzone>
    </div>
  );
}

export default FileUpload;
