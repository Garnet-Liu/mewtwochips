"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
// import { RTCPeerConnection } from "@/app/media-devices/components/RTCPeerConnection/RTCPeerConnection";

export default function MediaDevicesPage() {
  const [photo, setPhoto] = useState<string>("");
  const videoRef = useRef<HTMLVideoElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamingRef = useRef<boolean>(false);

  useEffect(() => {
    console.log("useEffect", canvasRef, videoRef);
    initMedia().then(() => {
      console.log("initMedia");
    });
  }, []);

  const initMedia = async () => {
    const video = videoRef.current;
    const audio = audioRef.current;
    const canvas = canvasRef.current;
    const width = 320;    // 外面会对照片的宽度进行缩放
    let height = 0;     // 高度会基于输入的视频流进行计算
    console.log(video, video);
    console.log(canvas, canvas);
    console.log(video && canvas);
    console.log(video && canvas);
    if (video && canvas && audio) {
      console.log("navigator.mediaDevices", navigator.mediaDevices);
      const firstMediaStream = await navigator.mediaDevices.getUserMedia({
        video: true
      });
      console.log("firstMediaStream", firstMediaStream);
      firstMediaStream.getVideoTracks().forEach((track) => {
        console.log("track", track.id, track.kind);
        track.stop();
      });
      const mediaDeviceInfo = await navigator.mediaDevices.enumerateDevices();
      console.log("mediaDeviceInfo", mediaDeviceInfo);
      const videoInput = mediaDeviceInfo.filter((info) => {
        return info.kind === "videoinput";
      });
      console.log("videoInput", videoInput);
      // const findVideo = videoInput.find((v) => v.label === "“塞伯坦信号控制装置”的相机");
      const findVideo = videoInput.find((v) => v.label === "OBS Virtual Camera (m-de:vice)");
      console.log("findVideo", findVideo);
      console.log("findVideo", findVideo?.deviceId);
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { deviceId: findVideo?.deviceId || videoInput[0]?.deviceId }
      });
      console.log("mediaStream", mediaStream);
      video.srcObject = mediaStream;
      const findAudio = videoInput.find((v) => v.label === "“塞伯坦信号控制装置”的麦克风");
      const audioStream = await navigator.mediaDevices.getUserMedia({
        audio: { deviceId: findAudio?.deviceId || "default" }
      });

      console.log("audioStream", audioStream);

      audio.srcObject = audioStream;


      video.addEventListener(
        "canplay",
        (ev) => {
          if (!streamingRef.current) {
            height = (video.videoHeight / video.videoWidth) * width;

            video.setAttribute("width", String(width));
            video.setAttribute("height", String(height));
            canvas.setAttribute("width", String(width));
            canvas.setAttribute("height", String(height));
            streamingRef.current = true;
          }
        },
        false
      );
    }
  };

  const takepicture = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (context && video) {
      context.drawImage(video, 0, 0, 320, 240);

      const data = canvas?.toDataURL("image/png");
      setPhoto(data || "");
    } else {
      clearphoto();
    }
  };

  const clearphoto = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (context) {
      context.fillStyle = "#AAA";
      context.fillRect(0, 0, 320, 240);
    }

    const data = canvas?.toDataURL("image/png");
    setPhoto(data || "");
  };

  return (
    <div>
      <div className="fixed z-[99999] border border-black">
        <video className="border border-black"
               ref={videoRef}
               style={{ objectFit: "fill" }}
               preload="auto"
               webkit-playsinline="true"
               playsInline
               x5-video-player-type="h5"
               x5-video-player-fullscreen="true"
               x5-video-orientation="portraint">
          视频流目前不可用。
        </video>

        <audio ref={audioRef} controls/>

        <button onClick={(ev) => {
          takepicture();
          ev.preventDefault();
        }}>拍摄照片
        </button>
        <button className="ml-10" onClick={(ev) => {
          videoRef.current?.play();
        }}>播放
        </button>
      </div>

      <canvas ref={canvasRef}></canvas>

      <div className="mt-10">
        {photo && <Image width="320" height="240" src={photo} alt="捕获的图像会显示在这里。"/>}
      </div>
    </div>
  );
}
