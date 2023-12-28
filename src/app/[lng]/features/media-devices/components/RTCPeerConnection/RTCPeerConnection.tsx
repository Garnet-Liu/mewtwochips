// import { HTMLAttributes, useRef } from "react";
//
// export const RTCPeerConnection = (props: HTMLAttributes<HTMLDivElement>) => {
//   const localVideoRef = useRef<HTMLVideoElement>(null);
//   const remoteVideoRef = useRef<HTMLVideoElement>(null);
//   const { className } = props;
//
//   // 传输视频，不传输音频
//   const mediaStreamConstraints = {
//     video: true,
//     audio: false
//   };
//
//   // 设置只交换视频
//   const offerOptions = {
//     offerToReceiveVideo: 1,
//   };
//
//   let startTime = null;
//
//   let localStream;
//   let remoteStream;
//   // 建立两个对等连接对象，分表代表本地和远端
//   let localPeerConnection;
//   let remotePeerConnection;
//
//   function gotLocalMediaStream(mediaStream) {
//     localVideo.srcObject = mediaStream;
//     localStream = mediaStream;
//     trace('Received local stream.');
//     callButton.disabled = false;
//   }
//
//   function handleLocalMediaStreamError(error) {
//     trace(`navigator.getUserMedia error: ${error.toString()}.`);
//   }
//
//   function gotRemoteMediaStream(event) {
//     const mediaStream = event.stream;
//     remoteVideo.srcObject = mediaStream;
//     remoteStream = mediaStream;
//     trace('Remote peer connection received remote stream.');
//   }
//
//   function logVideoLoaded(event) {
//     const video = event.target;
//     trace(`${video.id} videoWidth: ${video.videoWidth}px, ` +
//       `videoHeight: ${video.videoHeight}px.`);
//   }
//
//   function logResizedVideo(event) {
//     logVideoLoaded(event);
//     if (startTime) {
//       const elapsedTime = window.performance.now() - startTime;
//       startTime = null;
//       trace(`Setup time: ${elapsedTime.toFixed(3)}ms.`);
//     }
//   }
//
//   localVideo.addEventListener('loadedmetadata', logVideoLoaded);
//   remoteVideo.addEventListener('loadedmetadata', logVideoLoaded);
//   remoteVideo.addEventListener('onresize', logResizedVideo);
//
//
//   function handleConnection(event) {
//     const peerConnection = event.target;
//     const iceCandidate = event.candidate;
//
//     if (iceCandidate) {
//       const newIceCandidate = new RTCIceCandidate(iceCandidate);
//       const otherPeer = getOtherPeer(peerConnection);
//
//       otherPeer.addIceCandidate(newIceCandidate)
//         .then(() => {
//           handleConnectionSuccess(peerConnection);
//         }).catch((error) => {
//         handleConnectionFailure(peerConnection, error);
//       });
//
//       trace(`${getPeerName(peerConnection)} ICE candidate:\n` +
//         `${event.candidate.candidate}.`);
//     }
//   }
//
//   function handleConnectionSuccess(peerConnection) {
//     trace(`${getPeerName(peerConnection)} addIceCandidate success.`);
//   };
//
//   function handleConnectionFailure(peerConnection, error) {
//     trace(`${getPeerName(peerConnection)} failed to add ICE Candidate:\n`+
//       `${error.toString()}.`);
//   }
//
//   function handleConnectionChange(event) {
//     const peerConnection = event.target;
//     console.log('ICE state change event: ', event);
//     trace(`${getPeerName(peerConnection)} ICE state: ` +
//       `${peerConnection.iceConnectionState}.`);
//   }
//
//   function setSessionDescriptionError(error) {
//     trace(`Failed to create session description: ${error.toString()}.`);
//   }
//
//   function setDescriptionSuccess(peerConnection, functionName) {
//     const peerName = getPeerName(peerConnection);
//     trace(`${peerName} ${functionName} complete.`);
//   }
//
//   function setLocalDescriptionSuccess(peerConnection) {
//     setDescriptionSuccess(peerConnection, 'setLocalDescription');
//   }
//
//   function setRemoteDescriptionSuccess(peerConnection) {
//     setDescriptionSuccess(peerConnection, 'setRemoteDescription');
//   }
//
//   function createdOffer(description) {
//     trace(`Offer from localPeerConnection:\n${description.sdp}`);
//
//     trace('localPeerConnection setLocalDescription start.');
//     localPeerConnection.setLocalDescription(description)
//       .then(() => {
//         setLocalDescriptionSuccess(localPeerConnection);
//       }).catch(setSessionDescriptionError);
//
//     trace('remotePeerConnection setRemoteDescription start.');
//     remotePeerConnection.setRemoteDescription(description)
//       .then(() => {
//         setRemoteDescriptionSuccess(remotePeerConnection);
//       }).catch(setSessionDescriptionError);
//
//     trace('remotePeerConnection createAnswer start.');
//     remotePeerConnection.createAnswer()
//       .then(createdAnswer)
//       .catch(setSessionDescriptionError);
//   }
//
//   function createdAnswer(description) {
//     trace(`Answer from remotePeerConnection:\n${description.sdp}.`);
//
//     trace('remotePeerConnection setLocalDescription start.');
//     remotePeerConnection.setLocalDescription(description)
//       .then(() => {
//         setLocalDescriptionSuccess(remotePeerConnection);
//       }).catch(setSessionDescriptionError);
//
//     trace('localPeerConnection setRemoteDescription start.');
//     localPeerConnection.setRemoteDescription(description)
//       .then(() => {
//         setRemoteDescriptionSuccess(localPeerConnection);
//       }).catch(setSessionDescriptionError);
//   }
//
//   function trace(text) {
//     text = text.trim();
//     const now = (window.performance.now() / 1000).toFixed(3);
//     console.log(now, text);
//   }
//
//   return (
//     <div className={className}>
//       <h1>Realtime communication with WebRTC</h1>
//
//       <video ref={localVideoRef} autoPlay playsInline></video>
//       <video ref={remoteVideoRef} autoPlay playsInline></video>
//
//       <div>
//         <button id="startButton">开始</button>
//         <button id="callButton">调用</button>
//         <button id="hangupButton">挂断</button>
//       </div>
//     </div>
//   );
// };
