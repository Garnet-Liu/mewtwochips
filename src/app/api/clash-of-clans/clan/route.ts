import { HttpsProxyAgent } from "https-proxy-agent";
import { NextResponse } from "next/server";
import axios from "axios";

import { env } from "../../../../../env.mjs";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const tag = searchParams.get("tag");
  let errorMessage = "Something went wrong!";
  console.log(`========= tag: ${tag} =========`);
  try {
    if (tag) {
      const url = `https://api.clashofclans.com/v1/clans/${encodeURIComponent(`#${tag}`)}`; // 要访问的目标 API 地址
      const url1 = `https://worldtimeapi.org/api/ip`; // 要访问的目标 API 地址
      const url2 = "https://ident.me/ip";
      const url3 = "https://api.ipify.org/?format=json";

      const proxyConfig1 = {
        protocol: "http",
        host: "162.223.89.84",
        port: 80,
      };
      const proxyConfig2 = {
        protocol: "http",
        host: "8.219.97.248",
        port: 80,
      };
      const successProxy = [
        {
          proxy: "5.161.105.98:3128",
          response: "5.161.105.98",
          TLS: "TLSv1.3",
        },
        {
          proxy: "5.202.191.225:8080",
          response: "5.202.191.225",
          TLS: "TLSv1.3",
        },
        {
          proxy: "20.33.5.27:8888",
          response: "4.228.17.97",
          TLS: "TLSv1.3",
        },
        {
          proxy: "20.79.103.91:80",
          response: "20.113.125.120",
          TLS: "TLSv1.3",
        },
        {
          proxy: "20.99.153.50:8080",
          response: "4.154.77.117",
          TLS: "TLSv1.3",
        },
        {
          proxy: "34.154.161.152:80",
          response: "34.154.143.78",
          TLS: "TLSv1.3",
        },
        {
          proxy: "36.37.146.119:32650",
          response: "36.37.146.119",
          TLS: "TLSv1.3",
        },
        {
          proxy: "38.51.235.213:999",
          response: "38.51.235.213",
          TLS: "TLSv1.3",
        },
        {
          proxy: "39.105.5.126:80",
          response: "39.105.5.126",
          TLS: "TLSv1.3",
        },
      ];

      // const targetUrl = url;
      // console.log("targetUrl", targetUrl);
      //
      // const proxyListResponse: {
      //   error: number,
      //   success: Array<{ proxy: string, response: unknown, TLS: string }>
      // } = {
      //   success: [],
      //   error: 0
      // };
      // for (const proxyItem of proxyList) {
      //   console.log("start => ", proxyItem);
      //   const agent = new HttpsProxyAgent(`http://${proxyItem}`);
      //   try {
      //     const response = await axios.request({
      //       url: url2,
      //       httpsAgent: agent,
      //       proxy: false,
      //       timeout: 5000,
      //       headers: { Authorization: `Bearer ${env.CLASH_OF_CLANS_API_TOKEN}` }
      //     });
      //     console.log("TLS Version of connection:", response.request.connection.getProtocol());
      //     proxyListResponse.success.push({
      //       proxy: proxyItem,
      //       response: response.data,
      //       TLS: response.request.connection.getProtocol()
      //     });
      //   } catch (e) {
      //     proxyListResponse.error = proxyListResponse.error + 1;
      //   }
      //   console.log("end proxyListResponse =>", proxyListResponse);
      // }
      // console.log("proxyListResponse", proxyListResponse);

      // curl -x https://5.58.33.187:55507 'https://ident.me/ip'

      // fetch(targetUrl, { agent: httpsAgent })
      //   .then((res) => res.text())
      //   .then((body) => console.log("node fetch => ", body))
      //   .catch((err) => console.error(err));
      //
      const response = await axios.request({
        url: `https://api.clashofclans.com/v1/clans/${encodeURIComponent(`#${tag}`)}`,
        httpsAgent: new HttpsProxyAgent(`http://36.37.146.119:32650`),
        proxy: false,
        headers: { Authorization: `Bearer ${env.CLASH_OF_CLANS_API_TOKEN}` },
      });

      return NextResponse.json({
        code: 200,
        success: true,
        message: "success",
        data: response.data,
      });
    } else {
      errorMessage = "Don't have tag field.";
    }
  } catch (e) {
    const error = e as any;
    errorMessage = error?.response?.data || error.message;
  }
  return NextResponse.json({
    code: 500,
    success: false,
    message: errorMessage,
    data: null,
  });
}
