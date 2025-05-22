import { useCallback, useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";

//import * as canvas from 'canvas';
import * as faceapi from 'face-api.js';
//const { Canvas, Image, ImageData } = canvas
//faceapi.env.monkeyPatch({ Canvas, Image, ImageData })
faceapi.env.monkeyPatch({
Canvas: HTMLCanvasElement,
Image: HTMLImageElement,
//ImageData: ImageData,
Video: HTMLVideoElement,
createCanvasElement: () => document.createElement('canvas'),
createImageElement: () => document.createElement('img')
})

function WebcamCapture({ setImgDescriptor}: any) {
  const [img, setImg] = useState(null);
  const webcamRef = useRef(null);

  const videoConstraints = {
    width: 420,
    height: 420,
    facingMode: "user",
  };

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImg(imageSrc);
  }, [webcamRef]);

  useEffect( ()=>{
    if( img === null ) return;

    const processImage1 = async () => {
      const image = "myid1";
      console.log(image);

      Promise.all([
        faceapi.nets.ssdMobilenetv1.loadFromUri("/models"),
        faceapi.nets.faceLandmark68Net.loadFromUri("/models"),
        faceapi.nets.faceRecognitionNet.loadFromUri("/models"),
      ]).then(() => {
          faceapi
            .detectSingleFace(image)
            .withFaceLandmarks()
            .withFaceDescriptor()
            .then((_result) => {
              console.log(_result);
              console.log(typeof _result)
              setImgDescriptor(_result);
              return _result;
            })
            .catch((err) => console.log(err));
        });
    };
    processImage1();

  }, [img] )

  return (
    <div className="flex flex-col justify-center items-center">
      {img === null ? (
        <>
          <Webcam
            audio={false}
            mirrored={true}
            height={400}
            width={400}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            videoConstraints={videoConstraints}
          />
          <button type="button" onClick={capture} className="bg-green-300 rounded-md py-1 px-2 m-2">Capture photo</button>
        </>
      ) : (
        <>
          <img id="myid1" src={img} alt="screenshot" />
          <button type="button" onClick={() => {setImg(null), setImgDescriptor(null)} } className="bg-green-300 rounded-md py-1 px-2 m-2">Retake</button>
        </>
      )}
    </div>
  );
}

export default WebcamCapture;
